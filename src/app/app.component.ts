import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(State => {
        console.log('Auth changed: ' , State);
      
        if(State){

          if(this.authService.isTeacher.getValue() == false){
            this.router.navigate(['members' , 'dashboard']); 
          }else{
            this.router.navigate(['members' , 'teacherdash']);
          }
        }else{
          this.router.navigate(['home']);
        }
      });

    });
  }
}
