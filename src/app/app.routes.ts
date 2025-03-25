import { Routes } from '@angular/router';
import { ContexteComponent } from './views/autoeval/autoeval-contexte/autoeval-contexte.component';
import { AutoevalComponent } from './views/autoeval/autoeval.component';
import { AutoevalHomepageComponent } from './views/autoeval/autoeval-homepage/autoeval-homepage.component';

export const routes: Routes = [
  {
    path: 'autoeval',
    title: "Auto-évaluation d'inclusivité",
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: AutoevalHomepageComponent },
      { path: 'contexte', component: ContexteComponent },
      { path: ':id', component: AutoevalComponent }, 
      { path: '**', redirectTo: 'accueil' },
    ],
  },
  { path: '', redirectTo: 'autoeval/accueil', pathMatch: 'full' },
];
