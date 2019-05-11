import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-studentdragdropquestion',
  templateUrl: './studentdragdropquestion.page.html',
  styleUrls: ['./studentdragdropquestion.page.scss'],
})
export class StudentdragdropquestionPage implements OnInit {

  constructor( private dragulaService: DragulaService, private toastCtrl: ToastController) {

    // set the drag event of Dragula
    this.dragulaService.drag('bag').subscribe(({ name, el, source}) => {
      el.setAttribute('color', 'danger');
    });

    // remove an item that is being dragged
    this.dragulaService.removeModel('bag').subscribe(({item}) => {
      this.toastCtrl.create({
        message: 'Removed ' + item.value,
        duration: 2000
      }).then(toast => toast.present());
    });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });

    // change the color of object that has changed its group
    this.dragulaService.dropModel('bag').subscribe(({item}) => {
      item['color'] = 'success';
    });

   }

  ngOnInit() {
  }

  q1 = [
    { value: 'Mansoor', color: 'primary' },
    { value: 'Sajedi', color: 'primary' }
  ];

  q2 = [
    { value: 'Adnan', color: 'secondary' },
    { value: 'Miri', color: 'secondary' }
  ];

  q3 = [
    { value: 'Vahid', color: 'tertiary' },
    { value: 'Fazli', color: 'tertiary' }
  ];

  q4 = [
    { value: 'Ebi', color: 'warning' },
    { value: 'Abdoli', color: 'warning' }
  ];

  todo = { value: '' , color: '' };
  selectedQuadrant = 'q1';


  addTodo(){
    switch(this.selectedQuadrant){
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }

    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '' , color: '' };
  }

}
