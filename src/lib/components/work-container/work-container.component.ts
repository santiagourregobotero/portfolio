import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-container',
  templateUrl: './work-container.component.html',
  styleUrls: ['./work-container.component.scss'],
})
export class WorkContainerComponent {
  @Input() role: string = '';
  @Input() period: string = '';
  @Input() company: string = '';
}
