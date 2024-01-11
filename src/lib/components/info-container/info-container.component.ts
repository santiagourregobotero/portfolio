import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent {
  @Input() title: string = '';
}
