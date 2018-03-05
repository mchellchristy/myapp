import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from 'ionic-native';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Home1Page } from '../pages/home1/home1';
import { BerandaPage } from '../pages/beranda/beranda';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from './../providers/firebase1/firebase1';
import { HttpModule } from '@angular/http';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LokasiPage } from '../pages/lokasi/lokasi';

var config

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Home1Page,
    BerandaPage, 
    LoginPage,
    ProfilePage,
    LokasiPage
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Home1Page,
    BerandaPage,
    LoginPage,
    ProfilePage,
    LokasiPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Geolocation,
    AuthProvider,
    EventProvider,
    ProfileProvider,
    File,
    FilePath,
    FileChooser,
    Firebase,
    UserProvider,
    ImghandlerProvider,
    GeocoderProvider
  ]
})
export class AppModule {}
