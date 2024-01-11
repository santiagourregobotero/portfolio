import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResumeService } from '@lib/service/resume/resume.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutContent: string = '';
  skillContent: string = '';
  educationContent: string = '';

  constructor(private resumeService: ResumeService) {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  ngOnInit() {}

  load() {
    this.aboutContent = this.resumeService.getAbout();
    this.skillContent = this.resumeService.getSkill();
    this.educationContent = this.resumeService.getEducation();
  }
}
