import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PartyRequestCommand } from './friend-caller.service';

export interface Quest {
  name: string,
  id: number,
  experienceGain: number,
  goldGain: number,
  prerequisites: string[],
  questLevel: number,
  zone: string
}

export enum QuestStates {
  START,
  FAIL,
  SUCCESS
}

export class PartyQuestData {

  private registrants: string[] = [];
  private status: QuestStates;

  constructor(r1: string, r2: string, private questData: Quest[]) {
    this.registrants[0] = r1;
    this.registrants[1] = r2;
    this.status = QuestStates.START;
  }

  public getRegistrants(): string[] {
    return this.registrants;
  }

  public log(): string {
    return this.registrants[0] + " and " + this.registrants[1];
  }

  public getActiveQuestName(questIteratorIndex: number): string {
    return this.questData[questIteratorIndex].name;
  }

  public getQuestData(questIteratorIndex: number) {
    return this.questData[questIteratorIndex];
  }

  public get QuestStatus() {
    return this.status;
  }

  public set SetQuestStatus(value: QuestStates) {
    this.status = value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class QuestPartyService {

  partyQuestDataSource = new Subject<PartyQuestData>();
  partyQuestDataSource$: Observable<PartyQuestData> = this.partyQuestDataSource.asObservable();
  
  private actions: PartyRequestCommand[] = [];
  private partyQuestData: PartyQuestData;

  constructor(private http: HttpClient) {
    this.partyQuestData = new PartyQuestData("Default", "Default 2", []);
  }

  public getPartyQuestData() {
    return this.partyQuestData;
  }

  public addJob(a: PartyRequestCommand) {
    this.actions.push(a);
  }

  public getActions() {
    return this.actions;
  }

  public setupQuestParty(a: PartyRequestCommand) {
    let mQuest: any[] = [];

    const obs = {
      next: (questData: any) => {
        if (questData !== null) {
          mQuest = questData;
          console.log(mQuest);
          const conv = a.getConversationSession();
          this.partyQuestData = new PartyQuestData(conv.conversationRequesterName, conv.conversationTargetName, mQuest);
          this.partyQuestDataSource.next(this.partyQuestData);      
        }
      }
    };
    this.fetchNewQuestData().subscribe(obs);
  }
  
  public fetchNewQuestData() {
    console.log("Fetching new quest data from backend.");
    return this.http.get<any>("http://127.0.0.1:8080/newquest");
  }
}
