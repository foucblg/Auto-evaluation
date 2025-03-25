import { Component, inject } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { ProgressService } from '../../../shared/services/progress-service';
import { DataService } from '../../../shared/services/autoeval-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autoeval-homepage',
  imports: [ButtonModule, DividerModule, PanelModule, InputNumberModule, BlockUIModule, ImageModule],
  templateUrl: './autoeval-homepage.component.html',
  styleUrl: './autoeval-homepage.component.css'
})
export class AutoevalHomepageComponent {
  /* Page de présentation de l'auto-évaluation
  * Permet la séléction du nombre de questions par multiples de la longueur du cycle de thèmes
  */
  progressService = inject(ProgressService);
  dataService = inject(DataService);

  constructor(private router:Router) {}

  continuer(){
    this.router.navigate(['/autoeval/contexte'])
  }
}
