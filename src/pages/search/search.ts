import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
searchForm:FormGroup
searchs:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb:FormBuilder,private sqlite: SQLite,private toast:Toast) {
this.searchForm=this.fb.group({
  search:[''],
  searchdate:[''],
  searchdatemin:[''],
  searchdatemax:[''],
  searchtype:[''],
  searchamount:[''],
  searchitemtype:['']
});
}
search(){
  let data=this.searchForm.value
  let cred ={
   search:data.search
  }
  this.sqlite.create({
    name:'ionicdb.db',
    location:'default'
  }).then((db:SQLiteObject)=>{
    db.executeSql('SELECT * FROM tanscations WHERE type like ?', [cred.search])
  .then(res => {
    this. searchs= [];
    for(var i=0; i<res.rows.length; i++) {
      this.searchs.push({rowid:res.rows.item(i).rowid,Date:res.rows.item(i).Date,ItemType:res.rows.item(i).ItemType,type:res.rows.item(i).type,Amount:res.rows.item(i).Amount})
    }
    this.searchForm.reset()
  })
})
.catch(e => {
  console.log(e);
  this.toast.show(e, '5000', 'center').subscribe(
    toast => {
      console.log(toast);
    }
  )}
  )}
  searchdate(){
    let data=this.searchForm.value
    let cred ={
     search:data.searchdate
    }
    this.sqlite.create({
      name:'ionicdb.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('SELECT * FROM tanscations WHERE date like ?', [cred.search])
    .then(res => {
      this. searchs= [];
      for(var i=0; i<res.rows.length; i++) {
        this.searchs.push({rowid:res.rows.item(i).rowid,Date:res.rows.item(i).Date,ItemType:res.rows.item(i).ItemType,type:res.rows.item(i).type,Amount:res.rows.item(i).Amount})
      }
      this.searchForm.reset()
    })
  })
  .catch(e => {
    console.log(e);
    this.toast.show(e, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    )}
    )}
    searchdaterange(){
      let data=this.searchForm.value
      let cred ={
       search:data.searchdatemin,
       search2:data.searchdatemax
      }
      this.sqlite.create({
        name:'ionicdb.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('SELECT * FROM transactions WHERE date BETWEEN (?) AND (?)', [cred.search,cred.search2])
      .then(res => {
        this. searchs= [];
        for(var i=0; i<res.rows.length; i++) {
          this.searchs.push({rowid:res.rows.item(i).rowid,Date:res.rows.item(i).Date,ItemType:res.rows.item(i).ItemType,type:res.rows.item(i).type,Amount:res.rows.item(i).Amount})
        }
        this.searchForm.reset()
      })
    })
    .catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )}
      )}
}
