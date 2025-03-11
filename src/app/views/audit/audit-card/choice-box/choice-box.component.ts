import { Component, computed, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressService } from '../../../../shared/services/progress-service';
import { DataService } from '../../../../shared/services/audit-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-choice-box',
  imports: [ReactiveFormsModule, RadioButtonModule, CheckboxModule, DialogModule, ButtonModule],
  templateUrl: './choice-box.component.html',
  styleUrl: './choice-box.component.css'
})
export class ChoiceBoxComponent {
  answerForm = new FormGroup({
    selectedAnswer: new FormControl(null) // Ajoute un contrôle pour les choix
  });
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  quiz_segment = this.dataService.currentSegment();
  dialogVisible = false;
  ngOnInit() {
    this.answerForm!.reset();
  }
  answer() {
    const key  = this.answerForm.value.selectedAnswer;
    if (key != null) {
      this.progressService.currentAnswer.set(key); 
      this.progressService.answer();
      this.answerForm.reset();
    }
    else {
      this.dialogVisible = true;
    }
  }

}

