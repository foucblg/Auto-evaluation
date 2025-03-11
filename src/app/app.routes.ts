import { Routes } from '@angular/router';
import { ContexteComponent } from './views/audit/autoeval-contexte/autoeval-contexte.component';
import { AuditComponent } from './views/audit/audit.component';

export const routes: Routes = [
  {
    path: 'audit', title: "Audit d'inclusivité", children: [
      { path: '**', component: AuditComponent },
    ],
  },
  {path: 'contexte', component: ContexteComponent},
  { path: '', redirectTo: 'audit/accueil', pathMatch: 'full' },
];
