import { Component, inject } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../shared/services/autoeval-service';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-autoeval-endpage',
  imports: [ButtonModule, ImageModule],
  templateUrl: './autoeval-endpage.component.html',
  styleUrl: './autoeval-endpage.component.css'
})
export class AutoevalEndpageComponent {
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  sum_of_points:number = 0;
  sum_of_max_points:number = 0;
  score:number = 0;

  get_score() {
    for (var topic of this.dataService.topics) {
      this.sum_of_points = this.progressService.score()[topic][0];
      this.sum_of_max_points = this.progressService.score()[topic][1];
    }
    this.score = this.sum_of_points/this.sum_of_max_points;
    return this.score;
  }
}
