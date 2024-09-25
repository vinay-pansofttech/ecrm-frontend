import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorksheetService, WorkSheetSO, WorksheetPrerequisites } from '../../worksheet.service';
import { CommonService, AttachmentPopupDetails } from 'src/app/features/common/common.service';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss'],
})
export class PriceDetailsComponent implements OnInit,OnChanges{
  @Input() public priceDetails!: FormGroup;
  public showWorksheetAPILoader = false;
  @Input() public worksheetDetailsCard!: WorkSheetSO[];
  @Input() public WorksheetPrerequisites!: WorksheetPrerequisites[];
  sysDiscBackgroundColor: string = '';
  sysDiscleftBorderColor: string = '';
  sysDisc!: number;

  //Attachment Pop up related variables 
  showSysDiscAttachment: boolean = false;
  attachmentPopupDetails: AttachmentPopupDetails [] = [];

  constructor(
    private worksheetService: WorksheetService,
    private formBuilder: FormBuilder,
    public  commonService: CommonService
  ){}

  ngOnInit(){
    this.worksheetDetailsCard = this.worksheetService.worksheetDetailsCard;
    this.patchComments();
    this.SystemDiscount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['worksheetDetailsCard'] && !changes['worksheetDetailsCard'].firstChange) {
      this.patchComments();
    }
  }

  patchComments(){
    this.priceDetails.patchValue({
      amComments: this.worksheetDetailsCard[0]?.level1Comments,
      smComments: this.worksheetDetailsCard[0]?.level2Comments,
      mgmtComments: this.worksheetDetailsCard[0]?.level3Comments,
      finComments: this.worksheetDetailsCard[0]?.level4Comments
    });
  }

  formatNumber(value: any): number {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parseFloat(parsedValue.toFixed(2));
    }
    return 0.00;
  }

  SystemDiscount(): void {
    this.sysDisc = this.formatNumber((this.worksheetDetailsCard[0].sowspDifferenceQC / this.worksheetDetailsCard[0].grossSPQC) * 100);

    if (this.sysDisc == 0) {
      this.sysDiscBackgroundColor = '#d0f7d5';
      this.sysDiscleftBorderColor = '#036e16';
    } else if (this.sysDisc >= 0 && this.sysDisc <= 5) {
      this.sysDiscBackgroundColor = '#fcfc81';
      this.sysDiscleftBorderColor = '#f5f105';
    } else if (this.sysDisc > 5 && this.sysDisc <= 10) {
      this.sysDiscBackgroundColor = '#fae8c3';
      this.sysDiscleftBorderColor = '#f5a505';
    } else if (this.sysDisc > 10) {
      this.sysDiscBackgroundColor = '#fac4c3';
      this.sysDiscleftBorderColor = '#FF0000';
    }
  }

  onClickSuppAttachment(event: MouseEvent | TouchEvent | null){
    this.attachmentPopupDetails = [];
    this.attachmentPopupDetails.push({
      docSrcVal: this.worksheetDetailsCard[0].workSheetId.toString(),
      docSrcType: this.commonService.docSrcTypeWSAttachment,
      docSrcGUID: "",
      touchEvent: event
    });
    this.showSysDiscAttachment = !this.showSysDiscAttachment;
  }

  onCloseAttachmentPopup(){
    this.showSysDiscAttachment = !this.showSysDiscAttachment;
  }

}
