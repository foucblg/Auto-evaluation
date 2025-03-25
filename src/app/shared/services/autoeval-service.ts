import { Injectable, signal } from "@angular/core";
import { autoevalData } from "../../app.component";
import { AutoevalSegment } from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  topics = autoevalData["topics"];
  autoevalSegments = autoevalData["questions"];
  questionNumber = signal(0);
  questionNumberTopic = signal(0);
  topicNumber = signal(0);
  currentSegment = signal<AutoevalSegment | undefined>(undefined);
  currentTopic = signal("");
  possibleAnswers = autoevalData["possible_answers"];
  numberOfQuestions = Object.fromEntries(this.topics.map(topic => [topic, this.autoevalSegments[topic].length]));
  step = signal('');
  totalQuestions:number = 0


  startAutoeval() {
    this.step.set('start');
    if (this.topics.length != 0) {
      this.currentTopic.set(this.topics[this.topicNumber()]);
    }
    else {
      console.log("Aucun topic n'est défini");
    }
    this.currentSegment.set(this.autoevalSegments[this.currentTopic()][this.questionNumber()]); 
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
        this.currentSegment.set(this.autoevalSegments[this.currentTopic()][this.questionNumberTopic()]);  
        this.questionNumber.update(n => n + 1);
      }
      else {
        this.step.set('end');
      }
    }
    else {
      this.questionNumberTopic.update(n => n + 1);
      this.questionNumber.update(n => n + 1);
      this.currentSegment.set(this.autoevalSegments[this.currentTopic()][this.questionNumberTopic()]);
    }
  }

  getPreviousQuestion() {
    if (this.questionNumberTopic() > 0) {
      this.questionNumberTopic.update(n => n - 1);
      this.currentSegment.set(this.autoevalSegments[this.currentTopic()][this.questionNumberTopic()]);
      this.questionNumber.update(n => n - 1);
    } 
    else if (this.topicNumber() > 0) {
      this.topicNumber.update(n => n - 1);
      this.currentTopic.set(this.topics[this.topicNumber()]);
      this.questionNumberTopic.set(this.autoevalSegments[this.currentTopic()].length - 1);
      this.currentSegment.set(this.autoevalSegments[this.currentTopic()][this.questionNumberTopic()]);
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

