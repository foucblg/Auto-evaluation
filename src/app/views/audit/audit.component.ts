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
  imports: [CommonModule, ButtonModule, ToastModule, AuditCardComponent, ProgressBarModule, DividerModule, QuizEndpageComponent]
})

export class AuditComponent {
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  auditCard = viewChild(AuditCardComponent);
  cat = computed(() => this.dataService.currentTopic()); // Nom de la catégorie actuelle
  index_cat = computed(() => this.categories.indexOf(this.cat())); // Index de la catégorie actuelle
  percentage = computed(() => this.dataService.questionNumberTopic() / this.dataService.numberOfQuestions[this.dataService.currentTopic()]*100); // Pourcentage de progression
  categories: string[] = this.dataService.topics; // Liste des catégories

  back(){
    this.progressService.goToPrevious() 
  }
}
