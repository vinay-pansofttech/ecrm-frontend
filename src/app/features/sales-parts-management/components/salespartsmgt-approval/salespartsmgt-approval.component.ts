import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesPartsManagementService, SPMPartsListItem, ProductConfigItemsBO} from '../../sales-parts-management.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { Statement } from '@angular/compiler';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-salespartsmgt-approval',
  templateUrl: './salespartsmgt-approval.component.html',
  styleUrls: ['./salespartsmgt-approval.component.scss']
})
export class SalespartsmgtApprovalComponent {
  public showAPILoader = false;
  isAllCardSelected: boolean = false;
  isDescOpen: boolean = false;
  partsCards: SPMPartsListItem[] = [];
  pageSize = 3;
  filteredCards: SPMPartsListItem[] = [];
  enqId!: number;
  supplierId!: number
  salespartsmgtApprovalForm!: FormGroup;
  lstProductConfig: ProductConfigItemsBO[] = [];
  loaderMessage!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spmService: SalesPartsManagementService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ){}

  ngOnInit(){
    const enqIdString = this.route.snapshot.paramMap.get('id');
    if (enqIdString !== null) {
      const idNumber: number = parseInt(enqIdString, 10);
      this.enqId = idNumber;   
    }
    
    const suppIdString = this.route.snapshot.paramMap.get('suppId');
    if (suppIdString !== null) {
      const idNumber: number = parseInt(suppIdString, 10);
      this.supplierId = idNumber;   
    }
    else{
      this.supplierId = 0;
    }

    this.getSPMPartslist();
    this.salespartsmgtApprovalForm = new FormGroup({
        priceValidateComments: new FormControl('', Validators.nullValidator)
    });
  }

  getSPMPartslist() {
    this.spmService.getSPMPartslist(this.loginService.employeeId as number, this.enqId, this.supplierId).subscribe((data: any) => {
      this.partsCards = data.map((item: SPMPartsListItem) => ({
        ...item,
        isCardSelected: false,
        isDescriptionOpen: false
      }));
    });
  }

  updatePriceValidation(buttonType: string){
    const formValue = this.salespartsmgtApprovalForm.value;
    if (buttonType == 'Rejected' && formValue.priceValidateComments == '') {
      this.notificationService.showNotification(
        'Please enter reject comments',
        'error',
        'center',
        'bottom'
      );
    }
    else{
      if(buttonType == 'Approved')
        this.loaderMessage = "Approving Price Validation...";
      else if(buttonType == 'Rejected')
        this.loaderMessage = "Rejecting Price Validation...";
      this.loaderService.showLoader();
      this.partsCards
      .filter(part => part.isCardSelected)
      .forEach(part => {
        this.lstProductConfig.push({
          listPrice: part.listPrice ?? 0,
          discountPC: part.discountPC ?? 0,
          partsMasterId: part.partsMasterId ?? 0,
          salesProductId: part.salesProductId ?? 0,
          configItemId: part.configItemId ?? 0,
          isUnManagedSupplier: part.isUnManagedSupplier ?? false
        });
      });
      console.log('Selected Cards',this.lstProductConfig);

      if(this.lstProductConfig.length == 0){
        this.notificationService.showNotification(
          'Please select atleast one item for validation',
          'error',
          'center',
          'bottom'
        );
        this.lstProductConfig = [];
      }
      else{
        this.spmService
        .updatePriceValidation(this.loginService.employeeId as number, formValue.priceValidateComments, buttonType, this.lstProductConfig)
        .subscribe((data: any) => {
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          if (data) {
            let notificationMessage = "";
            if(buttonType == 'Approved')
              notificationMessage = data.outPut.startsWith('Success')? "Approved Successfully": data.outPut;
            else if(buttonType == 'Rejected')
              notificationMessage = data.outPut.startsWith('Success')? "Rejected Successfully": data.outPut;

            const notificationType = data.outPut.startsWith('Success') || data.outPut.startsWith('Approval') ? 'success' : 'error';
            this.notificationService.showNotification(
              notificationMessage,
              notificationType,
              'center',
              'bottom'
            );
          }
          this.navigateById(this.enqId);
        },
        error => {
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          this.notificationService.showNotification(
            error,
            'error', 'center', 'bottom'
          );
        });
        this.lstProductConfig = [];
      }
    }
  }

  onReset(){
    this.ngOnInit();
  }

  onSelectLocalSupplier(index: number){
    this.partsCards[index].isUnManagedSupplier = !this.partsCards[index].isUnManagedSupplier;
  }

  isCardSelected(index: number){
    this.partsCards[index].isCardSelected = !this.partsCards[index].isCardSelected;
  }

  toggleCardSelection() {
    this.isAllCardSelected = !this.isAllCardSelected;
    if(this.isAllCardSelected){
      this.partsCards.forEach((card: SPMPartsListItem) => {
        card.isCardSelected = true;
      });
    }
    else if(!this.isAllCardSelected){
      this.partsCards.forEach((card: SPMPartsListItem) => {
        card.isCardSelected = false;
      });
    }
  }

  isDescOpened(index: number){
    this.partsCards[index].isDescriptionOpen = !this.partsCards[index].isDescriptionOpen;
  }

  navigateById(enqId: number) {
    this.spmService.getSPMSupplierList(this.loginService.employeeId as number,enqId).subscribe((data: any) => {
      if(data.length > 0)
        this.router.navigate(['sales-parts-management-supplist',enqId]);
      else
        this.router.navigate(['sales-parts-management']);
    });
  }

  onBackClickHandle(){
    window.history.back();
  }

}
