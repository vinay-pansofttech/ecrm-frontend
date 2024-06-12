import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService, engEffortsList } from '../../service-calendar.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { DatePipe } from '@angular/common';

import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { saveAs } from "@progress/kendo-file-saver";
import {
  SVGIcon,
  brushIcon,
  uploadIcon,
  saveIcon,
  imageIcon,
} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-efforts-list-view',
  templateUrl: './efforts-list-view.component.html',
  styleUrls: ['./efforts-list-view.component.scss']
})
export class EffortsListViewComponent {
  engeffortListCards: engEffortsList[] = [];
  srid: number = 0;
  currentDate: string = '';
  signatureOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private serviceCalendarService: ServiceCalendarService,
    private datePipe : DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.paramMap.get('Date')!;
    if (idString !== null) {
      const idNumber: number = parseInt(idString, 10);
      this.srid = idNumber;   
    }
    this.engEffortsList();
  }

  engEffortsList() {
    this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
      this.engeffortListCards = data.filter(
        (item: any) => item.empId === this.loginService.employeeId
      );
    });
  }

  iseditable(cardIndex: number): boolean{
    const cardemployeeId = this.engeffortListCards[cardIndex].empId;
    const selectedDate = this.datePipe.transform(new Date(this.currentDate),"yyyy-MM-dd")!;
    const today = this.datePipe.transform(new Date(),"yyyy-MM-dd")!;
    if (selectedDate <= today && this.loginService.employeeId == cardemployeeId) {
       return true;
    } else {
      return false;
    }
  }

  addEffort(cardIndex: number){
    this.router.navigate(['/service-efforts', cardIndex, this.srid, this.currentDate]);
  }



  onBackClickHandle() {
    this.router.navigate(['/service-calendar']);
  }

  onRefresh(){
    this.engEffortsList();
  }


  generateCSR(){
    this.signatureOpen = !this.signatureOpen;
  }
  public value = "";
  public showUpload = false;
  public brushSvg: SVGIcon = brushIcon;
  public uploadSvg: SVGIcon = uploadIcon;
  public saveSvg: SVGIcon = saveIcon;
  public imageIcon: SVGIcon = imageIcon;

  // Use theme colors
  public color = "";
  public backgroundColor = "";
  public strokeWidth = 3;
  public sizes = [
    {
      text: "Normal",
      click: () => (this.strokeWidth = 1),
    },
    {
      text: "Wide",
      click: () => (this.strokeWidth = 3),
    },
  ];

  public imageURL?: SafeUrl;
  private rawImageURL?: string;

  public ngOnDestroy() {
    this.cleanupImage();
  }

  public onSave() {
    this.signatureOpen = !this.signatureOpen;
    saveAs(this.value, "signature.png");
  }

  public onClear() {
    this.value = "";
    this.cleanupImage();
  }

  public onImageUpload(file: File) {
    this.cleanupImage();

    this.readImage(file);
    this.rawImageURL = URL.createObjectURL(file);
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(this.rawImageURL);
  }

  private cleanupImage() {
    if (this.rawImageURL) {
      URL.revokeObjectURL(this.rawImageURL);
      this.imageURL = undefined;
      this.rawImageURL = "";
    }
  }

  public readImage(file: File) {
    const reader = new FileReader();

    const onLoad = () => {
      this.value = reader.result as string;
      reader.removeEventListener("load", onLoad);
    };

    reader.addEventListener("load", onLoad);
    reader.readAsDataURL(file);
  }
}
