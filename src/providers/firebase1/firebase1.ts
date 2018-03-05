import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import 'firebase/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewChild, ElementRef } from '@angular/core';
import { ToastController } from 'ionic-angular';
declare var google: any;

@Injectable()
export class Firebase {
public currentUser:firebase.User;
//myUserId = firebase.auth().currentUser.uid;
public userProfileRef:any;
public myItems:firebase.database.Reference;
public myPhotosRef:firebase.database.Reference;
public myPhoto: any;
public myPhotoURL: any;
employeePhoto;
public lat;
public long; 

@ViewChild('map') mapElement: ElementRef; 
map: any;

  constructor(public toastCtrl: ToastController, private geolocation: Geolocation, public afd: AngularFireDatabase, public http: Http,  private auth: AngularFireAuth) {
    //this.DbRef = firebase.database().ref('/Photos/')
    this.myPhotosRef = firebase.database().ref('photos')
    firebase.auth().onAuthStateChanged( user => {
      if (user != null ){
        //this.myUserId = user
        //this.myUserId = user.uid;
        //this.userProfileRef = firebase.database().ref('/userProfile');
      }     
    });  
  }

getPenggunaItems() {
  return this.afd.list('/userProfile');
}

addPengItem(firstName, lastName) {
  this.afd.list('userProfile').push('');
}

getDataItems() {
  return this.afd.list('/myItems/');
}

addItem(laporan, nama, tgl, jam, waktu) {
this.afd.list('/myItems/').push('');
}

getPhotoList(): firebase.database.Reference {
  return this.myPhotosRef;
}


createPost(picture: string)  {
  firebase.storage().ref().child('images/'+ picture+'.jpg').getDownloadURL().then((url)=>{
    this.employeePhoto = url;
 
  // firebase.storage().ref('/Photos/').child(this.generateUUID()).child('myPhoto.JPEG')
  //   .putString(picture, 'base64', { contentType: 'image/JPEG' })
  //   .then((savedPicture) => {
  //     this.myPhotosRef.push({
  //     picture: savedPicture.downloadURL,
        })
    }

private generateUUID(): any {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

}