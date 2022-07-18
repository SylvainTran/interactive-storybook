import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PartyDungeonViewComponent } from './party-dungeon-view/party-dungeon-view.component';
import { SinglePlayerViewComponent } from './single-player-view/single-player-view.component';

const routes: Routes = [
  {
    path: '',   
    redirectTo: '/singleplayerview',
    pathMatch: 'full'
  },
  {
    path: 'singleplayerview',
    component: SinglePlayerViewComponent
  },
  {
    path: 'partydungeonview',
    component: PartyDungeonViewComponent
    // outlet: 'partydungeonviewpopup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
