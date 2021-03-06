import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
/**
 * Generated class for the EditcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcategory',
  templateUrl: 'editcategory.html',
})
export class EditcategoryPage {
  data = { rowid:0, name:"", CategoryMin:"",CategoryMax:""};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,private alertCtrl:AlertController) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM category WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.name = res.rows.item(0).name;
            this.data.CategoryMin = res.rows.item(0).CategoryMin
            this.data.CategoryMax = res.rows.item(0).CategoryMax
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    let alert = this.alertCtrl.create({
      title: 'Amount Exceed',
      subTitle:'Amount Limit Exceed From The Define Max Amount For THis Category',
      buttons: ['Dismiss']
    });
    
  
        if(parseInt(this.data.CategoryMin) > parseInt(this.data.CategoryMax)){
          alert.present();
        }
        else{
          this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('UPDATE category SET CategoryMin = ?,CategoryMax = ?, name=? WHERE rowid=?',[this.data.CategoryMin,this.data.CategoryMax, this.data.name,this.data.rowid])
              .then(res => {
                console.log(res);
                this.toast.show('Data updated', '5000', 'center').subscribe(
                  toast => {
                    this.navCtrl.push(HomePage);
                  }
                );
              })
              .catch(e => {
                console.log(e);
                this.toast.show(e, '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              });
          }).catch(e => {
            console.log(e);
            this.toast.show(e, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
        }

  }

}