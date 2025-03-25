import { Component, inject, viewChild } from '@angular/core';
import { ChoiceBoxComponent } from './choice-box/choice-box.component';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/autoeval-service';
import { Answer } from '../../../shared/types/enums';

@Component({
  selector: 'app-autoeval-card',
  imports: [ChoiceBoxComponent],
  templateUrl: './autoeval-card.component.html',
  styleUrl: './autoeval-card.component.css'
})
export class AutoevalCardComponent {
  dataService = inject(DataService);
  progressService = inject(ProgressService);
  answerType = Answer;
  autoeval_segment = this.dataService.currentSegment;
  choiceBox = viewChild(ChoiceBoxComponent);
}

