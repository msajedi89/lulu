import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecternmainpage',
  templateUrl: './lecternmainpage.page.html',
  styleUrls: ['./lecternmainpage.page.scss'],
})
export class LecternmainpagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['members','teacherdash']);
  }

  goToManageCategories() {
    this.router.navigate(['managecategories']);
  }

  goToUploadVideo() {
    this.router.navigate(['uploadlecternvideo']);
  }

  goToCreateQuestion() {
    this.router.navigate(['lecterncategories']);
  }

}
