import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ProfileProvider {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;
  selectedPhoto;
  loading;
  currentImage;
  imageName;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
    if (user){
    this.currentUser = user;
    this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
    // .child(user.uid);
    }
    });
    }

    getUsersData() {
      const userId = firebase.auth().currentUser.uid;
      return firebase.database().ref('userProfile')
                              .once('value')        
                              .then(snapshot => snapshot.val())    
                              .then(users => console.log(users));
  }

    getUserProfile(): firebase.database.Reference {
      return this.userProfile;
      }

    updateName(firstName: string, lastName: string, displayName): firebase.Promise<void> {
      this.imageName = firstName;
      this.upload()
      return this.userProfile.update({
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      foto: this.imageName,
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

    

    updateDOB(birthDate: string): firebase.Promise<any> {
      return this.userProfile.update({
      birthDate: birthDate,
      });
      }
    
      updateEmail(newEmail: string, password: string): firebase.Promise<any> {
        const credential = firebase.auth.EmailAuthProvider
        .credential(this.currentUser.email, password);
        return this.currentUser.reauthenticateWithCredential(credential)
        .then( user => {
        this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.update({ email: newEmail });
        });
        });
        }

        updatePassword(newPassword: string, oldPassword:string): firebase.Promise<any>{
          const credential = firebase.auth.EmailAuthProvider
          .credential(this.currentUser.email, oldPassword);
          return this.currentUser.reauthenticateWithCredential(credential)
          .then( user => {
          this.currentUser.updatePassword(newPassword).then( user => {
          console.log("Password Changed");
          }, error => {
          console.log(error);
          });
          });
          }
}
  
