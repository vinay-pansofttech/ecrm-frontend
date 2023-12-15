import { Component,Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
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
@Component({
  selector: 'app-enquiry-details-forms',
  templateUrl: './enquiry-details-forms.component.html',
  styleUrls: ['./enquiry-details-forms.component.scss']
})
export class EnquiryDetailsFormsComponent implements OnInit {

  @Input()
  public enquiryDetailsForms!: FormGroup;
  constructor(public enquiryDetailsService: EnquiryDetailsService) {}
  ngOnInit(): void {
  this.generatedfrom();
  this.salesworkflow(); 
  this.fetchsaleschannel();
  this.quoteEntityCompany();

  }
  private generatedfrom(){
    this.enquiryDetailsService.getgeneratedFrom().subscribe(data => {
     console.log('generated from', data);
     this.areaList = data;
   });
 }
  private salesworkflow(){
  this.enquiryDetailsService.getsalesWorkFlow().subscribe(data => {
    console.log('get sales work flow', data);
    this.sales = data;
  });
 }
  private fetchsaleschannel(){
  this.enquiryDetailsService.getsalesChannel().subscribe(data => {
    console.log('get sales channel', data);
    this.channel = data;
  });
}

private quoteEntityCompany(){
  this.enquiryDetailsService.getquoteEntityCompany().subscribe(data => {
    console.log('get sales channel', data);
    this.company = data;
  });
}

  public areaList: unknown = [];
  public sales: unknown = [];
  public channel: unknown = [];
  public company: unknown = [];
  public area:Array<string> = [
    "Boston",
    "Chicago",
    "Houston",
    "Los Angeles",
    "Miami",
    "New York",
    "Philadelphia",
    "San Francisco",
    "Seattle",
  ];
  public list:Array<string> = [
    "Boston",
    "Chicago",
    "Houston",
    "Los Angeles",
    "Miami",
    "New York",
    "Philadelphia",
    "San Francisco",
    "Seattle",
  ];
}
