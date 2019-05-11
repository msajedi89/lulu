import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  descEnglish: any = '';
  descArabic: any = '';

  constructor(public storage: Storage) {

    this.storage.get(DESCRIPTIONENGLISH).then(enData => {
      this.descEnglish = enData;
      console.log('the descEnglish: ' + this.descEnglish);
    });

    this.storage.get(DESCRIPTIONARABIC).then(arData => {
      this.descArabic = arData;
      console.log('the descArabic: ' + this.descArabic);
    });
   }

  ngOnInit() {}

}
