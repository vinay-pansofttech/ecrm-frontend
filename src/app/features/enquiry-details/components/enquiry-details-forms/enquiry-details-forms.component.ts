import { Component,Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { EnquiryDetailsService } from '../../enquiry-details.service';

type generatedFrom ={
  generatedFromID: number,
  generatedFrom: string,
  comboType: string,
  refId: true
}
type salesWorkFlow ={
  salesWorkflowID: number,
  salesWorkflow: string,
  comboType: string,
  isPartNoMandatory: true,
  msTypeID: number
}
type salesChannel={
  salesChannelID: number,
  salesChannel: string,
  comboType: string
}
type quoteEntityCompany ={
  companyID: number,
  companyName: string,
  comboType: string,
  isCompActive: true
}

type quoteEntityCurrency ={
  quoteCurrencyID: number,
  quoteCurrencyName: string,
  comboType: string
}

type generatedBy = {
  generatedByID: number,
  generatedBy: string,
  comboType: string,
  isGeneratedByActive: true
}

type salesExecutive ={
  salesExecID: number,
  salesExecName: string,
  comboType: string,
  refId: true
}

@Component({
  selector: 'app-enquiry-details-forms',
  templateUrl: './enquiry-details-forms.component.html',
  styleUrls: ['./enquiry-details-forms.component.scss']
})
export class EnquiryDetailsFormsComponent implements OnInit {

  public areaList: any = [];
  public sales: unknown = [];
  public channel: unknown = [];
  public company: any = [];
  public quoteEntityCurrency :unknown = [];
  public generatedBy : unknown =[];
  public salesExecutive : unknown =[];
  public generatedFromList : unknown =[];
  public companyList : unknown =[];

  public salesExecutiveDefaultValue: {
    salesChannelID: unknown;
    salesChannel: unknown;
    comboType: string;
  
  } | null = null;

  @Input()
  public enquiryDetailsForms!: FormGroup;
  public generatedByVisible = false;
  constructor(public enquiryDetailsService: EnquiryDetailsService) {
    this.areaList = this.areaList.slice();
    this.company = this.company.slice();
  }
  ngOnInit(): void {
  this.generatedFrom();
  this.salesWorkFlow(); 
  this.fetchsalesChannel();
  this.quoteEntityCompany();

  }
  private generatedFrom(){
    this.enquiryDetailsService.getgeneratedFrom().subscribe(data => {
     this.areaList = data;
     this.generatedFromList = data;
   });
 }


  @Input()
  handlegeneratedFrom(generated: generatedFrom) {
    if (generated && generated.generatedFrom) {
       if (
        generated.generatedFrom === 'Marketing' ||
        generated.generatedFrom === 'Transactional Sales' ||
        generated.generatedFrom === 'E-commerce Portals'
      ) {
        this.enquiryDetailsService.getgeneratedBy(generated.generatedFrom).subscribe(res => {
          this.generatedBy = res;
        });
        this.generatedByVisible =true
         this.enquiryDetailsForms.controls['generatedBy'].setValidators([Validators.required])
       
      
    }else{
      this.generatedByVisible =false
    }
  }
  }

  private salesWorkFlow(){
  this.enquiryDetailsService.getsalesWorkFlow().subscribe(data => {
    this.sales = data;
  });
 }

 private quoteEntityCompany(){
  this.enquiryDetailsService.getquoteEntityCompany().subscribe(data => {
    this.company = data;
    this.companyList = data;
  });
}

handlequoteEntityCurrency(company : quoteEntityCompany){
  if (company && company?.companyID) {
    this.enquiryDetailsService
      .getquoteEntityCurrency(company.companyID)
      .subscribe(res => {
        this.quoteEntityCurrency = res;
      });
  }
}

  private fetchsalesChannel(){
  this.enquiryDetailsService.getsalesChannel().subscribe(data => {
    this.channel = data;
  });
}

handleSalesChannel(sales:salesChannel){ 
  if (sales && sales?.salesChannelID) {
    this.enquiryDetailsService
      .getsalesExecutive(0, 0, sales.salesChannelID ,21665 )
      .subscribe((res: any) => {
        this.salesExecutive = res || '';
        this.salesExecutiveDefaultValue = {
          salesChannelID: res[0]?.salesExecID,
          salesChannel: res[0]?.salesExecName,
          comboType: 'SALESPERSON',
        };
        this.enquiryDetailsForms.patchValue({
          salesExecutive: this.salesExecutiveDefaultValue.salesChannelID,
        })
        
        
      });
 }
}

//dropdown filter//

  handlegeneratedFromFilter(generatedFromID : any){
    if(generatedFromID && generatedFromID.length >=1){
    this.areaList = this.areaList.filter(
      (s: {generatedFrom: string; }) => s.generatedFrom.toLowerCase().indexOf(generatedFromID.toLowerCase()) !== -1
    )}
    else{
      this.areaList= this.generatedFromList
    }
  }
  handlequoteEntityCurrencyFilter(companyID: any){
    if(companyID && companyID.length >= 1){
    this.company= this.company.filter(
      (s: {companyName: string; }) => s.companyName?.toLowerCase().indexOf(companyID.toLowerCase()) !== -1
    );
  }
  else{
    this.company=this.companyList;
  }
}
  
}
