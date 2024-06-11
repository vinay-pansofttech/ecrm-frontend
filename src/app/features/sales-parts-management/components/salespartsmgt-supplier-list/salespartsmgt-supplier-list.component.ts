import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FileInfo } from "@progress/kendo-angular-upload";
import { SalesPartsManagementService, SPMSupplierListItem, RemarksMessage} from '../../sales-parts-management.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from 'src/app/features/enquiry-details/enquiry-details.service';

@Component({
  selector: 'app-salespartsmgt-supplier-list',
  templateUrl: './salespartsmgt-supplier-list.component.html',
  styleUrls: ['./salespartsmgt-supplier-list.component.scss']
})

export class SalespartsmgtSupplierListComponent {
  public showSPMAPILoader = false;
  myFiles: Array<FileInfo> = [];

  supplierCards: SPMSupplierListItem[] = [];
  showSuppAttachment: boolean = false;
  enqId!: number;
  docSrcTypeSuppAttachment: number = 58;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private spmService: SalesPartsManagementService,
    private enquiryDetailsService: EnquiryDetailsService
  ){}

  ngOnInit() {
    this.loaderService.loaderState.subscribe(res => {
      this.showSPMAPILoader = res;
    });
    this.loaderService.hideLoader();
    const enqIdString = this.route.snapshot.paramMap.get('id');
    if (enqIdString !== null) {
      const idNumber: number = parseInt(enqIdString, 10);
      this.enqId = idNumber;   
    }
    this.getSPMSupplierlist();
  }

  getSPMSupplierlist() {
    this.loaderService.showLoader();
    this.spmService.getSPMSupplierList(this.loginService.employeeId as number,this.enqId).subscribe((data: any) => {
      this.supplierCards = data;
      this.supplierCards.forEach(Supp =>{
        if(Supp.remarks != "" && Supp.remarks != null){
          const messageString = Supp.remarks;
          Supp.remarksMessage = this.parseRemarksMessages(messageString as string);
        }
      });
      this.loaderService.hideLoader();
    });
  }

  parseRemarksMessages(messageString: string): any[] {
    return messageString.split(',').map(message => {
      const [content, author, timestamp] = message.split('@@@@@@');
      return { content, author, timestamp };
    });
  }

  getAttachmentDetails(suppDocId: string, attachmentGUID: string){
    this.enquiryDetailsService.getAttachmentDetails(suppDocId, this.docSrcTypeSuppAttachment, attachmentGUID).subscribe((data: any) => {
      if(data!=null)
        this.myFiles = data;
      else
        this.myFiles = [];
    });
  }

  onClickSuppAttachment(suppDocId: number, attachmentGUID: string){
    if(suppDocId != 0)
      this.getAttachmentDetails(suppDocId as unknown as string,attachmentGUID);
    this.showSuppAttachment = !this.showSuppAttachment;
  }

  navigateById(supplierID: number) {
    this.router.navigate(['/sales-parts-management-approval',this.enqId,supplierID]);
  }

  onReset(){
    this.ngOnInit()  
  }

  onBackClickHandle(){
    this.router.navigate(['/sales-parts-management']);
  }

  downloadAttachment(suppDocId: number, attachmentGUID: string, index: number) {
    this.enquiryDetailsService.getAttachment(suppDocId.toString(), this.docSrcTypeSuppAttachment, attachmentGUID, index).subscribe((response) => {
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
