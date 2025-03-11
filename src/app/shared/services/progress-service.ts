import {inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { DataService } from "./audit-service";

@Injectable({
  providedIn: 'root'
})

export class ProgressService {
  router = inject(Router);
  route = inject(ActivatedRoute);
  dataService = inject(DataService);
  currentAnswer = signal<number>(0);
  score = signal(Object.fromEntries(this.dataService.topics.map(topic => [topic, [0, 0]])));
  questionNumber = signal(0);
  hasEnded = signal(false);

  goToBegining() {
    this.questionNumber.set(0);
    this.hasEnded.set(false);
    this.router.navigate(["audit", "accueil"], { onSameUrlNavigation: 'ignore' });
  }

  start() {
    this.dataService.startAudit();
    this.questionNumber.set(1);
    this.router.navigate(["audit", this.questionNumber().toString()], {
      queryParams: { theme: this.dataService.currentTopic()},
      replaceUrl: this.questionNumber() > 0,
    });
  }

  goToEnd() {
    /* Envoie sur la page de fin */
    this.hasEnded.set(true);
    this.router.navigate(["audit", "end"], { replaceUrl: true });
  }

  goToNext() {
    console.log(this.dataService.topics)
    this.dataService.getNewQuestion();
    if (!this.dataService.hasEnded()) {
      this.questionNumber.update(n => n + 1);
      this.router.navigate(["audit", this.questionNumber().toString()], {
        queryParams: { theme: this.dataService.currentTopic()},
        replaceUrl: this.questionNumber() > 0,
      });
    } else {
      this.goToEnd();
    }
  }

  answer() {
    if (this.currentAnswer() in [0, 1, 2]) {
      this.score.update(scores => {
        scores[this.dataService.currentTopic()][0] += this.dataService.currentSegment()!.outOf*(1-this.currentAnswer()/2);
        scores[this.dataService.currentTopic()][1] += this.dataService.currentSegment()!.outOf;
        return scores;
      });
      this.goToNext();
    }
  }
}
