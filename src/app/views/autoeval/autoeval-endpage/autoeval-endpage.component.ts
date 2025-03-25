import { Component, inject } from '@angular/core';
import { ProgressService } from '../../../shared/services/progress-service';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../shared/services/autoeval-service';

@Component({
  selector: 'app-autoeval-endpage',
  imports: [ButtonModule],
  templateUrl: './autoeval-endpage.component.html',
  styleUrl: './autoeval-endpage.component.css'
})
export class AutoevalEndpageComponent {
  progressService = inject(ProgressService);
  dataService = inject(DataService);
}
