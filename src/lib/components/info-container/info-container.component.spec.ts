import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContainerComponent } from './info-container.component';

describe('InfoContainerComponent', () => {
  let component: InfoContainerComponent;
  let fixture: ComponentFixture<InfoContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoContainerComponent]
    });
    fixture = TestBed.createComponent(InfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
