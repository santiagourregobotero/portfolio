import { Component, OnInit } from '@angular/core';
import {
  Recommendation,
  ResumeService,
} from '@lib/service/resume/resume.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutContent: string = '';
  skillContent: string = '';
  educationContent: string = '';
  recommendation_list: Recommendation[] = [];
  constructor(private resumeService: ResumeService) {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.aboutContent = this.resumeService.getAbout();
    this.skillContent = this.resumeService.getSkill();
    this.educationContent = this.resumeService.getEducation();
    this.recommendation_list = this.resumeService.getRecommendation();
  }
}
