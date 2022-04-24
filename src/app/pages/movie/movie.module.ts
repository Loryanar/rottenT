import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfileMoviePageRoutingModule } from './movie-routing.module';
import { ProfileMoviePage } from './movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMoviePageRoutingModule,
  ],
  declarations: [ProfileMoviePage],
})
export class ProfileMoviePageModule {}
