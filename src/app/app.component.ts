import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as data from './shared/assets/data/questions_final.json';
import { AutoevalData } from './shared/types/interfaces';
import { HeaderComponent } from "./views/header/header.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'INCLUSIF: Le jeu';
  autoevalData = autoevalData;
}

export const autoevalData: AutoevalData = data;
