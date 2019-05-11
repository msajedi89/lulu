import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecterns',
  templateUrl: './lecterns.page.html',
  styleUrls: ['./lecterns.page.scss'],
})
export class LecternsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['members' , 'teacherdash']);
  }

}
