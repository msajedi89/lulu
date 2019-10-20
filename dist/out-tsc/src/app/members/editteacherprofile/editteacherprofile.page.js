import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
var TEACHERID = 'teacherid';
var EditteacherprofilePage = /** @class */ (function () {
    function EditteacherprofilePage(router, platform, network, navCtrl, storage, toastController, actionSheetController, camera, transfer) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.transfer = transfer;
        // student
        this.teacher = '';
        this.teacherID = '';
        this.profileImg = '../../../assets/imgs/default-user.jpg';
        // required variables for Teacher Image name
        this.teacherImg = '';
        this.fromDevice = false;
    }
    EditteacherprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        // get the teacher ID then fetch his/her Information
        this.storage.get(TEACHERID).then(function (teacherIDresult) {
            _this.teacherID = teacherIDresult;
            console.log('the teacherID is: ' + _this.teacherID);
            _this.network.getTeacherByID(_this.teacherID).then(function (teacherData) {
                var jsonArray = teacherData;
                _this.teacher = jsonArray[0];
                console.log('the teacher: ' + JSON.stringify(_this.teacher));
                // get the teacher Profile Image
                if ((_this.teacher.ProfileImg != '') && (_this.teacher.ProfileImg != null)) {
                    _this.profileImg = _this.network.mainTeacherProfileImgURL + _this.teacher.ProfileImg;
                    _this.teacherImg = _this.teacher.ProfileImg;
                }
            });
        });
    };
    EditteacherprofilePage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    // show a Toast.
    EditteacherprofilePage.prototype.presentToast = function (text) {
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
    // **************** Profile Image Part *****************
    // show an Action Sheet for choosing or taking image.
    EditteacherprofilePage.prototype.selectImage = function () {
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
    EditteacherprofilePage.prototype.takePicture = function () {
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
    EditteacherprofilePage.prototype.getPicture = function () {
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
    EditteacherprofilePage.prototype.uploadImage = function (image) {
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
        fileTransfer.upload(image, this.network.mainUploadTeacherProfileImgAPI, options).then(function (result) {
            console.log('the Image has been Uploaded');
        }, function (err) {
            alert(err);
        });
        return imageFileName;
    };
    EditteacherprofilePage.prototype.saveChanges = function (name, Family, username, password, address, email, phone) {
        var _this = this;
        if (address == null) {
            address = '';
        }
        if (email == null) {
            email = '';
        }
        if (phone == null) {
            phone = '';
        }
        var imageName;
        if (this.fromDevice == true) {
            imageName = this.uploadImage(this.profileImg);
            console.log('the imageName: ' + imageName);
        }
        else {
            imageName = this.teacherImg;
        }
        if ((name != '') && (Family != '') && (username != '') && (password != '')) {
            this.network.EditTeacherProfile(this.teacherID, name, Family, username, password, address, phone, email, imageName).then(function (result) {
                _this.presentToast('Your profile edited successfully..');
                console.log('the result of saving is: ' + JSON.stringify(result));
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the required field');
        }
    };
    EditteacherprofilePage = tslib_1.__decorate([
        Component({
            selector: 'app-editteacherprofile',
            templateUrl: './editteacherprofile.page.html',
            styleUrls: ['./editteacherprofile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController, ActionSheetController,
            Camera, FileTransfer])
    ], EditteacherprofilePage);
    return EditteacherprofilePage;
}());
export { EditteacherprofilePage };
//# sourceMappingURL=editteacherprofile.page.js.map