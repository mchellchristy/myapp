import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { Firebase } from '../../providers/firebase1/firebase1';
import { Camera, CameraOptions } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage({
name: 'profile'
})
@Component({
selector: 'page-profile',
templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  employess: FirebaseListObservable<any>;
  selectedPhoto;
  loading;
  currentImage;
  imageName;
  
  // pengguna : FirebaseListObservable<any[]>;
  // firstName :'';
  // lastName :'';
  
constructor(private firebase1: Firebase, public navCtrl: NavController,
public alertCtrl: AlertController, public profileProvider: ProfileProvider,
public authProvider: AuthProvider, public af : AngularFireDatabase, public camera : Camera, public loadingCtrl:LoadingController ){
  this.employess = af.list('/myItems');
  // this.pengguna = this.firebase1.getPenggunaItems();
}


ionViewDidEnter() {
  this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
  this.userProfile = userProfileSnapshot.val();
  this.birthDate = userProfileSnapshot.val().birthDate;
  });
  }

  addPengItems() {
    this.firebase1.getPenggunaItems();
  }

//   addPengItem(uid, firstName, lastName) {
//     this.pengguna.push({
//     uid: uid,
//     firstName: firstName,
//     lastName: lastName
//     })
// .then( newItem => {
//   //this.navCtrl.push(BerandaPage);
// }, error => {
//   console.log(error);
// });
// }

fotoProfil(){
  
  const options : CameraOptions = {
  
    quality:100,
    targetHeight:200,
    targetWidth:200,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: Camera.EncodingType.JPEG,
    mediaType:Camera.MediaType.PICTURE
  }
  
  Camera.getPicture(options).then((ImageData)=>{
    this.loading = this.loadingCtrl.create({
      content: 'Taking photo :) '
    });
  
    this.loading.present();
    this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
    this.loading.dismiss();
    this.currentImage = 'data:image/jpeg;base64,'+ImageData;
  
  },(err)=>{
    console.log(err);
  }) ;
  
  
  }
  
  
  dataURLtoBlob(dataURL){
  let binary = atob(dataURL.split(',')[1]);
  let array = [];
  for (let index = 0; index < binary.length; index++) {
    array.push(binary.charCodeAt(index));
  
  }
  return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
  }
  
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
    this.navCtrl.setRoot('login');
    });
    }
    
  updateName(){
      const alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
      {
      name: 'firstName',
      placeholder: 'Your first name',
      value: this.userProfile.firstName
      },
      {
      name: 'lastName',
      placeholder: 'Your last name',
      value: this.userProfile.lastName
      },
      {
        name: 'displayName',
        placeholder: 'Your display name',
        value: this.userProfile.displayName
        },
      ],
      buttons: [
      {
      text: 'Cancel',
      },
      {
      text: 'Save',
      handler: data => {
      this.profileProvider.updateName(data.firstName, data.lastName, data.displayName);
      }
      }
    ]
  });
  alert.present();
  }

  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
    }

    updateEmail(){
      const alert = this.alertCtrl.create({
      inputs: [
      {
      name: 'newEmail',
      placeholder: 'Your new email',
      },
      {
      name: 'password',
      placeholder: 'Your password',
      type: 'password'
      },
      ],
      buttons: [
      {
      text: 'Cancel',
      },
      {
      text: 'Save',
      handler: data => {
      const newEmail = data.newEmail;
      this.profileProvider.updateEmail(data.newEmail, data.password)
      .then( () =>{
      this.userProfile.email = newEmail;
      }).catch(error => {
      console.log('ERROR: '+error.message);
      });
      }
      }
      ]
      });
      alert.present();
    }
    updatePassword(){
    const alert = this.alertCtrl.create({
    inputs: [
    {
    name: 'newPassword',
    placeholder: 'Your new password',
    type: 'password'
    },
    {
    name: 'oldPassword',
    placeholder: 'Your old password',
    type: 'password'
    },
    ],
    buttons: [
    {
    text: 'Cancel',
    },
    {
    text: 'Save',
    handler: data => {
    this.profileProvider.updatePassword(data.newPassword,
    data.oldPassword);
    }
    }
    ]
    });
    alert.present();
    }
}


// import { Component, NgZone } from '@angular/core';
// import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
// import { UserProvider } from '../../providers/user/user';
// import firebase from 'firebase';
// import { LoginPage } from '../login/login';
// /**
//  * Generated class for the ProfilePage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-profile',
//   templateUrl: 'profile.html',
// })
// export class ProfilePage {
//   avatar: string;
//   displayName: string;
//   constructor(public navCtrl: NavController, public navParams: NavParams,
//     public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
//     public imghandler: ImghandlerProvider) {
//   }

//   ionViewWillEnter() {
//     this.loaduserdetails();
//   }

//   loaduserdetails() {
//     this.userservice.getuserdetails().then((res: any) => {
//       this.displayName = res.displayName;
//       this.zone.run(() => {
//         this.avatar = res.photoURL;
//       })
//     })
//   }

//   editimage() {
//     let statusalert = this.alertCtrl.create({
//       buttons: ['okay']
//     });
//     this.imghandler.uploadimage().then((url: any) => {
//       this.userservice.updateimage(url).then((res: any) => {
//         if (res.success) {
//           statusalert.setTitle('Updated');
//           statusalert.setSubTitle('Your profile pic has been changed successfully!!');
//           statusalert.present();
//           this.zone.run(() => {
//           this.avatar = url;
//         })  
//         }  
//       }).catch((err) => {
//           statusalert.setTitle('Failed');
//           statusalert.setSubTitle('Your profile pic was not changed');
//           statusalert.present();
//       })
//       })
//   }

//   editname() {
//     let statusalert = this.alertCtrl.create({
//       buttons: ['okay']
//     });
//     let alert = this.alertCtrl.create({
//       title: 'Edit Nickname',
//       inputs: [{
//         name: 'nickname',
//         placeholder: 'Nickname'
//       }],
//       buttons: [{
//         text: 'Cancel',
//         role: 'cancel',
//         handler: data => {

//         }
//       },
//       {
//         text: 'Edit',
//         handler: data => {
//           if (data.nickname) {
//             this.userservice.updatedisplayname(data.nickname).then((res: any) => {
//               if (res.success) {
//                 statusalert.setTitle('Updated');
//                 statusalert.setSubTitle('Your nickname has been changed successfully!!');
//                 statusalert.present();
//                 this.zone.run(() => {
//                   this.displayName = data.nickname;
//                 })
//               }

//               else {
//                 statusalert.setTitle('Failed');
//                 statusalert.setSubTitle('Your nickname was not changed');
//                 statusalert.present();
//               }
                             
//             })
//           }
//         }
        
//       }]
//     });
//     alert.present();
//   }

//   logout() {
//     firebase.auth().signOut().then(() => {
//       this.navCtrl.setRoot(LoginPage);
//     })
//   }


// }
