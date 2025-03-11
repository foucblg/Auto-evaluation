import { Component, inject } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/audit-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autoeval-homepage',
  imports: [ButtonModule, DividerModule, PanelModule, InputNumberModule, BlockUIModule, ImageModule],
  templateUrl: './autoeval-homepage.component.html',
  styleUrl: './autoeval-homepage.component.css'
})
export class AutoevalHomepageComponent {
  /* Page de présentation du quiz
  * Permet la séléction du nombre de questions par multiples de la longueur du cycle de thèmes
  */
  progressService = inject(ProgressService);
  dataService = inject(DataService);
  possibleNumberOfQuestionsPerTopic = [1, 2, 3];
  iNumberOfQuestions = 0;

  constructor(private router:Router) {
    // Au chargement du site, cette page est affichée,
    // si l'URL n'est pas celle de la page de départ, elle est redirigée
    this.progressService.goToBegining();
  }

  continuer(){
    this.router.navigate(['./contexte'])
  }

  adjustNumberOfQuestions(c: number) {
    this.iNumberOfQuestions += c;
  }
}
