import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SalesPartsManagementService, SPMSupplierListItem } from '../../sales-parts-management.service';
import { CommonService, AttachmentPopupDetails } from 'src/app/features/common/common.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-salespartsmgt-supplier-list',
  templateUrl: './salespartsmgt-supplier-list.component.html',
  styleUrls: ['./salespartsmgt-supplier-list.component.scss']
})

export class SalespartsmgtSupplierListComponent {
  public showSPMAPILoader = false;
  supplierCards: SPMSupplierListItem[] = [];
  enqId!: number;

  //Attachment Pop up related variables
  showSuppAttachment: boolean = false;
  attachmentPopupDetails: AttachmentPopupDetails [] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private spmService: SalesPartsManagementService,
    public commonService : CommonService
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

  onClickSuppAttachment(docSrcVal: number, docSrcType: number, docSrcGUID: string, event: MouseEvent | TouchEvent | null){
    this.attachmentPopupDetails = [];
    this.attachmentPopupDetails.push({
      docSrcVal: docSrcVal as unknown as string,
      docSrcType: docSrcType,
      docSrcGUID: docSrcGUID,
      touchEvent: event
    });
    this.showSuppAttachment = !this.showSuppAttachment;
  }

  onCloseAttachmentPopup(){
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

}
