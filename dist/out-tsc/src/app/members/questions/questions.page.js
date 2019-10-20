import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
var QuestionsPage = /** @class */ (function () {
    function QuestionsPage(router, navCtrl, network) {
        this.router = router;
        this.navCtrl = navCtrl;
        this.network = network;
        this.get100LatestQuestions();
    }
    QuestionsPage.prototype.ngOnInit = function () {
    };
    QuestionsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    QuestionsPage.prototype.goToSelectionTypeQuestions = function () {
        this.router.navigate(['members', 'selectiontypequestions']);
    };
    QuestionsPage.prototype.goToDragDropTypeQuestions = function () {
        this.router.navigate(['members', 'dragdroptypequestion']);
    };
    QuestionsPage.prototype.goToDragToTableTypeQuestions = function () {
        this.router.navigate(['members', 'dragtotabletypequestion']);
    };
    QuestionsPage.prototype.goToAnswersTypeQuestions = function () {
        this.router.navigate(['members', 'answertypequestions']);
    };
    QuestionsPage.prototype.goToDrawLetterTypeQuestions = function () {
        this.router.navigate(['members', 'drawletterquestion']);
    };
    QuestionsPage.prototype.goToReciteTheQuranTypeQuestions = function () {
        this.router.navigate(['members', 'recitethequran']);
    };
    // Get the 100 Latest Question from server Method
    QuestionsPage.prototype.get100LatestQuestions = function () {
        var _this = this;
        this.network.get100LatestQuestions().then(function (data) {
            _this.showData(data);
            console.log('I Received: ' + JSON.stringify(data));
        });
    };
    QuestionsPage.prototype.showData = function (data) {
        var jsonArray = data;
        this.qIds = [];
        this.qEn = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.qIds.push(jsonObject.QID);
            this.qEn.push(jsonObject.Question);
        }
    };
    QuestionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-questions',
            templateUrl: './questions.page.html',
            styleUrls: ['./questions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController,
            NetworkEngineService])
    ], QuestionsPage);
    return QuestionsPage;
}());
export { QuestionsPage };
//# sourceMappingURL=questions.page.js.map