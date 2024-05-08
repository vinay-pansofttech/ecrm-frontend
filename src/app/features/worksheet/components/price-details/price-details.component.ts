import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileInfo } from "@progress/kendo-angular-upload";
import { WorksheetService, WorkSheetSO, WorksheetPrerequisites } from '../../worksheet.service';
import { EnquiryDetailsService } from 'src/app/features/enquiry-details/enquiry-details.service';


@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss'],
})
export class PriceDetailsComponent implements OnInit,OnChanges{
  myFiles: Array<FileInfo> = [];
  @Input() public priceDetails!: FormGroup;
  public showWorksheetAPILoader = false;
  @Input() public worksheetDetailsCard!: WorkSheetSO[];
  @Input() public WorksheetPrerequisites!: WorksheetPrerequisites[];
  sysDiscBackgroundColor: string = '';
  sysDiscleftBorderColor: string = '';
  sysDisc!: number;
  docSrcTypeWSAttachment: number = 658;
  showSysDiscAttachment: boolean = false;

  constructor(
    private worksheetService: WorksheetService,
    private formBuilder: FormBuilder,
    private enquiryDetailsService: EnquiryDetailsService
  ){}

  ngOnInit(){
    this.worksheetDetailsCard = this.worksheetService.worksheetDetailsCard;
    this.patchComments();
    this.SystemDiscount();
    if(this.worksheetService.wsattachments != null){
      this.myFiles = this.worksheetService.wsattachments;
    }
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

  onClickShowSysDiscAttachment(){
    this.showSysDiscAttachment = !this.showSysDiscAttachment;
    console.log('files',this.myFiles);
  }

  downloadAttachment(index: number) {
    this.enquiryDetailsService.getAttachment(this.worksheetDetailsCard[0].workSheetId.toString(), this.docSrcTypeWSAttachment, index).subscribe((response) => {
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
