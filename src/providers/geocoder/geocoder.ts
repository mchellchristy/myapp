import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {

  constructor(public http: Http, private _GEOCODE  : NativeGeocoder) {
    console.log('Hello GeocoderProvider Provider');
  }
  reverseGeocode(lat : number, lng : number) : Promise<any>
  {
     return new Promise((resolve, reject) =>
     {
        this._GEOCODE.reverseGeocode(lat, lng)
        .then((result : NativeGeocoderReverseResult) =>
        {
           let str : string   = `The reverseGeocode address is ${result.countryName} ${result.countryCode}`;
           resolve(str);
        })
        .catch((error: any) =>
        {
           console.log(error);
           reject(error);
        });
     });
  }
}
