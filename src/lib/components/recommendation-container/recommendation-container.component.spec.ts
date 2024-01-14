import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationContainerComponent } from './recommendation-container.component';

describe('ProjectContainerComponent', () => {
  let component: RecommendationContainerComponent;
  let fixture: ComponentFixture<RecommendationContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationContainerComponent],
    });
    fixture = TestBed.createComponent(RecommendationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
