import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the DummydataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dummydata',
  templateUrl: 'dummydata.html',
})
export class DummydataPage {
  formdummydata:FormGroup;
  dummydata:any[]
  categoriesarray: any[][];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder:FormBuilder, private sqlite:SQLite, private toast:Toast) {
    this.formdummydata=this.formbuilder.group({
      formcategories:['']
    });
  }
  dummycategories(){
    this.categoriesarray=[
      ['Income','50000','80000'],
      ['Savings','50000','80000'],
      ['Emergency Fund','50000','80000'],
      ['Housing','50000','80000'],
      ['Utilities','50000','80000'],
      ['Health Care','50000','80000'],
      ['Household Items','50000','80000'],
      ['Food and Groceries','50000','80000'],
      ['Gifts','50000','80000'],
      ['Personal Care','50000','80000'],
      ['Clothing','50000','80000'],
      ['Transportation','50000','80000'],
      ['Debt Reduction','50000','80000'],
      ['Education','50000','80000'],
      ['Insurance','50000','80000']
     ]
     console.log(this.categoriesarray[0][0],this.categoriesarray[0][1],this.categoriesarray[0][2]);
    this.sqlite.create({
      name:'ionicdb.db',
      location:'default',
    })
    .then ((db:SQLiteObject) => {
      db.executeSql('DROP TABLE category')
      console.log('Creating category table');
      db.executeSql('CREATE TABLE IF NOT EXISTS category(rowid INTEGER PRIMARY KEY, name TEXT,CategoryMin TEXT,CategoryMax TEXT)', [])
      console.log('Created category table');
      console.log('Updating Category table');
      for(var intCategory=0;intCategory<this.categoriesarray.length;intCategory++){
        db.executeSql('INSERT INTO category VALUES(NULL,?,?,?)',[this.categoriesarray[intCategory][0],this.categoriesarray[intCategory][1],this.categoriesarray[intCategory][2]])
      }
      console.log('Category Table Updated Successfully............');
    })
  .catch(e => {
    console.log(e);
    this.toast.show(e, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    )}
    )}
    dummysubcategories(){
      this.categoriesarray=[
        ['Income','50000','80000'],
        ['Savings','50000','80000'],
        ['Emergency Fund','50000','80000'],
        ['Housing','50000','80000'],
        ['Utilities','50000','80000'],
        ['Health Care','50000','80000'],
        ['Household Items','50000','80000'],
        ['Food and Groceries','50000','80000'],
        ['Gifts','50000','80000'],
        ['Personal Care','50000','80000'],
        ['Clothing','50000','80000'],
        ['Transportation','50000','80000'],
        ['Debt Reduction','50000','80000'],
        ['Education','50000','80000'],
        ['Insurance','50000','80000']
       ]
      this.sqlite.create({
        name:'ionicdb.db',
        location:'default'
      })
      .then ((db:SQLiteObject) => {
        db.executeSql('DROP TABLE category')
        console.log('Creating category table');
        db.executeSql('CREATE TABLE IF NOT EXISTS category(rowid INTEGER PRIMARY KEY, name TEXT,CategoryMin TEXT,CategoryMax TEXT)', [])
        console.log('Created category table');
        console.log('Updating Category table');
        for(var intCategory=0;intCategory<this.categoriesarray.length;intCategory++){
          db.executeSql('INSERT INTO category VALUES(NULL,?,?,?)',[this.categoriesarray[intCategory][0],this.categoriesarray[intCategory][1],this.categoriesarray[intCategory][2]])
        }
        console.log('Category Table Updated Successfully............');
      })
    .catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )}
      )}
getsubcategory(){

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DummydataPage');
  }

}
