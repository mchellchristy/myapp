import { Component } from '@angular/core';
import { IonicPage,
NavController,
Loading,
LoadingController,
AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import {  BerandaPage } from '../beranda/beranda';

@IonicPage({
name: 'signup'
})
@Component({
selector: 'page-signup',
templateUrl: 'signup.html',
})
export class SignupPage {
public signupForm:FormGroup;
public loading:Loading;
constructor(public navCtrl: NavController,public authProvider: AuthProvider, public formBuilder: FormBuilder,
  public loadingCtrl: LoadingController, public alertCtrl:
  AlertController){
  this.signupForm = formBuilder.group({
  email: ['', Validators.compose([Validators.required,
  EmailValidator.isValid])],
  password: ['', Validators.compose([Validators.minLength(6),
  Validators.required])]
  });
  }
  signupUser(){
    if (!this.signupForm.valid){
    console.log(this.signupForm.value);
    } else {
    this.authProvider.signupUser(this.signupForm.value.email,
    this.signupForm.value.password)
    .then(() => {
    this.loading.dismiss().then( () => {
    this.navCtrl.setRoot(BerandaPage);
    });
    }, (error) => {
    this.loading.dismiss().then( () => {
    let alert = this.alertCtrl.create({
    message: error.message,
    buttons: [
    {
    text: "Ok",
    role: 'cancel'
    }
    ]
    });
    alert.present();
    });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    }
    }
  }

// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// import { UserProvider } from '../../providers/user/user';
// import { LoginPage } from '../../pages/login/login';
// /**
//  * Generated class for the SignupPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-signup',
//   templateUrl: 'signup.html',
// })
// export class SignupPage {
//   newuser = {
//     email: '',
//     password: '',
//     displayName: ''
//   }
//   constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
//               public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
//   }

//   signup() {
//     var toaster = this.toastCtrl.create({
//       duration: 3000,
//       position: 'bottom'
//     });
//     if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
//       toaster.setMessage('All fields are required dude');
//       toaster.present();
//     }
//     else if (this.newuser.password.length < 7) {
//       toaster.setMessage('Password is not strong. Try giving more than six characters');
//       toaster.present();
//     }
//     else {
//       let loader = this.loadingCtrl.create({
//         content: 'Please wait'
//       });
//       loader.present();
//       this.userservice.adduser(this.newuser).then((res: any) => {
//         loader.dismiss();
//         if (res.success)
//           this.navCtrl.push('ProfilepicPage');
//         else
//           alert('Error' + res);
//       })
//     }
//   }  

//   goback() {
//     this.navCtrl.setRoot(LoginPage);
//   }

// }
