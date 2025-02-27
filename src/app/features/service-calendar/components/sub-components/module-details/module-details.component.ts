import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CommonService } from 'src/app/features/common/common.service';
import { ServiceCalendarService, svcPartsDetails, svcPrerequisites, svcPartsRequest, svcIBModuleDetails } from '../../../service-calendar.service';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.scss'
})

export class ModuleDetailsComponent implements OnInit{
  showAPILoader = false;
  loaderMessage: string = 'Loading Details...';
  @Input() public moduleDetails!: FormGroup;
  @Input() srid: number = 0;
  @Input() public isEditable: boolean = false;
  @Input() servicePrerequisites: svcPrerequisites[] = [];
  @Input() moduleDetailsCard: svcIBModuleDetails[] = [];
  @Output() validateModuleDetails: EventEmitter<void> = new EventEmitter<void>();

  modulePartsCard: svcPartsDetails[] = [];
  isModuleDetailsOpen = true;
  isModuleDetailsEditOpen: boolean = false;
  selectedIndex: number = 0;

  constructor(    
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderService,
    public  commonService: CommonService,
    private serviceCalendarService: ServiceCalendarService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.loaderMessage = 'Loading Details...';
    this.validateModuleDetails.emit();
  }

  onAddPartsClick() {
    this.isModuleDetailsOpen = false;
  }

  isCardSelected(index: number){
    this.moduleDetailsCard[index].isCardSelected = !this.moduleDetailsCard[index].isCardSelected;
  }

  onDescriptionClick(index: number){
    this.moduleDetailsCard[index].isDescOpen = !this.moduleDetailsCard[index].isDescOpen;  
  }

  onDeleteAddedCards() {
    this.moduleDetailsCard = this.moduleDetailsCard.filter((item) => !item.isCardSelected);
  }

  onModuleEdit(index: number){
    this.selectedIndex = index;
    this.isModuleDetailsEditOpen = true;
  }

  onBackClickHandle(type: string) {
    this.isModuleDetailsEditOpen = false;
    this.isModuleDetailsOpen = true;
    if(type == 'add')
      this.onPartsAdd();
    this.validateModuleDetails.emit();
  }

  onPartsAdd() {
    this.modulePartsCard = this.serviceCalendarService.addedPartsDetailsCard;
    if (!this.modulePartsCard || this.modulePartsCard.length === 0) {
      return;
    }

    this.modulePartsCard.forEach((part) => {
      const quantity = part.quantity ?? 1;
      for (let i = 0; i < quantity; i++) {
        const newModuleDetail: svcIBModuleDetails = {
          partNo: part.partNo,
          partsMasterId: part.partsMasterID,
          option: part.option,
          description: part.description,
          supplierId: part.supplierID,
          supplier: part.supplierName,
          serialNo: "",
          isChecked: false,
          oldSerialNo: "",
          moduleName: part.description,
          modelNo: "",
          oldModuleName: "",
          oldModelNo: "",
          productLine: part.productLine,
          versionNo: "",
          notes: "",
        };
  
        this.moduleDetailsCard.push(newModuleDetail);
      }
    });
  }  

  onRefresh(){
    this.ngOnInit();
    this.resetValues();
  }

  resetValues(){
    this.moduleDetailsCard = [];
  }
}
