import { CommonModule } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressService } from '../../shared/services/progress-service';
import { DataService } from '../../shared/services/audit-service';
import { QuizEndpageComponent } from "./audit-endpage/audit-endpage.component";
import { AutoevalHomepageComponent } from './autoeval-homepage/autoeval-homepage.component';
import { AuditCardComponent } from './audit-card/audit-card.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css',
  imports: [CommonModule, ButtonModule, ToastModule,AutoevalHomepageComponent,AuditCardComponent, ProgressBarModule, DividerModule, QuizEndpageComponent]
})

export class AuditComponent {
  /* Gère les cartes quiz par rapport à l'avancement dans le quiz et affiche une barre de progression le cas échéant*/
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  auditCard = viewChild(AuditCardComponent);
  progressPercentage = computed(() => this.progressService.questionNumber() / (this.dataService.numberOfQuestions+1) * 100)

}
