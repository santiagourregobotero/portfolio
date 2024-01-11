import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
  @Input() ImageList: string[] = [];
  CurrentIndex: number = 0;

  SetCurrent(_current: number) {
    this.CurrentIndex = _current;
  }
}
