import { CommonModule } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressService } from '../../shared/services/progress-service';
import { DataService } from '../../shared/services/autoeval-service';
import { AutoevalCardComponent } from './autoeval-card/autoeval-card.component';
import { AutoevalEndpageComponent } from './autoeval-endpage/autoeval-endpage.component';

@Component({
  selector: 'app-autoeval',
  templateUrl: './autoeval.component.html',
  styleUrl: './autoeval.component.css',
  imports: [CommonModule, ButtonModule, ToastModule, AutoevalCardComponent, ProgressBarModule, DividerModule, AutoevalEndpageComponent]
})

export class AutoevalComponent {
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  autoevalCard = viewChild(AutoevalCardComponent);
  cat = computed(() => this.dataService.currentTopic()); // Nom de la catégorie actuelle
  index_cat = computed(() => this.categories.indexOf(this.cat())); // Index de la catégorie actuelle
  percentage = computed(() => this.dataService.questionNumberTopic() / this.dataService.numberOfQuestions[this.dataService.currentTopic()]*100); // Pourcentage de progression
  categories: string[] = this.dataService.topics; // Liste des catégories

  back(){
    this.progressService.goToPrevious() 
  }
}
