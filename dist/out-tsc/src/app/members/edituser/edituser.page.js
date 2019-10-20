import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
var WHOIS = 'whois';
var FORADDOREDIT = 'addoreditstudent';
var STUDENTID = 'studentid';
var USERID = 'userid';
var LANGUAGE = 'language';
var EdituserPage = /** @class */ (function () {
    function EdituserPage(router, platform, network, navCtrl, storage, toastController, actionSheetController, camera, transfer) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.transfer = transfer;
        this.whoIs = '';
        this.forAddOrEdit = '';
        // student
        this.student = '';
        this.stId = '';
        this.studentStatus = false;
        this.profileImg = '../../../assets/imgs/default-user.jpg';
        // required variables for Student Image name
        this.studentImg = '';
        this.fromDevice = false;
        this.language = '';
        this.parent = null;
        this.parentID = '';
        this.parentName = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    EdituserPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the who has entered to this page
        this.storage.get(WHOIS).then(function (whoIsResult) {
            _this.whoIs = whoIsResult;
            console.log('the whoIs: ' + _this.whoIs);
            if (_this.whoIs == 'student') {
                // force the Saving API to use Update statement insted of insert
                _this.forAddOrEdit = 'edit';
                // *********** get the entered Student ID ************
                _this.storage.get(USERID).then(function (stIDResult) {
                    _this.stId = stIDResult;
                    // get the Student Info By stID
                    _this.network.getStudentByIDForManaging(_this.stId).then(function (data) {
                        var jsonArray = data;
                        _this.student = jsonArray[0];
                        // get the profile Image
                        if ((_this.student.ProfileImg != null) && (_this.student.ProfileImg != '')) {
                            _this.profileImg = _this.network.mainStudentsProfileImgUrl + _this.student.ProfileImg;
                            _this.studentImg = _this.student.ProfileImg;
                        }
                        _this.studentStatus = false;
                        if (_this.student.Status == '0') {
                            _this.studentStatus = false;
                        }
                        else {
                            _this.studentStatus = true;
                        }
                        console.log('the student is: ' + JSON.stringify(_this.student));
                        // fetch parentID from loaded Data
                        _this.parentID = _this.student.ParentID;
                    });
                });
            }
            else {
                // get List of Parents
                _this.network.getAllParents().then(function (allParentsData) {
                    _this.allParents = allParentsData;
                    console.log('allParents: ' + JSON.stringify(_this.allParents));
                }).catch(function (error) {
                    alert('The error is: ' + error);
                });
                // for adding or editing
                _this.storage.get(FORADDOREDIT).then(function (forAddOrEditResult) {
                    _this.forAddOrEdit = forAddOrEditResult;
                    console.log('the forAddOrEdit: ' + _this.forAddOrEdit);
                    if (_this.forAddOrEdit == 'edit') {
                        _this.storage.get(STUDENTID).then(function (stID) {
                            _this.stId = stID;
                            // get the Student Info By stID
                            _this.network.getStudentByIDForManaging(stID).then(function (data) {
                                var jsonArray = data;
                                _this.student = jsonArray[0];
                                // get the profile Image
                                if ((_this.student.ProfileImg != null) && (_this.student.ProfileImg != '')) {
                                    _this.profileImg = _this.network.mainStudentsProfileImgUrl + _this.student.ProfileImg;
                                    _this.studentImg = _this.student.ProfileImg;
                                }
                                _this.studentStatus = false;
                                if (_this.student.Status == '0') {
                                    _this.studentStatus = false;
                                }
                                else {
                                    _this.studentStatus = true;
                                }
                                console.log('the student is: ' + JSON.stringify(_this.student));
                                // fetch parentID from loaded Data
                                _this.parentID = _this.student.ParentID;
                                //this.parentName = this.student.Name;
                            });
                        });
                    }
                });
            }
        });
    };
    EdituserPage.prototype.goBack = function () {
        if (this.whoIs == 'student') {
            this.router.navigate(['members', 'dashboard']);
        }
        else {
            this.router.navigate(['members', 'managestudents']);
        }
    };
    // show a Toast.
    EdituserPage.prototype.presentToast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
                            position: 'bottom',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EdituserPage.prototype.onClose = function ($event) {
        this.parentID = this.parent.ParentID;
        console.log('the parent selected is: ' + this.parentID + ' ' + this.parent.Name);
        this.parentName = '';
    };
    // **************** Profile Image Part *****************
    // show an Action Sheet for choosing or taking image.
    EdituserPage.prototype.selectImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Select Image Source',
                            buttons: [
                                {
                                    text: 'Load from Library',
                                    handler: function () {
                                        _this.getPicture();
                                    }
                                },
                                {
                                    text: 'Use Camera',
                                    handler: function () {
                                        _this.takePicture();
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // get the picture from device camera.
    EdituserPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.profileImg = 'data:image/jpeg;base64,' + imageData;
            _this.fromDevice = true;
        }, function (err) {
            alert(err);
        });
    };
    // get the picture from device photo library.
    EdituserPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.profileImg = 'data:image/jpeg;base64,' + imageData;
            _this.fromDevice = true;
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading QuestionImage.
    EdituserPage.prototype.uploadImage = function (image) {
        var fileTransfer = this.transfer.create();
        var imageFileName = new Date().getTime() + '.jpg';
        var options = {
            fileKey: 'photo',
            fileName: imageFileName,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'image/jpg',
            headers: {}
        };
        fileTransfer.upload(image, this.network.mainUploadStudentProfileImgAPI, options).then(function (result) {
            console.log('the Image has been Uploaded');
        }, function (err) {
            alert(err);
        });
        return imageFileName;
    };
    EdituserPage.prototype.saveChanges = function (nameFamily, username, password, address, birthdate) {
        var _this = this;
        if (address == null) {
            address = '';
        }
        if (birthdate == null) {
            birthdate = '1991-05-08';
        }
        var imageName;
        if (this.fromDevice == true) {
            imageName = this.uploadImage(this.profileImg);
            console.log('the imageName: ' + imageName);
        }
        else {
            imageName = this.studentImg;
        }
        if ((nameFamily != null) && (username != null) && (password != null)) {
            this.network.addOrEditStudent(this.stId, nameFamily, username, password, address, birthdate, this.studentStatus, imageName, this.forAddOrEdit, this.parentID).then(function (result) {
                _this.presentToast('Your data has been saved..');
                console.log('the result of saving is: ' + JSON.stringify(result));
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the required field');
        }
    };
    EdituserPage = tslib_1.__decorate([
        Component({
            selector: 'app-edituser',
            templateUrl: './edituser.page.html',
            styleUrls: ['./edituser.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController, ActionSheetController,
            Camera, FileTransfer])
    ], EdituserPage);
    return EdituserPage;
}());
export { EdituserPage };
//# sourceMappingURL=edituser.page.js.map