import { Component, Input, HostListener, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { PopoverComponent, PopoverContainerDirective, PopoverAnchorDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-notification-colors',
  templateUrl: './notification-colors.component.html',
  styleUrls: ['./notification-colors.component.scss']
})
export class NotificationColorsComponent implements AfterViewInit {
  public popoverWidth: number = 270;
  @Input() data: { color: string, name: string }[] = [];
  @ViewChildren(PopoverAnchorDirective) popovers!: QueryList<PopoverAnchorDirective>;

  ngAfterViewInit() {
    console.log('Data Received for Notification', this.data);
    console.log('Popover Container Directive:', this.popovers);
  }

  closePopover(rowIndex: number): void {
    const popoverAnchor = this.popovers.toArray()[rowIndex];
    if (popoverAnchor) 
      popoverAnchor.hide();     
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setPopoverWidth((event.target as Window).innerWidth);
  }

  private setPopoverWidth(screenWidth: number): void {
    this.popoverWidth = screenWidth <= 590 ? 270 : 380;
  }
}
