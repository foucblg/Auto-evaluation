import { Component, inject } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../shared/services/audit-service';

@Component({
  selector: 'app-quiz-endpage',
  imports: [ButtonModule],
  templateUrl: './audit-endpage.component.html',
  styleUrl: './audit-endpage.component.css'
})
export class QuizEndpageComponent {
  progressService = inject(ProgressService);
  dataService = inject(DataService);

  constructor() {
    console.log(this.dataService.topics);
    console.log(this.progressService.score);
  }
}
