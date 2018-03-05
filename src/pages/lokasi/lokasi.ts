import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Firebase } from '../../providers/firebase1/firebase1';

@Component({
  selector: 'page-lokasi',
  templateUrl: 'lokasi.html'
})
export class LokasiPage {
  data: FirebaseListObservable<any[]>;
   
   public form                   : FormGroup
   public geoForm                : FormGroup;
   public geocoded               : boolean;
   public results                : string;
   public filter                 : string      = 'Search by Coordinates';
   public displayForward         : boolean     = true;
   public displayReverse         : boolean     = false;

   constructor(public navCtrl    : NavController,
               public _GEOCODE   : GeocoderProvider,
               private _FB       : FormBuilder,
               private _PLATFORM : Platform,
               private firebase1: Firebase)
   {

    this.data = this.firebase1.getDataItems();
      // Define the validation rules for handling the
      // address submission from the forward geocoding form
      this.form       = _FB.group({
         'keyword'        : ['', Validators.required]
      });


      // Define the validation rules for handling the
      // latitude/longitude submissions from the reverse
      // geocoding form
      this.geoForm    = _FB.group({
         'latitude'        : ['', Validators.required],
         'longitude'       : ['', Validators.required]
      });

   }



   /**
     *
     * Determine whether the forwardGeocoding or
     * reverseGeocoding form will be displayed
     *
     * @public
     * @method filterForm
     * @return {none}
     *
     */
   filterForm()
   {
      if(this.displayForward)
      {
         this.filter      		 = 'Search by keyword';
         this.displayReverse     = true;
         this.displayForward     = false;
      }
      else
      {
         this.filter             = 'Search by Co-ordinates';
         this.displayReverse     = false;
         this.displayForward     = true;
      }
   }




   /**
     *
     * Retrieve latitude/longitude coordinate values from HTML form,
     * pass these into the reverseGeocode method of the Geocoder service
     * and handle the results accordingly
     *
     * @public
     * @method performReverseGeocoding
     * @return {none}
     *
     */
   performReverseGeocoding(val)
   {
      this._PLATFORM.ready()
      .then((data : any) =>
      {
         let latitude     : any = parseFloat(this.geoForm.controls["latitude"].value),
             longitude    : any = parseFloat(this.geoForm.controls["longitude"].value);

         this._GEOCODE.reverseGeocode(latitude, longitude)
         .then((data : any) =>
         {
            this.geocoded      = true;
            this.results       = data;

         })
         .catch((error : any)=>
         {
            this.geocoded      = true;
            this.results       = error.message;
         });
      });
   }
  }