import { Routes } from '@angular/router';
import { ContexteComponent } from './views/audit/autoeval-contexte/autoeval-contexte.component';
import { AuditComponent } from './views/audit/audit.component';
import { AutoevalHomepageComponent } from './views/audit/autoeval-homepage/autoeval-homepage.component';

export const routes: Routes = [
  {
    path: 'audit',
    title: "Audit d'inclusivité",
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: AutoevalHomepageComponent },
      { path: 'contexte', component: ContexteComponent },
      { path: ':id', component: AuditComponent }, 
      { path: '**', redirectTo: 'accueil' },
    ],
  },
  { path: '', redirectTo: 'audit/accueil', pathMatch: 'full' },
];
