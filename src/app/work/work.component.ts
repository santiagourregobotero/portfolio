import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResumeService } from '../../lib/service/resume/resume.service';

interface JobExperience {
  role: string;
  company: string;
  date: string;
  description: string[];
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  jobExperiences: JobExperience[] = [];

  constructor(private http: HttpClient, private resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  load() {
    this.jobExperiences = this.resumeService.getExperience();
  }

  /*
  parseResume(markdown: string): JobExperience[] {
    const lines = markdown.split('\n');
    const jobExperiences: JobExperience[] = [];
    let currentJob: JobExperience = {
      role: '',
      company: '',
      date: '',
      description: [],
    };

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentJob.role.length != 0) jobExperiences.push(currentJob);
        currentJob = { role: '', company: '', date: '', description: [] };
        currentJob.role = line.slice(2);
      } else if (line.startsWith('### ')) {
        currentJob.company = line.slice(4);
      } else if (line.startsWith('`')) {
        currentJob.date = line.slice(1, -2);
      } else if (line.trim() !== '') {
        currentJob.description.push(line.trim());
      }
    }
    if (currentJob.role.length != 0) jobExperiences.push(currentJob);
    return jobExperiences;
  }
  */
}
