import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
var StudentdragdropquestionPage = /** @class */ (function () {
    function StudentdragdropquestionPage(dragulaService, toastCtrl) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.toastCtrl = toastCtrl;
        this.q1 = [
            { value: 'Mansoor', color: 'primary' },
            { value: 'Sajedi', color: 'primary' }
        ];
        this.q2 = [
            { value: 'Adnan', color: 'secondary' },
            { value: 'Miri', color: 'secondary' }
        ];
        this.q3 = [
            { value: 'Vahid', color: 'tertiary' },
            { value: 'Fazli', color: 'tertiary' }
        ];
        this.q4 = [
            { value: 'Ebi', color: 'warning' },
            { value: 'Abdoli', color: 'warning' }
        ];
        this.todo = { value: '', color: '' };
        this.selectedQuadrant = 'q1';
        // set the drag event of Dragula
        this.dragulaService.drag('bag').subscribe(function (_a) {
            var name = _a.name, el = _a.el, source = _a.source;
            el.setAttribute('color', 'danger');
        });
        // remove an item that is being dragged
        this.dragulaService.removeModel('bag').subscribe(function (_a) {
            var item = _a.item;
            _this.toastCtrl.create({
                message: 'Removed ' + item.value,
                duration: 2000
            }).then(function (toast) { return toast.present(); });
        });
        this.dragulaService.createGroup('bag', {
            removeOnSpill: true
        });
        // change the color of object that has changed its group
        this.dragulaService.dropModel('bag').subscribe(function (_a) {
            var item = _a.item;
            item['color'] = 'success';
        });
    }
    StudentdragdropquestionPage.prototype.ngOnInit = function () {
    };
    StudentdragdropquestionPage.prototype.addTodo = function () {
        switch (this.selectedQuadrant) {
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
        this.todo = { value: '', color: '' };
    };
    StudentdragdropquestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentdragdropquestion',
            templateUrl: './studentdragdropquestion.page.html',
            styleUrls: ['./studentdragdropquestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DragulaService, ToastController])
    ], StudentdragdropquestionPage);
    return StudentdragdropquestionPage;
}());
export { StudentdragdropquestionPage };
//# sourceMappingURL=studentdragdropquestion.page.js.map