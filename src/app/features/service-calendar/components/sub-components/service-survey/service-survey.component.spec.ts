import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSurveyComponent } from './service-survey.component';

describe('ServiceSurveyComponent', () => {
  let component: ServiceSurveyComponent;
  let fixture: ComponentFixture<ServiceSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
