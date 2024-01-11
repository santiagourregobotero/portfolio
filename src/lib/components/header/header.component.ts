import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ResumeService } from '@lib/service/resume/resume.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name: string = '';
  links: { [key: string]: string } = {};
  nav = [
    {
      title: 'about',
      route: '/about',
    },
    {
      title: 'experience',
      route: '/work',
    },
    {
      title: 'projects',
      route: '/project',
    },
    {
      title: 'contact',
      route: '/contact',
    },
  ];
  current_index = 0;
  verticalOffset = 0;

  constructor(
    private route: Router,
    private resumeService: ResumeService,
    private titleService: Title
  ) {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  load() {
    this.name = this.resumeService.getName();
    this.links = this.resumeService.getLink();

    this.titleService.setTitle(this.name);
  }

  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.nav.forEach((item, index) => {
          if (item.route == event.url) this.current_index = index;
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }
}
