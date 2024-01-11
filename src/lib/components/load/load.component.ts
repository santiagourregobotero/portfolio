import { Component } from '@angular/core';
import { ResumeService } from '@lib/service/resume/resume.service';
import { forkJoin, timer } from 'rxjs';

const NAME = ' Santiago Urrego Botero ';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent {
  visible: boolean = true;
  nameVisible: boolean = false;
  name: string = ' ';
  timeId: any;

  constructor(private resumeService: ResumeService) {
    document.body.style.overflowY = 'hidden';

    forkJoin([resumeService.init(), timer(100)]).subscribe(() => {
      document.body.style.overflowY = 'scroll';
      this.visible = false;
    });
    // setTimeout(() => this.titleSet(), 400);
  }

  titleSet() {
    if (this.name.length == NAME.length) return;
    this.name = NAME.slice(0, this.name.length + 1);
    this.nameVisible = true;
    setTimeout(() => this.titleSet(), 100);
  }
}
