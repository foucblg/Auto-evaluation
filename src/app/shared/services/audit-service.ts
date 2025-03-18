import { Injectable, signal } from "@angular/core";
import { auditData } from "../../app.component";
import { AuditSegment } from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  topics = auditData["topics"];
  auditSegments = auditData["questions"];
  questionNumber = signal(0);
  questionNumberTopic = signal(0);
  topicNumber = signal(0);
  currentSegment = signal<AuditSegment | undefined>(undefined);
  currentTopic = signal("");
  possibleAnswers = auditData["possible_answers"];
  numberOfQuestions = Object.fromEntries(this.topics.map(topic => [topic, this.auditSegments[topic].length]));
  step = signal('');
  totalQuestions:number = 0


  startAudit() {
    this.step.set('start');
    if (this.topics.length != 0) {
      this.currentTopic.set(this.topics[this.topicNumber()]);
    }
    else {
      console.log("Aucun topic n'est défini");
    }
    this.currentSegment.set(this.auditSegments[this.currentTopic()][this.questionNumber()]); 
  }

  getNewQuestion() {
    this.step.set('ongoing');
    if (this.questionNumberTopic() === this.numberOfQuestions[this.currentTopic()]-1) { 
      // Si on est à la dernière question du thème
      if (this.currentTopic() != this.topics[this.topics.length-1]) {
        // Si on est pas au dernier thème
        this.questionNumberTopic.set(0);
        this.topicNumber.update(n => n + 1);
        this.currentTopic.set(this.topics[this.topicNumber()]);
        this.currentSegment.set(this.auditSegments[this.currentTopic()][this.questionNumberTopic()]);  
        this.questionNumber.update(n => n + 1);
      }
      else {
        this.step.set('end');
      }
    }
    else {
      this.questionNumberTopic.update(n => n + 1);
      this.questionNumber.update(n => n + 1);
      this.currentSegment.set(this.auditSegments[this.currentTopic()][this.questionNumberTopic()]);
    }
  }

  getPreviousQuestion() {
    if (this.questionNumberTopic() > 0) {
      this.questionNumberTopic.update(n => n - 1);
      this.currentSegment.set(this.auditSegments[this.currentTopic()][this.questionNumberTopic()]);
      this.questionNumber.update(n => n - 1);
    } 
    else if (this.topicNumber() > 0) {
      this.topicNumber.update(n => n - 1);
      this.currentTopic.set(this.topics[this.topicNumber()]);
      this.questionNumberTopic.set(this.auditSegments[this.currentTopic()].length - 1);
      this.currentSegment.set(this.auditSegments[this.currentTopic()][this.questionNumberTopic()]);
      this.questionNumber.update(n => n - 1);
    }
    else{
      this.step.set('start');
    }
  }

  getTotalQuestions(){
    for (let i =0; i<this.topics.length; i++){
      this.totalQuestions = this.totalQuestions + this.numberOfQuestions[this.topics[i]]
    }
    return this.totalQuestions
  };
}

