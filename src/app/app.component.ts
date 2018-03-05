import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home1Page } from '../pages/home1/home1';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
import { BerandaPage } from '../pages/beranda/beranda';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyCgX2uTWo6zLb_v0rjjwL13E1LiLqopYLk",
      authDomain: "images-firebase-cf815.firebaseapp.com",
      databaseURL: "https://images-firebase-cf815.firebaseio.com",
      projectId: "images-firebase-cf815",
      storageBucket: "images-firebase-cf815.appspot.com",
      messagingSenderId: "714163714676"
  });

  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      this.rootPage = LoginPage;
      unsubscribe();
    } else {
      this.rootPage = BerandaPage;
      unsubscribe();
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

