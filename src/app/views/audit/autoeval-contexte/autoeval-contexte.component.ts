import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressService } from '../../../shared/services/progress-service';

@Component({
  selector: 'app-autoeval-contexte',
  templateUrl: './autoeval-contexte.component.html',
  styleUrl: './autoeval-contexte.component.css',
  imports: [ButtonModule]
})
export class ContexteComponent {
  constructor(private router:Router, private progressService:ProgressService) {}
  continuer(){
    this.progressService.start();
  }
}
