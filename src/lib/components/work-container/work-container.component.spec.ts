import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContainerComponent } from './work-container.component';

describe('WorkContainerComponent', () => {
  let component: WorkContainerComponent;
  let fixture: ComponentFixture<WorkContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkContainerComponent]
    });
    fixture = TestBed.createComponent(WorkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
