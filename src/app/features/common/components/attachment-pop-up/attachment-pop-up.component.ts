import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonService, AttachmentFileInfo, AttachmentPopupDetails } from '../../common.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-attachment-pop-up',
  templateUrl: './attachment-pop-up.component.html',
  styleUrls: ['./attachment-pop-up.component.scss']
})
export class AttachmentPopUpComponent {
  showAPILoader: boolean = false;
  @Input() showAttachmentPopup: boolean = false;
  @Input() title: string = 'Attachments';
  // @Input() subtitle: string = 'Uploaded Files'
  myFiles: AttachmentFileInfo [] = [];
  popupPosition = { x: 0, y: 0 };

  @Input() attachmentPopupDetails: AttachmentPopupDetails [] = [];
  @Output() attachmentPopupClose: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ){}

  ngOnInit(){
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachmentPopupDetails'] && this.attachmentPopupDetails.length > 0) {
      this.getAttachmentDetails();
    }
  }

  getAttachmentDetails(){
    this.commonService.getAttachmentDetails(
      this.attachmentPopupDetails[0].docSrcVal, 
      this.attachmentPopupDetails[0].docSrcType, 
      this.attachmentPopupDetails[0].docSrcGUID, 
    ).subscribe((data: any) => {
      this.loaderService.showLoader();
      if(data!=null)
        this.myFiles = data;
      else
        this.myFiles = [];
      this.loaderService.hideLoader();
    },
    error => {
      this.loaderService.hideLoader();
      this.myFiles = [];
    }); 
    
    let clientX = 0;
    let clientY = 0;
  
    if (this.attachmentPopupDetails[0].touchEvent instanceof TouchEvent) {
      const touch = this.attachmentPopupDetails[0].touchEvent.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else if (this.attachmentPopupDetails[0].touchEvent instanceof MouseEvent) {
      clientX = this.attachmentPopupDetails[0].touchEvent.clientX;
      clientY = this.attachmentPopupDetails[0].touchEvent.clientY;
    }
    this.popupPosition = { x: clientX, y: clientY };
  }

  onAttachmentPopupClose(){
    this.showAttachmentPopup = false;
    this.myFiles = [];
    this.attachmentPopupClose.emit();
  }

  downloadAttachment(index: number) {
    this.loaderService.showLoader();
    this.commonService.getAttachment(
      this.myFiles[index].docSrcVal, 
      this.myFiles[index].docSrcType, 
      this.attachmentPopupDetails[0].docSrcGUID, 
      index)
      .subscribe((response) => {
        const contentType = response.headers.get('content-type')!;
        const filename = this.myFiles[index].name;
        const blob = new Blob([response.body!], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'attachment';
        link.click();
        window.URL.revokeObjectURL(url);
        this.loaderService.hideLoader();
      },
      error =>{
        this.loaderService.hideLoader();
        this.notificationService.showNotification(
          'Failed to download file',
          'error', 'center', 'bottom'
        );
      });
  }
  
}
