import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCalendarService, engEffortsList } from '../../service-calendar.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { saveAs } from "@progress/kendo-file-saver";
import { PDFViewerTool } from "@progress/kendo-angular-pdfviewer";
import {
  SVGIcon,
  brushIcon,
  uploadIcon,
  saveIcon,
  imageIcon,
} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-csr-generator',
  templateUrl: './csr-generator.component.html',
  styleUrls: ['./csr-generator.component.scss']
})
export class CsrGeneratorComponent {
  signatureOpen: boolean = false;
  arrayBuffer: ArrayBuffer = new ArrayBuffer(8);
  showAPILoader = false;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private serviceCalendarService: ServiceCalendarService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.getCSRFile();
  }

  public value = "";
  public showUpload = false;
  public brushSvg: SVGIcon = brushIcon;
  public uploadSvg: SVGIcon = uploadIcon;
  public saveSvg: SVGIcon = saveIcon;
  public imageIcon: SVGIcon = imageIcon;
  public tools: PDFViewerTool[] = [
      "zoom",
      "zoomInOut",
      "download",
      "print",
  ];

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
     this.serviceCalendarService.getCSRfile(
        this.serviceCalendarService.selectedSRID,
        this.serviceCalendarService.csrComments,
        this.serviceCalendarService.selectedCallCat,
        this.serviceCalendarService.selectedCallCompletion,
        this.value.replace(/^data:image\/png;base64,/, '')
      ).subscribe((data: any) => {
          console.log(data);
          this.serviceCalendarService.getCSRPdf(data.outPut).subscribe((response) => {
            const contentType = response.headers.get('content-type')!;
            const filename = data.outPut;
            const blob = new Blob([response.body!], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || 'attachment';
            link.click();
            window.URL.revokeObjectURL(url);
          });
      });
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

  public getCSRFile(): ArrayBuffer | undefined {
    this.loaderService.showLoader();
    this.serviceCalendarService.getCSRfile(
      this.serviceCalendarService.selectedSRID,
      this.serviceCalendarService.csrComments,
      this.serviceCalendarService.selectedCallCat,
      this.serviceCalendarService.selectedCallCompletion,
      ""
    ).subscribe((data: any) => {
       if (data) {
        this.serviceCalendarService.getCSRPdf(data.outPut).subscribe((response) => {
          if(response.body){
            this.arrayBuffer = response.body;
          }
        });
       }
       this.loaderService.hideLoader();
    },
    error => {
      this.loaderService.hideLoader();
    });
    return undefined;
  }

  onBackClickHandle() {
    this.serviceCalendarService.resetValues();
    this.router.navigate(['/service-calendar']);
  }

  onRefresh(){
    this.getCSRFile();
  }

}
