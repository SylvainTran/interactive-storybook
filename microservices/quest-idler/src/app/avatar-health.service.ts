import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarHealthService {
  private health: number = 100;

  constructor() {
    this.loadHealthData();
  }

  public getHealth() {
    return this.health;
  }

  public setHealth(value: number) {
    this.health = value;
  }

  public changeHealth(value: number) {
    this.health += value;
    this.saveHealthData();
    return this.health;
  }
  
  public healthIsBelowZero() {
    return this.health <= 0;
  }

  public saveHealthData() {
    const healthData = {
      "health": this.health
    }
    window.localStorage.setItem("com.soberfoxgames.questidler.avatarHealth", JSON.stringify(healthData));
  }

  public loadHealthData() {
    let storedHealth: any = window.localStorage.getItem("com.soberfoxgames.questidler.avatarHealth");
    
    if (storedHealth !== null) {
      this.setHealth(parseInt(storedHealth.avatarHealth));
    } else {
      this.setHealth(100);
    }
  }
}
