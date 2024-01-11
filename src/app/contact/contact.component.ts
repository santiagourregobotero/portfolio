import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResumeService } from '@lib/service/resume/resume.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  links: { [key: string]: string } = {};

  @ViewChild('email')
  emailRef!: ElementRef;

  @ViewChild('message')
  messageRef!: ElementRef;

  constructor(
    private resumeService: ResumeService,
    private httpClient: HttpClient
  ) {
    this.resumeService.getEvent$().subscribe((message) => {
      this.load();
    });
    this.load();
  }

  load() {
    this.links = this.resumeService.getLink();
  }

  handleContact() {
    let email = this.emailRef.nativeElement.value;
    let message = this.messageRef.nativeElement.value;
    let body = {
      email: email,
      message: message,
    };
    this.httpClient
      .post('https://formspree.io/f/xkndggqw', body)
      .subscribe((response: any) => {
        console.log('get response');
        console.log(response);
      });
  }
}
