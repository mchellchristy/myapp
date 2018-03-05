import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera } from 'ionic-native';
import firebase from 'firebase';
import { Firebase } from './../../providers/firebase1/firebase1';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewChild } from '@angular/core';
import * as moment from 'moment';
import {  BerandaPage } from '../beranda/beranda';
import { ProfileProvider } from '../../providers/profile/profile';
import { UserProvider } from '../../providers/user/user';

declare var google: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  latLng: any;
  // public lat;
  // public long;  
  public userProfile: any;
  Picture;
  base64Image;

  selectedPhoto;
  loading;
  currentImage;
  imageName;
  latitude;
  longtitude;

  data: FirebaseListObservable<any[]>;
  //arrData = []
  laporan: '';
  nama: '';
  tgl = moment().format(); 
  jam = moment().format("HH:mm");
  waktu = moment().format("DD MMM YYYY, H:mm");
  lokasi:'';
  katlaporan:'';
  lat = this.lat;
  long = this.long;
  


  temparr = [];
  filteredusers = [];

  @ViewChild('map') mapElement: ElementRef; 
  map: any;
  //myDate:any  = new Date().toISOString();
  //myDate:any = new Date().toJSON().split('T')[0];
  //myDate = moment().format("MMM DD, YYYY"); 
  //myTime = moment().format("HH:mm");
  
  constructor(public profileProvider: ProfileProvider, public userservice: UserProvider, public navCtrl: NavController, private camera:Camera, public authProvider: AuthProvider, private fdb: AngularFireDatabase,  public toastCtrl: ToastController, private geolocation: Geolocation, private firebase1: Firebase) {
    this.data = this.firebase1.getDataItems();
    //this.data = this.firebase1.getDate();
    this.myPhotosRef = firebase.storage().ref('/Photos/')
    //this.latLng = new google.maps.LatLng(1.48218, 124.84892);
    //this.fdb.list("/myItems/").subscribe(_data => {
      //this.arrData = _data;
      //console.log(this.arrData);
    //});

    //this.fdb.list("/LokasiTerkini/").valueChanges().subscribe(_data => {
     // this.arrData = _data;
      //console.log(this.arrData);
    //});
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
   })
  }

ionViewDidLoad() {
}

ionViewDidEnter() {
  this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
    this.userProfile = userProfileSnapshot.val();
  });
}
  
// createPost(Picture:string){
// this.firebase1.createPost(this.Picture);
// }

addItems() {
    this.firebase1.getDataItems();
  }

addItem( laporan, nama, tgl, jam, waktu, lokasi, lat, long, katlaporan) {
    
    this.imageName = nama;
    this.latitude= lat;
    this.longtitude= long;
    this.upload()
    this.data.push({
    laporan: laporan,
    nama: nama,
    tgl: tgl,
    jam:jam,
    waktu: waktu,
    image :this.imageName,
    lokasi: lokasi,
    katlaporan: katlaporan,
    latitude: this.latitude,
    longtiude: this. longtitude,
    lat: lat,
    long: long, 

    })
    .then( newItem => {
      //this.navCtrl.push(BerandaPage);
    }, error => {
      console.log(error);
    });
  }

  upload(){
    if(this.selectedPhoto){
      var uploadTask =  firebase.storage().ref().child('images/'+this.imageName+'.jpg').put(this.selectedPhoto);
      uploadTask.then(this.onError);
    }
  }
  
  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }
  
  beranda() {
    this.navCtrl.push(BerandaPage);
   }
  
 
  //  logout() {
  //   firebase.auth().signOut().then(() => {
  //     this.navCtrl.parent.parent.setRoot('LoginPage');
  //   })
  // }

  takePhoto() {
    Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
      //this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.myPhoto = imageData;
      //this.uploadPhoto();
      this.currentImage = 'data:image/jpeg;base64,'+imageData;
      this.Picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
 
  selectPhoto(): void {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
    }).then(imageData => {
      this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
      //this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.myPhoto = imageData;
      //this.uploadPhoto();
      this.currentImage = 'data:image/jpeg;base64,'+imageData;
      this.Picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  
  dataURLtoBlob(dataURL){
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (let index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
    }
        

  loadMap(){
 
 
      let mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

  getLocation(){
 
          this.geolocation.getCurrentPosition().then((position) => {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
          let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          }
 
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
          let marker = new google.maps.Marker({
            map: this.map,
             animation: google.maps.Animation.DROP,
        position: latLng
        }); 
 
       let content = "<h4>Anda berada disini</h4>";
 
       this.addInfoWindow(marker, content);
 
 
 
     }).catch((error) => {
    console.log('Error getting location', error);
    });
  }
 
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  

  btnAddClicked(){
    
    //this.fdb.list("/myItems/").push({
     //laporan: this.laporan
    //});
    
    //this.fdb.list("/WaktuKejadian/").push({
      //tgl: this.myDate,
      //jam: this.myTime
    //});
    //this.fdb.list("/myItems/").push({
    //firebase.database().ref("LokasiSaatIni").update({
     //lat: this.lat,
     //long: this.long
    //}).then(res =>{
        this.showToast('Laporan Tersimpan');
    //})
}

   addInfoWindow(marker, content){
 
   let infoWindow = new google.maps.InfoWindow({
    content: content
    });
 
  google.maps.event.addListener(marker, 'click', () => {
   infoWindow.open(this.map, marker);
  });


}
}
