import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LokasiPage } from './lokasi';

@NgModule({
  declarations: [
    LokasiPage,
  ],
  imports: [
    IonicPageModule.forChild(LokasiPage),
  ],
})
export class LokasiPageModule {}
