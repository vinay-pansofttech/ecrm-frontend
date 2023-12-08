import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListCardListComponent } from './work-list-card-list.component';

describe('WorkListCardListComponent', () => {
  let component: WorkListCardListComponent;
  let fixture: ComponentFixture<WorkListCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkListCardListComponent]
    });
    fixture = TestBed.createComponent(WorkListCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
