import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const WHOIS = 'whois';
const FORADDOREDIT = 'addoreditstudent';
const STUDENTID = 'studentid';
const USERID = 'userid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {

  whoIs = '';
  forAddOrEdit = '';

  // student
  student: any = '';
  stId: any = '';
  studentStatus = true;
  profileImg: any = '../../../assets/imgs/default-user.jpg';
  studentUsername = '';

  studentDuplication: any = '';

  // required variables for Student Image name
  studentImg = '';

  fromDevice = false;

  language = '';

  // Parent Selectable
  allParents: any;
  parent = null;
  parentID = '';
  parentName = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController, private actionSheetController: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get the who has entered to this page
    this.storage.get(WHOIS).then(whoIsResult => {
      this.whoIs = whoIsResult;
      console.log('the whoIs: ' + this.whoIs);

      if (this.whoIs == 'student') {
        // force the Saving API to use Update statement insted of insert
        this.forAddOrEdit = 'edit';

        // *********** get the entered Student ID ************
        this.storage.get(USERID).then(stIDResult => {
          this.stId = stIDResult;

          // get the Student Info By stID
          this.network.getStudentByIDForManaging(this.stId).then(data => {
            const jsonArray = data;
            this.student = jsonArray[0];
            // get the profile Image
            if ((this.student.ProfileImg != null) && (this.student.ProfileImg != '')) {
              this.profileImg = this.network.mainStudentsProfileImgUrl + this.student.ProfileImg;
              this.studentImg = this.student.ProfileImg;
            }
            this.studentStatus = false;
            if (this.student.Status == '0') {
              this.studentStatus = false;
            } else {
              this.studentStatus = true;
            }

            console.log('the student is: ' + JSON.stringify(this.student));

            // fetch parentID from loaded Data
            this.parentID = this.student.ParentID;

            // fetch username from loaded Data
            this.studentUsername = this.student.Username;
          });
        });
      } else {

        // get List of Parents
        this.network.getAllParents().then(allParentsData => {
          this.allParents = allParentsData;
          console.log('allParents: ' + JSON.stringify(this.allParents));
        }).catch(error => {
          alert('The error is: ' + error);
        });

        // for adding or editing
        this.storage.get(FORADDOREDIT).then(forAddOrEditResult => {
          this.forAddOrEdit = forAddOrEditResult;
          console.log('the forAddOrEdit: ' + this.forAddOrEdit);

          if (this.forAddOrEdit == 'edit') {
            this.storage.get(STUDENTID).then(stID => {
              this.stId = stID;

              // get the Student Info By stID
              this.network.getStudentByIDForManaging(stID).then(data => {
                const jsonArray = data;
                this.student = jsonArray[0];
                // get the profile Image
                if ((this.student.ProfileImg != null) && (this.student.ProfileImg != '')) {
                  this.profileImg = this.network.mainStudentsProfileImgUrl + this.student.ProfileImg;
                  this.studentImg = this.student.ProfileImg;
                }
                this.studentStatus = false;
                if (this.student.Status == '0') {
                  this.studentStatus = false;
                } else {
                  this.studentStatus = true;
                }

                console.log('the student is: ' + JSON.stringify(this.student));

                // fetch parentID from loaded Data
                this.parentID = this.student.ParentID;

                // fetch username from loaded Data
                this.studentUsername = this.student.Username;
              });
            });
          }
        });
      }
    });

  }

  goBack() {
    if (this.whoIs == 'student') {
      this.router.navigate(['members', 'dashboard']);
    } else {
      this.router.navigate(['members', 'managestudents']);
    }
  }

  // show a Toast.
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });

    toast.present();
  }

  onClose($event) {
    this.parentID = this.parent.ParentID;
    console.log('the parent selected is: ' + this.parentID + ' ' + this.parent.Name);
    this.parentName = '';
  }

  // **************** Profile Image Part *****************

  // show an Action Sheet for choosing or taking image.
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // get the picture from device camera.
  takePicture() {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.profileImg = 'data:image/jpeg;base64,' + imageData;
      this.fromDevice = true;
    }, (err) => {
      alert(err);
    });
  }

  // get the picture from device photo library.
  getPicture() {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.profileImg = 'data:image/jpeg;base64,' + imageData;
      this.fromDevice = true;
    }, (err) => {
      alert(err);
    });
  }

  // the method for uploading QuestionImage.
  uploadImage(image) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let imageFileName = new Date().getTime() + '.jpg';

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: imageFileName,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpg',
      headers: {}
    }

    fileTransfer.upload(image, this.network.mainUploadStudentProfileImgAPI, options).then((result) => {
      console.log('the Image has been Uploaded');
    }, (err) => {
      alert(err);
    });

    return imageFileName;
  }


  saveChanges(nameFamily, username, password, address, birthdate) {

    if (address == null) { address = ''; }
    if (birthdate == null) { birthdate = '1991-05-08'; }

    let imageName;

    if (this.fromDevice == true) {
      imageName = this.uploadImage(this.profileImg);
      console.log('the imageName: ' + imageName);
    } else {
      imageName = this.studentImg;
    }

    if ((nameFamily != null) && (nameFamily != '') && (username != null) && (username != '') && (password != null) && (password != '')) {

      if (this.forAddOrEdit == 'edit') {
        // Do not Check the Duplication of username in Edit mode
        this.network.addOrEditStudent(this.stId, nameFamily, this.studentUsername, password, address, birthdate, this.studentStatus, imageName, this.forAddOrEdit, this.parentID).then(result => {
          this.presentToast('Your data has been saved..');
          console.log('the result of saving is: ' + JSON.stringify(result));
        }, (err) => {
          alert(err);
        });
      } else {
        // Check the Duplication of username in ADD mode
        this.network.getStudentByUsername(username).then(studentData => {
          const jsonArray = studentData;
          this.studentDuplication = jsonArray[0];
          console.log('I Received studentDuplication: ' + JSON.stringify(this.studentDuplication));

          // check the Dublication of username
          if (this.studentDuplication == '0') {

            if(this.studentStatus === false) {
              this.studentStatus = false;
            } else {
              this.studentStatus = true;
            }
            if(this.parentID == '') {
              this.parentID = '5';
            }
            this.network.addOrEditStudent(this.stId, nameFamily, username, password, address, birthdate, this.studentStatus, imageName, this.forAddOrEdit, this.parentID).then(result => {
              this.presentToast('Your data has been saved..');
              console.log('the result of saving is: ' + JSON.stringify(result));
            }, (err) => {
              alert(err);
            });
          } else {
            alert('This Username has registered before!');
          }
        }).catch(error => {
          alert(error);
        });
      }

    } else {
      alert('Please fill the required field');
    }
  }

}
