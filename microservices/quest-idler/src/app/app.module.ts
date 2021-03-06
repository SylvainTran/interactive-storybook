import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FriendListService } from './services/friend-list.service';
import { MockFriendList } from './services/mockfriendlist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarDisplayComponent } from './avatar-display/avatar-display.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { AvatarDetailComponent } from './avatar-detail/avatar-detail.component';
import { AvatarControllerService } from './services/avatar-controller.service';
import { AvatarStatsComponent } from './avatar-stats/avatar-stats.component';
import { CollectablesComponent } from './collectables/collectables.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { AvatarExperienceService } from './services/avatar-experience.service';
import { AvatarStatisticsService } from './services/avatar-statistics.service';
import { PartyDungeonViewComponent } from './party-dungeon-view/party-dungeon-view.component';
import { SinglePlayerViewComponent } from './single-player-view/single-player-view.component';
import { AvatarPartyDisplayComponent } from './avatar-party-display/avatar-party-display.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { CharacterDatabaseService } from './services/character-database.service';
import { FriendCallerService } from './services/friend-caller.service';

// Move into naming service
export const AVATAR_NAME = new InjectionToken<string>('AVATAR_NAME', {     
  providedIn: 'root',
  factory: () => 'Myella'
});

@NgModule({
  declarations: [
    AppComponent,
    AvatarDisplayComponent,
    FriendDetailComponent,
    AvatarDetailComponent,
    AvatarStatsComponent,
    CollectablesComponent,
    FriendListComponent,
    PartyDungeonViewComponent,
    SinglePlayerViewComponent,
    AvatarPartyDisplayComponent,
    ChatDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: AVATAR_NAME, useValue: 'Myella' },
              { provide: FriendListService, useClass: FriendListService }, 
              { provide: MockFriendList, useClass: MockFriendList },
              { provide: AvatarControllerService, useClass: AvatarControllerService },
              { provide: AvatarStatisticsService, useClass: AvatarStatisticsService },
              { provide: AvatarExperienceService, useClass: AvatarExperienceService },
              { provide: CharacterDatabaseService, useClass: CharacterDatabaseService },
              { provide: FriendCallerService, useClass: FriendCallerService }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
