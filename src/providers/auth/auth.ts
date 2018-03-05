import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase'; 
// import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {

  public fireAuth:firebase.auth.Auth;
  public userProfileRef:firebase.database.Reference;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfileRef = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string):firebase.Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

    signupUser(email: string, password: string): firebase.Promise<void> {
      return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then( newUser => {
      this.userProfileRef.child(newUser.uid).set({
      email: email
      });
    });
  }

  resetPassword(email: string): firebase.Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(email);
    }


    logoutUser(): firebase.Promise<void> {
      const userId: string = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref(`/userProfile/${userId}`)
        .off();
      return firebase.auth().signOut();
    }

  // logoutUser(): firebase.Promise<void> {
  //   this.userProfileRef.child(this.fireAuth.currentUser.uid).off();
  //   return this.fireAuth.signOut();
  //   }
}
