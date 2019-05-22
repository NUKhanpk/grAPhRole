import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { SearchPage } from '../search/search';
import { AddCategoryPage } from '../add-category/add-category';
import { AdditemsPage } from '../additems/additems';
import { TransactionPage } from '../transaction/transaction';
import { ReportGraphPage } from '../report-graph/report-graph';
import { DummydataPage } from '../dummydata/dummydata';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
category(){
  this.navCtrl.push(AddCategoryPage)
}
items(){
  this.navCtrl.push(AdditemsPage)
}
search(){
  this.navCtrl.push(SearchPage)
}
report(){
  this.navCtrl.push(ReportPage)
}
transcations(){
  this.navCtrl.push(TransactionPage)
}

reportGraph(){
  this.navCtrl.push(ReportGraphPage)
}
dummydata(){
  this.navCtrl.push(DummydataPage)
}

}
