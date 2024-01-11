import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '@lib/service/resume/resume.service';
@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
})
export class ProjectContainerComponent {
  @Input() data: Project = new Project();
  @Output() detail = new EventEmitter<void>();

  on_detail() {
    this.detail.emit();
  }
}
