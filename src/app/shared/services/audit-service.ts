import { Injectable, signal } from "@angular/core";
import { auditData } from "../../app.component";
import { AuditSegment } from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  topics = auditData["topics"];
  tmp_topics = this.topics.slice();
  auditSegments = auditData["questions"];
  questionNumber = signal(-1);
  hasEnded = signal(false);
  currentSegment = signal<AuditSegment | undefined>(undefined);
  currentTopic = signal("");
  possibleAnswers = auditData["possible_answers"];
  numberOfQuestions = Object.values(this.auditSegments).reduce((acc, val) => acc + val.length, 0);


  startAudit() {
    this.questionNumber.set(0);
    if (this.tmp_topics.length != 0) {
      this.currentTopic.set(this.tmp_topics.shift()!);
    }
    else {
      console.log("Aucun topic n'est défini");
    }
    this.currentSegment.set(this.auditSegments[this.currentTopic()].shift()); 
    this.hasEnded.set(false);
  }

  getNewQuestion() {
    if (this.auditSegments[this.currentTopic()].length === 0) {
      if (this.tmp_topics.length != 0) {
        this.currentTopic.set(this.tmp_topics.shift()!);
        this.currentSegment.set(this.auditSegments[this.currentTopic()].shift());  
      }
      else {
        this.hasEnded.set(true);
      }
    }
    else {
      this.currentSegment.set(this.auditSegments[this.currentTopic()].shift());
    }
  }
}
