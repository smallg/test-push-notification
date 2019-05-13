import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initPushNotification();
    });
  }

  private initPushNotification() {
    const options: PushOptions = {
      android: {
        senderID: '802385240547'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      alert(JSON.stringify(data))
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin' + error)
      alert(error)
    });
  }
}

