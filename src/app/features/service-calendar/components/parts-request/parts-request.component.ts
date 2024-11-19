import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CommonService } from 'src/app/features/common/common.service';
import { ServiceCalendarService, svcPartsDetails, svcDependentComboData, svcPrerequisites, svcPartsRequest } from '../../service-calendar.service';

@Component({
  selector: 'app-parts-request',
  templateUrl: './parts-request.component.html',
  styleUrls: ['./parts-request.component.scss']
})

export class PartsRequestComponent {
  showAPILoader = false;
  loaderMessage: string = 'Loading Details...';
  partsSearchForm!: FormGroup;
  @Input() srid: number = 0;
  @Input() servicePrerequisites: svcPrerequisites[] = [];
  searchPartsDetailsCard: svcPartsDetails[] = [];
  addedPartsDetailsCard: svcPartsDetails[] = [];
  svcpartsRequestItems: svcPartsRequest[] = [];

  dependantComboDataForSupplier: svcDependentComboData[] = [];
  filteredSupplierData: svcDependentComboData[] = [];
  dependantComboDataForManufacturer: svcDependentComboData[] = [];
  filteredManufacturerData: svcDependentComboData[] = [];
  isPartsRequisitionOpen = true;
  isSearchTabOpen: boolean = false;
  isContinueCall: boolean = false;
  isWaitCall: boolean = true;
  public virtual: any = {
    itemHeight: 28,
  };

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderService,
    public  commonService: CommonService,
    private serviceCalendarService: ServiceCalendarService,
    private datePipe : DatePipe,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
      this.loaderService.loaderState.subscribe(res => {
        this.showAPILoader = res;
      });
      this.loaderService.hideLoader();
      this.loaderMessage = 'Loading Details...';
      this.partsSearchForm = this.formBuilder.group({
        manufacturer: new FormControl(null ,Validators.nullValidator),
        supplier: new FormControl(null ,Validators.nullValidator),
        partNo: new FormControl(null ,Validators.required),
        productLine: new FormControl(null, Validators.nullValidator),
        description: new FormControl('', Validators.nullValidator),
      });
      this.addedPartsDetailsCard = this.serviceCalendarService.addedPartsDetailsCard;
      this.getDependantComboForSupplier();
      this.getDependantComboForManufacturer();
      this.callHandleClick();
  }

  onAddPartsClick() {
    this.isPartsRequisitionOpen = false;
    this.isSearchTabOpen = true;
  }

  getDependantComboForManufacturer(){
    this.serviceCalendarService.getDependentCombo("PRMANUFACTURER",0,this.loginService.employeeId as number).subscribe((data: any) => {
      this.dependantComboDataForManufacturer = data;
      this.filteredManufacturerData = data;
    });
  }

  getDependantComboForSupplier(){
    this.serviceCalendarService.getDependentCombo("ALLSUPPLIERS",0,this.loginService.employeeId as number).subscribe((data: any) => {
      this.dependantComboDataForSupplier = data;
      this.filteredSupplierData = data;
    });
  }

  onFilterChange(filter: string, type: string): void {
      if(type == 'Manufacturer'){
        this.filteredManufacturerData = this.dependantComboDataForManufacturer.filter(item =>
          item.comboName?.toLowerCase().includes(filter.toLowerCase())
        );
      }
      else if(type == 'Supplier'){
        this.filteredSupplierData = this.dependantComboDataForSupplier.filter(item =>
          item.comboName?.toLowerCase().includes(filter.toLowerCase())
        );
      }
  }

  isCardSelected(index: number, type: string){
    if(type == "searchparts")
      this.searchPartsDetailsCard[index].isCardSelected = !this.searchPartsDetailsCard[index].isCardSelected;
    else if(type == "addedparts")
      this.addedPartsDetailsCard[index].isCardSelected = !this.addedPartsDetailsCard[index].isCardSelected;
  }

  onCardClick(event: Event) {
    const targetElement = event.currentTarget as HTMLElement;
    targetElement.classList.add('selected');
        setTimeout(() => {
      targetElement.classList.remove('selected');
    }, 2000);
  }

  addPartsToList(index: number) {
    const selectedPart = this.searchPartsDetailsCard[index];
    const existingPart = this.addedPartsDetailsCard.find(
      part => part.partNo?.trim() === selectedPart.partNo?.trim() &&
              part.option === selectedPart.option                 &&
              part.supplierID === selectedPart.supplierID         &&
              part.supplierName === selectedPart.supplierName);

    if (existingPart) {
        existingPart.quantity = existingPart.quantity ? existingPart.quantity + 1 : 1;
    } else {
        const clonedPart = JSON.parse(JSON.stringify(selectedPart));
        clonedPart.quantity = 1;
        this.addedPartsDetailsCard.push(clonedPart);
    }
    
    this.serviceCalendarService.addedPartsDetailsCard = this.addedPartsDetailsCard;
  }

  assignPartsRequestDetails(){
    this.svcpartsRequestItems = this.addedPartsDetailsCard.map((detail: svcPartsDetails): svcPartsRequest => ({
      partReqId: 0,
      partsMasterId: 0,
      partListId: 0,
      supplierId: detail.supplierID || 0,
      partsId: detail.partsMasterID || 0,
      partNo: detail.partNo || '',
      option: detail.option? detail.option : null,
      description: detail.description || '',
      productLine: detail.productLine || '',
      quantity: detail.quantity || 0,
      retQuantity: 0,
      status: 1,
      currency: detail.currency || 0,
      unitPrice: detail.price || 0,
      discount: detail.discount || 0,
      partsTypeId: 0,
      conversionRate: 0,
      arrivedDate: null,
      createdBy: 0,
      createdDate: null,
      modifiedBy: 0,
      modifiedDate: null,
      remark: null,
      procurementReasonId: 2,
      procurementReason: 'New/Replacement',
      spCurrencyId: 0,
      itemSp: 0,
      configItemId: 0,
      partsContractId: 0,
      isChecked: false,
      supplierName: detail.supplierName || '',
      orderValue: 0,
      unitItemSp: 0,
      isActive: false,
      isVendorQoteMandat: detail.isVendorQoteMandat || false,
      isCurrencyEdit: detail.isCurrencyEdit || false,
      plArrivedDate: null,
      suppDiscount: 0,
      installBaseId: null,
      ibSerialNumber: null,
      entitlementPartNo: null,
      entitlementSupplier: null,
      entitlementSupplierId: 0,
      entitlementOption: null,
      entitlementPartId: null
    }));
  }

  onPartsRequestSubmit(){
    this.assignPartsRequestDetails();
    this.loaderMessage = 'Requesting for parts...';
    this.loaderService.showLoader();
    this.serviceCalendarService.postPartsRequest(
      this.srid,
      this.servicePrerequisites[0].partReqId? this.servicePrerequisites[0].partReqId : 0,
      this.servicePrerequisites[0].customerId,
      this.servicePrerequisites[0].callIOID? this.servicePrerequisites[0].callIOID: 0,
      '',
      0,
      this.svcpartsRequestItems,
      "SRLC",
      this.isContinueCall,
    ).subscribe((data: any) => {
      this.loaderService.hideLoader();
      this.loaderMessage = 'Loading Details...';
      if (data) {
        const notificationMessage = data.outPut;
        const notificationType = data.outPut.indexOf('Success') !== -1 ? 'success' : 'error';
        this.notificationService.showNotification(
          notificationMessage,
          notificationType,
          'center',
          'bottom'
        );
        if(notificationType == 'success'){
          this.resetValues();
          this.router.navigate([AppRoutePaths.ServiceCalendar]);
        }
      }
    },
    error => {
      this.loaderService.hideLoader();
      this.loaderMessage = 'Loading Details...';
      this.notificationService.showNotification(
        'Parts request unsuccessful' + error,
        'error', 'center', 'bottom'
      );
    });
  }

  onDescriptionClick(index: number, type: string){
    if(type == "searchparts")
      this.searchPartsDetailsCard[index].isDescOpen = !this.searchPartsDetailsCard[index].isDescOpen;
    else if(type == "addedparts")
      this.addedPartsDetailsCard[index].isDescOpen = !this.addedPartsDetailsCard[index].isDescOpen;  
  }

  onSearchClick(){
    this.isSearchTabOpen = !this.isSearchTabOpen;
  }

  onPartsSearchClick(){
    if(this.partsSearchForm.valid){
    const searchFormValue = this.partsSearchForm.value;
    this.serviceCalendarService.getSearchPartsDetails(
      searchFormValue.manufacturer == null? 0: searchFormValue.manufacturer.comboId,
      searchFormValue.supplier == null? 0: searchFormValue.supplier.comboId,
      searchFormValue.partNo,
      searchFormValue.description == null? '': searchFormValue.description,
      searchFormValue.productLine,
      0,
      this.srid
    ).subscribe((data: any) => {
        this.searchPartsDetailsCard = data.filter((item:any) => item.price !== 0 && item.price != null && item.isActive === true);
    });
    this.isSearchTabOpen = false;
    }
    else{
      this.partsSearchForm.markAllAsTouched();
    }
  }

  onPartsSearchClear(){
    this.partsSearchForm.reset();
    this.searchPartsDetailsCard = [];
  }

  onDeleteAddedCards() {
    this.addedPartsDetailsCard = this.addedPartsDetailsCard.filter((item) => !item.isCardSelected);
    this.serviceCalendarService.addedPartsDetailsCard = this.addedPartsDetailsCard;
  }

  callHandleClick(selection?: string){
    if(selection == "waiting"){
      this.isWaitCall = true;
      this.isContinueCall = false;
    }
    else if(selection == "continue"){
      this.isContinueCall = true;
      this.isWaitCall = false;
    }
    else{
      if(this.servicePrerequisites[0].isInProgress)
        this.isContinueCall = true;
      else
        this.isWaitCall = true;
    }
  }

  onBackClickHandle() {
    if(this.isPartsRequisitionOpen){
      this.serviceCalendarService.resetValues();
      this.resetValues();
      this.router.navigate([AppRoutePaths.ServiceCalendar]);
    }
    else{
      this.isPartsRequisitionOpen = true;
    }
  }

  onRefresh(){
    this.ngOnInit();
    this.resetValues();
  }

  resetValues(){
    this.searchPartsDetailsCard = [];
    this.addedPartsDetailsCard = [];
    this.serviceCalendarService.addedPartsDetailsCard = [];
  }

}
