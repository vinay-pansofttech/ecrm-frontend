import { Component,Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FileInfo } from "@progress/kendo-angular-upload";
import { FormStateService } from '../../form-state.service';
import { CommonService } from 'src/app/features/Common/commonservice.service';
@Component({
  selector: 'app-enquiry-description',
  templateUrl: './enquiry-description.component.html',
  styleUrls: ['./enquiry-description.component.scss']
})
export class EnquiryDescriptionComponent {
  myFiles: Array<FileInfo> = [];
  @Input() public enquiryDescription!: FormGroup;

  constructor(
    private formStateService: FormStateService,
    private commonService: CommonService,
  ) {}
  
  ngOnInit(){
    if(this.formStateService.attachments != null){
      this.myFiles = this.formStateService.attachments;
    }
  }

  downloadAttachment(index: number) {
    this.commonService.getAttachment(this.formStateService.enqId, this.commonService.docSrcTypeAttachment,"", index).subscribe((response) => {
      const contentType = response.headers.get('content-type')!;
      const filename = this.myFiles[index].name;
      const blob = new Blob([response.body!], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'attachment';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
