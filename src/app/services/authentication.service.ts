import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';

import { NetworkEngineService } from '../network-engine.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //responseTxt: any;
  name: any[];

  authenticationState = new BehaviorSubject(false);
  isTeacher = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private network:NetworkEngineService,
    private navCtrl: NavController) {

    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   login(username, whoIs){
     
    if(whoIs == "teacher"){
      this.isTeacher.next(true);
      console.log("who is in AuthenticationService:" + whoIs);
      console.log("who is in AuthenticationService:" + this.isTeacher.getValue());
    }

    if(whoIs == "student"){
      this.isTeacher.next(false);
      console.log("who is in AuthenticationService:" + whoIs);
      console.log("who is in AuthenticationService:" + this.isTeacher.getValue());
    }

    this.storage.set('whois' , whoIs);

    return this.storage.set(TOKEN_KEY, username).then(result => {
      this.authenticationState.next(true); 
    });

   }

   logout(){
     return this.storage.remove(TOKEN_KEY).then(() => {
       this.authenticationState.next(false);
     });
   }

   isAuthenticated(){
     return this.authenticationState.value;
   }

   checkToken(){
     return this.storage.get(TOKEN_KEY).then(result => {

      this.storage.get('whois').then((val) => {
        console.log("who is:" + val);

        if(val == "teacher"){
          this.isTeacher.next(true);
          console.log("state of isTeacher:" + this.isTeacher.getValue());
        }
    
        if(val == "student"){
          this.isTeacher.next(false);
          console.log("state of isTeacher:" + this.isTeacher.getValue());
        }
      })
       if(result){
         this.authenticationState.next(true);
       }
     });
   }
}
