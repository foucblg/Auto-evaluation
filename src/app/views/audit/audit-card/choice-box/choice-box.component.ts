import { Component, effect, inject, Input } from '@angular/core';
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
    selectedAnswer: new FormControl<number | null>(null)
  });
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  dialogVisible = false;

  constructor() {
    effect(() => {
      const selected = this.progressService.answers()[this.dataService.questionNumber()];
      this.answerForm.get('selectedAnswer')?.setValue(selected);
    });
  }

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

