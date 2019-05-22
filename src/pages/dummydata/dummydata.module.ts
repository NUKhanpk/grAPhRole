import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DummydataPage } from './dummydata';

@NgModule({
  declarations: [
    DummydataPage,
  ],
  imports: [
    IonicPageModule.forChild(DummydataPage),
  ],
})
export class DummydataPageModule {}
