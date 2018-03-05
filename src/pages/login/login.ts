import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { BerandaPage } from '../beranda/beranda';
import { SignupPage } from '../signup/signup';
@IonicPage({
  name: 'login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authProvider: AuthProvider, public formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
        });
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
    this.authProvider.loginUser(this.loginForm.value.email,
    this.loginForm.value.password)
    .then( AuthProvider => {
    this.loading.dismiss().then( () => {
    this.navCtrl.setRoot(BerandaPage);
    });
    }, error => {
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
    signup() {
    this.navCtrl.push(SignupPage);
  }
    goToSignup(): void { this.navCtrl.push('signup'); }
    goToResetPassword(): void { this.navCtrl.push('reset-password'); }
}

// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { usercreds } from '../../models/interfaces/usercreds';

// import { AuthProvider } from '../../providers/auth/auth';
// import { BerandaPage } from '../beranda/beranda';
// import { SignupPage } from '../signup/signup';
// import { ResetPasswordPage } from '../reset-password/reset-password';
// /**
//  * Generated class for the LoginPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {
//   credentials = {} as usercreds;
//   constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }

//   signin() {
//     this.authservice.login(this.credentials).then((res: any) => {
//       if (!res.code)
//         this.navCtrl.setRoot(BerandaPage);
//       else
//         alert(res);
//     })
//   }

//   signup() {
//     this.navCtrl.push(SignupPage);
//   }

//   passwordreset() {
//     this.navCtrl.push(ResetPasswordPage);
//   }

// }
