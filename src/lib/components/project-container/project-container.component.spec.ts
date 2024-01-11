import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContainerComponent } from './project-container.component';

describe('ProjectContainerComponent', () => {
  let component: ProjectContainerComponent;
  let fixture: ComponentFixture<ProjectContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectContainerComponent]
    });
    fixture = TestBed.createComponent(ProjectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
