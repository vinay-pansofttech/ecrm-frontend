import { Component, Injectable, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { WorksheetService,WorksheetPrerequisites, WorksheetMarginList, EnquiryDetails } from '../../worksheet.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-margin-details',
  templateUrl: './margin-details.component.html',
  styleUrls: ['./margin-details.component.scss']
})
export class MarginDetailsComponent {
  public showWorksheetAPILoader = false;
  @Input() WorksheetMarginDetailsCard!: WorksheetMarginList[];
  @Input() public WorksheetPrerequisites!: WorksheetPrerequisites[];
  @Input() enquiryDetailsCard: EnquiryDetails[] = [];
  public marginGroupColumns: any [] = [];
  public marginConfigItemsColumns: any [] = [];
  marginGridDetails: WorksheetMarginList[] = [];
  isDownloadloaderVisible: boolean = false;
  
  constructor(
    private worksheetService: WorksheetService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ){}

  ngOnInit() {
    this.loaderService.loaderState.subscribe(res => {
      this.showWorksheetAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.marginGroupColumns = [{ field: "productName", title: "Instrument + DealProdSeq", width: 110 }]
    this.marginGridDetails=this.calculateValues(this.WorksheetMarginDetailsCard);
    
    this.marginConfigItemsColumns =
    [
      {
          field: "productName", title: "Instrument + DealProdSeq", filterable: true, sortable: true,
          editor: false, locked: true, width: 110, template: (dataItem: any) => this.isNullOrZero(dataItem.productName),
      },
      {
          field: "supplierName", title: "Supplier", editor: false, filterable: true, 
          sortable: true, locked: true, width: 110, template: "#=this.isNullOrZero(supplierName)#",
      },
      {
          field: "partNo", title: "Part No.", editor: false, filterable: true, 
          sortable: true, locked: true, width: 110, template: "#=this.isNullOrZero(partNo)#",
      },
      {
          field: "partNoOption", title: "Option", editor: false, filterable: true, 
          sortable: true, locked: true, width: 80, template: "#=this.isNullOrZero(partNoOption)#",
      },
      {
          field: "description", title: "Description", editor: false, filterable: true, 
          sortable: true, locked: true, width: 150, template: "#=this.isNullOrZero(description)#",
      },
      {
          field: "_QuoteMarginPC", title: "Margin", filterable: true, sortable: true, editor: false, 
          width: 99, locked: true, type: "number",
          attributes: { "class": "columnRightToLeft paleGreen" }, format: "{0:n2}",
          headerTemplate: '<div style="text-align:right">Margin</div>',
          template: "# if(productName === 'Parts not to be shown in Quote'){#  <div style='text-align:right'>~</div> # } else {# <div style='text-align:right'>#=  kendo.toString(_QuoteMarginPC, 'n2')#</div>  #}#",
          footerTemplate: this.calculateSumOfMargin("_TotalCostQC", "_NetQuote", this.WorksheetMarginDetailsCard),
      },
      {
          field: "_GoodsCost", title: "Cost of Goods in QC ", filterable: true, sortable: true, 
          editor: false, width: 170, locked: false, type: "number",
          attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
          footerTemplate: this.calculateSumValue("_GoodsCost", this.WorksheetMarginDetailsCard),
          headerTemplate: '<div title="Cost of Goods " style="text-align:right">Cost of Goods ' + this.WorksheetPrerequisites[0].quoteCurrencyName + '</div>',
          headerAttributes: { "class": "k-HighlightPaleBlue" },
      },
      {
          field: "_NetQuote", title: "NetQuote", filterable: true, sortable: true, editor: false, 
          width: 100, locked: false, type: "number",
          attributes: { "class": "columnRightToLeft paleBlue" }, format: "{0:n2}",
          footerTemplate: this.calculateSumValue("_NetQuote", this.WorksheetMarginDetailsCard),
          headerTemplate: '<div style="text-align:right">Net Quote '+ this.WorksheetPrerequisites[0].quoteCurrencyName + '</div>',
      },
      {
          field: "productLine", title: "PL", editor: false, filterable: true, sortable: true, 
          width: 95, template: "#=this.isNullOrZero(productline)#",
      },
      {
          field: "isOptional", title: "Is Opt.", editor: false, filterable: true, 
          sortable: true, width: 95, template: "#=(isOptional == 0)?'No':'Yes'#",
      },
      {
          field: "isAlternateProduct", title: "Is Alt.", editor: false, filterable: true, 
          sortable: true, width: 95, template: "#=(isAlternateProduct == 0)?'No':'Yes'#",
      },
      {
          field: "isUnManagedSupplier", title: "Is LocalSupplier", editor: false, filterable: true, 
          sortable: true, width: 135, template: "#=(isUnManagedSupplier == 0)?'No':'Yes'#",
      }
    ];

    // this.marginConfigItemsColumns =
    // [
    //   {
    //       field: "productName", title: "Instrument + DealProdSeq", filterable: true, sortable: true,
    //       editor: false, locked: true, width: 110, template: (dataItem: any) => this.isNullOrZero(dataItem.productName),
    //   },
    //   {
    //       field: "supplierName", title: "Supplier", editor: false, filterable: true, 
    //       sortable: true, locked: true, width: 110, template: "#=this.isNullOrZero(supplierName)#",
    //   },
    //   {
    //       field: "partNo", title: "Part No.", editor: false, filterable: true, 
    //       sortable: true, locked: true, width: 110, template: "#=this.isNullOrZero(partNo)#",
    //   },
    //   {
    //       field: "partNoOption", title: "Option", editor: false, filterable: true, 
    //       sortable: true, locked: true, width: 80, template: "#=this.isNullOrZero(partNoOption)#",
    //   },
    //   {
    //       field: "description", title: "Description", editor: false, filterable: true, 
    //       sortable: true, locked: true, width: 150, template: "#=this.isNullOrZero(description)#",
    //   },
    //   {
    //       field: "_QuoteMarginPC", title: "Margin", filterable: true, sortable: true, editor: false, 
    //       width: 99, locked: true, type: "number",
    //       attributes: { "class": "columnRightToLeft paleGreen" }, format: "{0:n2}",
    //       headerTemplate: '<div style="text-align:right">Margin</div>',
    //       template: "# if(productName === 'Parts not to be shown in Quote'){#  <div style='text-align:right'>~</div> # } else {# <div style='text-align:right'>#=  kendo.toString(_QuoteMarginPC, 'n2')#</div>  #}#",
    //       footerTemplate: this.calculateSumOfMargin("_TotalCostQC", "_NetQuote", this.WorksheetMarginDetailsCard),
    //   },
    //   {
    //       field: "_GoodsCost", title: "Cost of Goods in QC ", filterable: true, sortable: true, 
    //       editor: false, width: 170, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("_GoodsCost", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div title="Cost of Goods " style="text-align:right">Cost of Goods ' + this.WorksheetPrerequisites[0].quoteCurrencyName + '</div>',
    //       headerAttributes: { "class": "k-HighlightPaleBlue" },
    //   },
    //   {
    //       field: "_NetQuote", title: "NetQuote", filterable: true, sortable: true, editor: false, 
    //       width: 100, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft paleBlue" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("_NetQuote", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">Net Quote '+ this.WorksheetPrerequisites[0].quoteCurrencyName + '</div>',
    //   },
    //   {
    //       field: "productLine", title: "PL", editor: false, filterable: true, sortable: true, 
    //       width: 95, template: "#=this.isNullOrZero(productline)#",
    //   },
    //   {
    //       field: "isOptional", title: "Is Opt.", editor: false, filterable: true, 
    //       sortable: true, width: 95, template: "#=(isOptional == 0)?'No':'Yes'#",
    //   },
    //   {
    //       field: "isAlternateProduct", title: "Is Alt.", editor: false, filterable: true, 
    //       sortable: true, width: 95, template: "#=(isAlternateProduct == 0)?'No':'Yes'#",
    //   },
    //   {
    //       field: "isUnManagedSupplier", title: "Is LocalSupplier", editor: false, filterable: true, 
    //       sortable: true, width: 135, template: "#=(isUnManagedSupplier == 0)?'No':'Yes'#",
    //   },
    //   {
    //       field: "listPrice", title: "ListPrice", filterable: true, sortable: true, editor: false, width: 95, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("ListPrice", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div title="ListPrice" style="text-align:right">Unit List Price</div>',
    //   },
    //   {
    //       field: "supplierCurrency", title: "Supp Curr.", editor: false, filterable: true, 
    //       sortable: true, width: 40, template: "#=this.isNullOrZero(supplierCurrency)#",
    //       headerTemplate: '<div title="Supplier Currency">Supp. <br> Curr.</div>',
    //   },
    //   {
    //       field: "conversionRate", title: "Exc. Rate", filterable: true, 
    //       sortable: true, editor: false, width: 63, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Exchange Rate" style="text-align:right">Exch. <br> Rate</div>',
    //   },
    //   {
    //       field: "sI_DiscountPC", title: "Supp Disc %", filterable: true, sortable: true, 
    //       editor: false, width: 50, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Supplier Discount %" style="text-align:right">Supp. <br/> Disc. %</div>',
    //   },
    //   {
    //       field: "drQ_PC", title: "DRQ %", filterable: true, sortable: true, editor: false, 
    //       width: 50, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="DRQ %" style="text-align:right">DRQ %</div>',
    //   },
    //   {
    //       field: "reqdQty", title: "Qty", filterable: true, sortable: true, editor: false, 
    //       width: 30, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n0}",
    //       headerTemplate: '<div title="Qty" style="text-align:right">Qty.</div>',
    //   },
    //   {
    //       field: "_NetSuppPriceInSC", title: "Net Supp. Price in SC", filterable: true, sortable: true, 
    //       editor: false, width: 100, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Net Supp. Price in Supplier Currency" style="text-align:right">Unit Net Price in Supp. Currency</div>',
    //   },
    //   {
    //       field: "_TotNetSuppPriceInSC", title: "Tot. net Supp. Price in SC", filterable: true, sortable: true, 
    //       editor: false, width: 95, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Tot. net Supp. Price in Supplier Currency" style="text-align:right">Total Net in Supp. Currency</div>',
    //   },
    //   {
    //       title: "(All Amounts in " + this.WorksheetPrerequisites[0].quoteCurrencyName + ")", headerAttributes: { style: "text-align: center;", "class": "k-HighlightPaleBlue" },
    //       columns: [
    //           {
    //               field: "_GoodsCost", title: "Cost of Goods ", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_GoodsCost", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div title="Cost of Goods " style="text-align:right">Cost of Goods</div>',

    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_Warranty_QC", title: "Warranty", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_Warranty_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Warranty</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_Logistics_QC", title: "Logistics", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_Logistics_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Logistics</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_Duty_QC", title: "Duty", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_Duty_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Duty</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_Incentive_QC", title: "Incentive", filterable: true, sortable: true, editor: false, width: 75, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_Incentive_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Incentive</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_Finance_QC", title: "Finance", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_Finance_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Finance</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_CountrySpec_DG_QC", title: "Country Spec", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_CountrySpec_DG_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Country Spec + DG</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_TotalCostQC", title: "TotalCost", filterable: true, sortable: true, editor: false, width: 99, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_TotalCostQC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Total<br>Cost</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_SellOut_QC", title: "SellOut", filterable: true, sortable: true, editor: false, width: 99, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft paleBlue" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_SellOut_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">TSOLP</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //           {
    //               field: "_PartsNotShown_QC", title: "Parts not to be shown in Quote", filterable: true, sortable: true, editor: false, width: 88, locked: false, type: "number",
    //               attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //               footerTemplate: this.calculateSumValue("_PartsNotShown_QC", this.WorksheetMarginDetailsCard),
    //               headerTemplate: '<div style="text-align:right">Parts not to be shown in Quote</div>',
    //               headerAttributes: { "class": "k-HighlightPaleBlue" },
    //           },
    //       ]
    //   },
    //   {
    //       field: "_SystemSellout_DP", title: "System Sellout(Deal Price)", filterable: true, sortable: true, editor: false, width: 99, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("_SystemSellout_DP", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">TDLP(Tot. Deal Price)</div>',
    //   },
    //   {
    //       field: "s_TSOLP", title: "Revised System Sellout(Deal Price)", filterable: true, sortable: true, editor: false, width: 99, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("S_TSOLP", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">Revised TDLP(Tot. Deal Price)</div>',
    //       template:"# if(IsHighQuoteSelloutok === 1){#  <div style='text-align:right; background-color:red; color: white; tite: 'Sellout prices modified to higher value''>#=  kendo.toString(S_TSOLP, 'n2')#</div> # } else {# <div style='text-align:right'>#=  kendo.toString(S_TSOLP, 'n2')#</div>  #}#",
    //   },
    //   {
    //       field: "quoteSellingPriceQC", title: "Quote Sellout", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft paleBlue" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("QuoteSellingPriceQC", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">Total Quote Sellout</div>',
    //   },
    //   {
    //       field: "_QuoteDiscount", title: "Quote Discount", filterable: true, sortable: true, editor: false, width: 75, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       footerTemplate: this.calculateSumValue("_QuoteDiscount", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">Quote Discount</div>',
    //   },
    //   {
    //       field: "quoteDiscQC", title: "Quote Discount %", filterable: true, sortable: true, editor: false, width: 75, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div style="text-align:right">Quote Discount %</div>',
    //   },
    //   {
    //       field: "_NetQuote", title: "NetQuote", filterable: true, sortable: true, editor: false, width: 95, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft paleBlue" }, format: "{0:n2}",

    //       footerTemplate: this.calculateSumValue("_NetQuote", this.WorksheetMarginDetailsCard),
    //       headerTemplate: '<div style="text-align:right">Net Quote</div>',
    //   },
    //   {
    //       field: "subCategoryName", title: "SubCategory", editor: false, filterable: true, sortable: true, width: 80, template: "#=this.isNullOrZero(SubCategoryName)#",
    //   },
    //   {
    //       field: "warrantyPC", title: "Warr %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Warr %" style="text-align:right">Warr %</div>',
    //   },
    //   {
    //       field: "dutyPC", title: "Duty %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Duty %" style="text-align:right">Duty %</div>',
    //   },
    //   {
    //       field: "freightPC", title: "Logistics %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Logistics %" style="text-align:right">Logistics %</div>',
    //   },
    //   {
    //       field: "countrySpecPC", title: "Country Specific %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Country Specific %" style="text-align:right">Country Specific %</div>',
    //   },
    //   {
    //       field: "marginPC", title: "Margin %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Margin %" style="text-align:right">Margin %</div>',
    //   },
    //   {
    //       field: "channelDiscountPC", title: "Channel Discount %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Channel Discount %" style="text-align:right">Channel Discount %</div>',
    //   },
    //   {
    //       field: "incentivePC", title: "Incentive %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Incentive %" style="text-align:right">Incentive %</div>',
    //   },
    //   {
    //       field: "finChargesPC", title: "Finance %", filterable: true, sortable: true, editor: false, width: 65, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="Finance %" style="text-align:right">Finance %</div>',
    //   },
    //   {
    //       field: "dgpc", title: "DG %", filterable: true, sortable: true, editor: false, width: 55, locked: false, type: "number",
    //       attributes: { "class": "columnRightToLeft" }, format: "{0:n2}",
    //       headerTemplate: '<div title="DG %" style="text-align:right">DG %</div>',
    //   },
    // ];
  }

  calculateValues(data: any[]): any {
    return data.map(val => {
      let item = { ...val };
  
      item._NetSuppPriceInSC = item.listPrice - (item.listPrice * (item.sI_DiscountPC + item.drQ_PC) / 100);
      item._TotNetSuppPriceInSC = item._NetSuppPriceInSC * item.reqdQty;
      item._GoodsCost = item._NetSuppPriceInSC * item.conversionRate;
      item._Warranty_QC = item.warrantyPC * item._GoodsCost / 100;
      item._Logistics_QC = item.freightPC * item._GoodsCost / 100;
      item._Duty_QC = item.dutyPC * item._GoodsCost / 100;
      item._Incentive_QC = item.incentivePC * item._GoodsCost / 100;
      item._Finance_QC = item.finChargesPC * item._GoodsCost / 100;
      item._CountrySpec_DG_QC = (item.countrySpecPC + item.dgpc) * item._GoodsCost / 100;
      item._TotalCostQC = (item._GoodsCost + item._Warranty_QC + item._Logistics_QC + item._Duty_QC + item._Incentive_QC + item._Finance_QC + item._CountrySpec_DG_QC) * item.reqdQty;
      item._SellOut_QC = ((item._TotalCostQC / (1 - item.marginPC / 100)) / (1 - item.channelDiscountPC / 100));
  
      // For parts contract
      item._UnitCostQC = item._GoodsCost + item._Warranty_QC + item._Logistics_QC + item._Duty_QC + item._Incentive_QC + item._Finance_QC + item._CountrySpec_DG_QC;
      // item._UnitSellOut_QC = ((item._UnitCostQC / (1 - item.marginPC / 100)) / (1 - item.channelDiscountPC / 100));
  
      item._PartsNotShown_QC = item.totalDealLevelCostQC;
      if (item.productName === 'Parts not to be shown in Quote') {
        item._SellOut_QC = 0.0;
        item._SystemSellout_DP = 0;
  
        item._QuoteDiscount = 0;
        item.quoteDiscQC = 0;
  
        item._NetQuote = 0;
        item._QuoteMarginPC = 0;
      } else {
        item._SystemSellout_DP = item._SellOut_QC + item._PartsNotShown_QC;
  
        item._QuoteDiscount = item.quoteSellingPriceQC * item.quoteDiscQC;
        item.quoteDiscQC = item.quoteDiscQC * 100;
  
        item._NetQuote = item.quoteSellingPriceQC - item._QuoteDiscount;
        item._QuoteMarginPC = (item._NetQuote == 0) ? 0 : ((item._NetQuote - item._TotalCostQC) / item._NetQuote) * 100;
  
        if (item.reqdQty == 0) {
          item._QuoteMarginPC = ((item.unitQuoteSellingPriceQC - item._UnitCostQC) / item.unitQuoteSellingPriceQC) * 100;
        }
      }
  
      return item;
    });
  }

  calculateSumValue(field: string, data: any[]): string {
    let sumTotalCost = 0;

    data.forEach(item => {
      if (item["isOptional"] == '0' && item["isAlternateProduct"] == '0') {
        if (isNaN(item[field])) {
          sumTotalCost += 0;
        } else {
          sumTotalCost += item[field];
        }
      }
    });
    return sumTotalCost.toFixed(2);
  }

  calculateSumOfMargin(totalCost: string, netQuote: string, data: any[]): string {
    let sumTotalCost = 0;
    let sumNetQuote = 0;

    data.forEach(item => {
      if (item["isOptional"] == '0' && item["isAlternateProduct"] == '0' && item["partNo"] != null) {
        sumTotalCost += isNaN(item[totalCost]) ? 0 : item[totalCost];
        sumNetQuote += isNaN(item[netQuote]) ? 0 : item[netQuote];
      }
    });

    const sumMargin = (sumNetQuote === 0) ? 0 : ((sumNetQuote - sumTotalCost) / sumNetQuote) * 100;
    return sumMargin.toFixed(2);
  }

  isNullOrZero(item: any): any {
    return (item == null || item == 0 || item == undefined) ? '' : item;
  }

  marginExcelDownload(){
    this.isDownloadloaderVisible = true;
    this.worksheetService.getWorksheetMarginExcelFile
    (this.enquiryDetailsCard[0].enqID,this.WorksheetPrerequisites[0].marginVersionID,
     this.WorksheetPrerequisites[0].marginVersionName)
    .subscribe((response) => {
      const contentType = response.headers.get('content-type')!;
      console.log(contentType);
      const filename = this.WorksheetPrerequisites[0].marginVersionName + '.xlsx';
      const blob = new Blob([response.body!], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'margin_excel';
      link.click();
      window.URL.revokeObjectURL(url);
      this.isDownloadloaderVisible = false;
      this.notificationService.showNotification(
        'Margin excel downloaded successfully',
        'success', 'center', 'bottom'
      );
    },
    error => {
      this.isDownloadloaderVisible = false;
      this.notificationService.showNotification(
        'Error downloading margin excel' + error,
        'error', 'center', 'bottom'
      );
    });
  }

}
