import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
import { Home1Page } from '../home1/home1';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { Firebase } from '../../providers/firebase1/firebase1';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserProvider } from '../../providers/user/user';
import { LokasiPage } from '../lokasi/lokasi';

@Component({
  selector: 'page-beranda',
  templateUrl: 'beranda.html',
})
export class BerandaPage {
  data: FirebaseListObservable<any[]>;
  pengguna: FirebaseListObservable<any[]>;
  public userProfile: any;
  public photoList = [];
  itemsRef: FirebaseListObservable<any>;
  employees: Observable<any[]>;
  updateName;

  imageSource  ;
  employeePhoto;


  constructor(
    public navCtrl: NavController, public userservice: UserProvider, 
    public profileProvider: ProfileProvider, 
    public authProvider: AuthProvider, public af: AngularFireDatabase, private firebase1: Firebase) {
      this.data = this.firebase1.getDataItems();
      this.pengguna = this.firebase1.getPenggunaItems();
      this.itemsRef =  af.list('/myItems')
      this.employees = this.firebase1.getDataItems(); 
      // this.updateName = this.profileProvider.getUserProfile();
      // this.userservice.getallusers().then((res: any) => {
      //   this.filteredusers = res;
      //   this.temparr = res;
     //})

      console.log(this.employees);

}

      getPhotoURL(image){
      firebase.storage().ref().child('images/'+ image+'.jpg').getDownloadURL().then((url)=>{
      this.employeePhoto = url;

 })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerandaPage');
  }


  ionViewDidEnter() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
  }
    
//     const userId = firebase.auth().currentUser.uid;
//     return firebase.database().ref('userProfile')
//                             .once('value')        
//                             .then(snapshot => snapshot.val())    
//                             .then(users => console.log(users));
// }
  

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  logout() {
  firebase.auth().signOut().then(() => {
  this.navCtrl.setRoot(LoginPage);
  })
  }

  lapor() {
  this.navCtrl.push(Home1Page);
  }

  lokasi() {
    this.navCtrl.push(LokasiPage);
  }

}
