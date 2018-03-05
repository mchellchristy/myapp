import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }

  signOut() {
    this.auth.auth.signOut();
}

// logout() {
//   firebase.auth().signOut().then(() => {
//     this.navCtrl.parent.parent.setRoot('LoginPage');
//   })
// }

macet() {
 this.navCtrl.push(HomePage);
}

cuaca() {
 this.navCtrl.push(HomePage);
}

bencana() {
 this.navCtrl.push(HomePage);
}

kecelakaan() {
 this.navCtrl.push(HomePage);
}

penutupan() {
 this.navCtrl.push(HomePage);
}
}
