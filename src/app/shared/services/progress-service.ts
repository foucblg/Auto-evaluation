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
  answers = signal(<number[]>[]);

  goToBegining() {
    this.router.navigate(["audit", "contexte"], { onSameUrlNavigation: 'ignore' });
  }

  start() {
    this.dataService.startAudit();
    this.router.navigate(["audit", this.dataService.questionNumber().toString()], {
    });
  }

  goToEnd() {
    this.router.navigate(["audit", "end"], { replaceUrl: true });
  }

  goToNext() {
    this.dataService.getNewQuestion();
    if (this.dataService.step() !== 'end') {
      this.router.navigate(["audit", this.dataService.questionNumber().toString()], {
      });
    } else {
      this.goToEnd();
    }
  }

  goToPrevious() {
    this.dataService.getPreviousQuestion();
    if (this.dataService.step() !== 'start') {
      this.router.navigate(["audit", this.dataService.questionNumber().toString()], {
      });
    } else {
      this.goToBegining();
    }
  }

  answer() {
    if (this.currentAnswer() in [0, 1, 2]) {
      this.score.update(scores => {
        scores[this.dataService.currentTopic()][0] += this.dataService.currentSegment()!.outOf*(1-this.currentAnswer()/2);
        scores[this.dataService.currentTopic()][1] += this.dataService.currentSegment()!.outOf;
        return scores;
      });
    }
    if (this.answers().length === this.dataService.questionNumber()) {
      this.answers.update(answers => {
        answers.push(this.currentAnswer());
        return answers;
      });
    }
    else{
      this.answers.update(answers => {
        answers[this.dataService.questionNumber()] = this.currentAnswer();
        return answers;
      });
    }
    this.goToNext();
  }
}
