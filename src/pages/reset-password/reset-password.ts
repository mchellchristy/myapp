import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
@IonicPage({
name: 'reset-password'
})
@Component({
selector: 'page-reset-password',
templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
public resetPasswordForm: FormGroup;
constructor(public navCtrl: NavController,
public authProvider: AuthProvider, public formBuilder: FormBuilder,
public alertCtrl: AlertController) {
this.resetPasswordForm = formBuilder.group({
email: ['', Validators.compose([Validators.required,
EmailValidator.isValid])],
});
}
resetPassword(){
  if (!this.resetPasswordForm.valid){
  console.log(this.resetPasswordForm.value);
  } else {
  this.authProvider.resetPassword(this.resetPasswordForm.value.email)
  .then((user) => {
  let alert = this.alertCtrl.create({
  message: "We just sent you a reset link to your email",
  buttons: [
  {
  text: "Ok",
  role: 'cancel',
  handler: () => { this.navCtrl.pop(); }
  }
  ]
  });
  alert.present();
  }, (error) => {
    var errorMessage: string = error.message;
    let errorAlert = this.alertCtrl.create({
    message: errorMessage,
    buttons: [{ text: "Ok", role: 'cancel' }]
    });
    errorAlert.present();
    });
    }
    }
}

// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { UserProvider } from '../../providers/user/user';
// import { LoginPage } from '../../pages/login/login';
// /**
//  * Generated class for the PasswordresetPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-reset-password',
//   templateUrl: 'reset-password.html',
// })
// export class ResetPasswordPage {
//   email: string;
//   constructor(public navCtrl: NavController, public navParams: NavParams,
//   public userservice: UserProvider, public alertCtrl: AlertController) {
//   }

//   ionViewDidLoad() {
//    // console.log('ionViewDidLoad PasswordresetPage');
//   }

//   reset() {
//     let alert = this.alertCtrl.create({
//       buttons: ['Ok']
//     });
//     this.userservice.passwordreset(this.email).then((res: any) => {
//       if (res.success) {
//         alert.setTitle('Email Sent');
//         alert.setSubTitle('Please follow the instructions in the email to reset your password');
//       }
//     }).catch((err) => {
//       alert.setTitle('Failed');
//       alert.setSubTitle(err);
//     })
//   }

//   goback() {
//     this.navCtrl.setRoot(LoginPage);
//   }

// }
