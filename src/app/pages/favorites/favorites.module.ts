import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserTopPageRoutingModule } from './favorites-routing.module';
import { UserTopPage } from './favorites.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserTopPageRoutingModule],
  declarations: [UserTopPage],
})
export class UserTopPageModule {}
