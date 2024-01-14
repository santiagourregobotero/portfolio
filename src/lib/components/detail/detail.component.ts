import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Project } from '@lib/service/resume/resume.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @ViewChild('content')
  content!: ElementRef;

  visible: boolean = false;
  project!: Project;
  linkAssets: string[] = [
    'playstore.svg',
    'appstore.svg',
    'web.svg',
    'github.svg',
    'video.png',
  ];

  ngOnInit(): void {}

  show(project: Project) {
    this.project = project;
    document.body.style.overflowY = 'hidden';
    this.visible = true;
  }
  close() {
    document.body.style.overflowY = 'scroll';
    this.visible = false;
    this.closed.emit();
  }
}
