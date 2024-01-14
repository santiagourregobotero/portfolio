import { Component, Input } from '@angular/core';
import { Recommendation } from '@lib/service/resume/resume.service';
@Component({
  selector: 'app-recommendation-container',
  templateUrl: './recommendation-container.component.html',
  styleUrls: ['./recommendation-container.component.scss'],
})
export class RecommendationContainerComponent {
  @Input() data?: Recommendation;
}
