import { Component, inject, viewChild } from '@angular/core';
import { ChoiceBoxComponent } from './choice-box/choice-box.component';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/audit-service';
import { Answer } from '../../../shared/types/enums';

@Component({
  selector: 'app-audit-card',
  imports: [ChoiceBoxComponent],
  templateUrl: './audit-card.component.html',
  styleUrl: './audit-card.component.css'
})
export class AuditCardComponent {
  dataService = inject(DataService);
  progressService = inject(ProgressService);
  answerType = Answer;
  audit_segment = this.dataService.currentSegment;
  choiceBox = viewChild(ChoiceBoxComponent);
}

