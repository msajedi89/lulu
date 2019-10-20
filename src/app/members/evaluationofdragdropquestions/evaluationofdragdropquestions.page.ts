import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const QUESTIONID = 'questionid';
const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const ROOT = 'questionroot';
const STUDENTHOMEWORKID = 'homeworkid';

const WHOIS = 'whois';

@Component({
  selector: 'app-evaluationofdragdropquestions',
  templateUrl: './evaluationofdragdropquestions.page.html',
  styleUrls: ['./evaluationofdragdropquestions.page.scss'],
})
export class EvaluationofdragdropquestionsPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  answer: any = '';
  fstImageInfo: any = '';
  fstImage = '';
  secImageInfo: any = '';
  secImage = '';
  trdImageInfo: any = '';
  trdImage = '';

  // fstRealChoice
  q1 = [];
  // secRealChoice
  q2 = [];
  // trdRealChoice
  q3 = [];
  q4 = [];

  // the variable for Rooting
  fromWhere: any = 'exam';

  // ***** the variables for Evaluation *****
  studentAnswer: any = '';
  // the variables for showing student results along with Evaluation
  stFstChoice = [];
  stSecChoice = [];
  stTrdChoice = [];

  // the variable for determinig that who entered this page
  whoIs: any = '';

  // the variables for recording Score
  stExamQuestionID: any;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastCtrl: ToastController) {

    // Student entered this page or Teacher
    this.storage.get(WHOIS).then(resultWhoIS => {
      this.whoIs = resultWhoIS;
      console.log('the whoIs is: ' + this.whoIs);
    });
  }

  ngOnInit() {

    // get the Student ID
    this.storage.get(USERID).then(resultUserID => {
      this.stID = resultUserID;
      console.log('the stID is: ' + this.stID);

      // get the Question ID
      this.storage.get(QUESTIONID).then(resultQID => {
        this.QID = resultQID;
        console.log('the QID is: ' + this.QID);

        // get the Root
        this.storage.get(ROOT).then(whereResult => {
          this.fromWhere = whereResult;
          console.log('from Where: ' + this.fromWhere);

          if (this.fromWhere == 'exam') {
            // get the Student Exam ID
            this.storage.get(STUDENTEXAMID).then(resultstExamID => {
              this.stExamID = resultstExamID;
              console.log('the stExamID is: ' + this.stExamID);

              // get the question
              this.network.getQuestionByID(this.QID).then(data => {
                let jsonArray = data;
                this.question = jsonArray[0];
                console.log('I received Question: ' + JSON.stringify(data));
              });

              // get the Question's Answer
              this.network.getDragDropAnswerQuestionByID(this.QID).then(answerData => {
                let jsonArray2 = answerData;
                this.answer = jsonArray2[0];
                console.log('I received Answer: ' + JSON.stringify(answerData));
                let fstImgID = this.answer.RightOneImage;
                let secImgID = this.answer.RightTwoImage;
                let trdImgID = this.answer.RightThreeImage;

                if (this.answer.LeftOneEn != null) { this.q1.push(this.answer.LeftOneEn); }
                if (this.answer.LeftOneAr != null) { this.q1.push(this.answer.LeftOneAr); }
                if (this.answer.LeftOneAz != null) { this.q1.push(this.answer.LeftOneAz); }
                if (this.answer.LeftTwoEn != null) { this.q2.push(this.answer.LeftTwoEn); }
                if (this.answer.LeftTwoAr != null) { this.q2.push(this.answer.LeftTwoAr); }
                if (this.answer.LeftTwoAz != null) { this.q2.push(this.answer.LeftTwoAz); }
                if (this.answer.LeftThreeEn != null) { this.q3.push(this.answer.LeftThreeEn); }
                if (this.answer.LeftThreeAr != null) { this.q3.push(this.answer.LeftThreeAr); }
                if (this.answer.LeftThreeAz != null) { this.q3.push(this.answer.LeftThreeAz); }

                // get the First Image
                if (fstImgID != 1) {
                  this.network.getImageByID(fstImgID).then(fstImgData => {
                    const jsonArray3 = fstImgData;
                    this.fstImageInfo = jsonArray3[0];
                    this.fstImage = this.network.mainUploadImgUrl + this.fstImageInfo.Image;
                  });
                }

                // get the Second Image
                if (secImgID != 1) {
                  this.network.getImageByID(secImgID).then(secImgData => {
                    const jsonArray4 = secImgData;
                    this.secImageInfo = jsonArray4[0];
                    this.secImage = this.network.mainUploadImgUrl + this.secImageInfo.Image;
                  });
                }

                // get the Third Image
                if (trdImgID != 1) {
                  this.network.getImageByID(trdImgID).then(trdImgData => {
                    const jsonArray5 = trdImgData;
                    this.trdImageInfo = jsonArray5[0];
                    this.trdImage = this.network.mainUploadImgUrl + this.trdImageInfo.Image;
                  });
                }


                // ********** get Student Answer **********
                this.network.getStudentDragDropAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray6 = stAnswerData;
                  this.studentAnswer = jsonArray6[0];
                  console.log('the studentAnswer is: ' + JSON.stringify(this.studentAnswer));

                  // get the Student Exam/Homework Question ID
                  if (this.fromWhere == 'exam') {
                    this.stExamQuestionID = this.studentAnswer.eqID;
                  } else if (this.fromWhere == 'homework') {
                    this.stExamQuestionID = this.studentAnswer.hwkQID;
                  }

                  this.stFstChoice = [];
                  this.stSecChoice = [];
                  this.stTrdChoice = [];

                  // Evaluate First Choice of Student
                  let found = false;
                  let x = this.studentAnswer.DragOne;
                  let fstStAnswer = x.split(',');
                  console.log('the fstStAnswer is: ' + fstStAnswer);
                  if (fstStAnswer.length > 0) {
                    for (let i = 0; i < fstStAnswer.length; i++) {
                      let textX = fstStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q1.length; j++) {
                        if (textX == this.q1[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stFstChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stFstChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                  // Evaluate the Second Choice of Student
                  let y = this.studentAnswer.DragTwo;
                  let secStAnswer = y.split(',');
                  console.log('the secStAnswer is: ' + secStAnswer);
                  if (secStAnswer.length > 0) {
                    for (let i = 0; i < secStAnswer.length; i++) {
                      let textX = secStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q2.length; j++) {
                        if (textX == this.q2[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stSecChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stSecChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                  // Evaluate the Third Choice of Student
                  let z = this.studentAnswer.DragThree;
                  let trdStAnswer = z.split(',');
                  console.log('the trdStAnswer is: ' + trdStAnswer);
                  if (trdStAnswer.length > 0) {
                    for (let i = 0; i < trdStAnswer.length; i++) {
                      let textX = trdStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q3.length; j++) {
                        if (textX == this.q3[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTrdChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stTrdChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                });
              });
            });
          } else {
            // get the Student Homework ID
            this.storage.get(STUDENTHOMEWORKID).then(resultstExamID => {
              this.stExamID = resultstExamID;
              console.log('the stHomeworkID is: ' + this.stExamID);

              // get the question
              this.network.getQuestionByID(this.QID).then(data => {
                let jsonArray = data;
                this.question = jsonArray[0];
                console.log('I received Question: ' + JSON.stringify(data));
              });

              // get the Question's Answer
              this.network.getDragDropAnswerQuestionByID(this.QID).then(answerData => {
                let jsonArray2 = answerData;
                this.answer = jsonArray2[0];
                console.log('I received Answer: ' + JSON.stringify(answerData));
                let fstImgID = this.answer.RightOneImage;
                let secImgID = this.answer.RightTwoImage;
                let trdImgID = this.answer.RightThreeImage;

                if (this.answer.LeftOneEn != null) { this.q1.push(this.answer.LeftOneEn); }
                if (this.answer.LeftOneAr != null) { this.q1.push(this.answer.LeftOneAr); }
                if (this.answer.LeftOneAz != null) { this.q1.push(this.answer.LeftOneAz); }
                if (this.answer.LeftTwoEn != null) { this.q2.push(this.answer.LeftTwoEn); }
                if (this.answer.LeftTwoAr != null) { this.q2.push(this.answer.LeftTwoAr); }
                if (this.answer.LeftTwoAz != null) { this.q2.push(this.answer.LeftTwoAz); }
                if (this.answer.LeftThreeEn != null) { this.q3.push(this.answer.LeftThreeEn); }
                if (this.answer.LeftThreeAr != null) { this.q3.push(this.answer.LeftThreeAr); }
                if (this.answer.LeftThreeAz != null) { this.q3.push(this.answer.LeftThreeAz); }

                // get the First Image
                if (fstImgID != 1) {
                  this.network.getImageByID(fstImgID).then(fstImgData => {
                    const jsonArray3 = fstImgData;
                    this.fstImageInfo = jsonArray3[0];
                    this.fstImage = this.network.mainUploadImgUrl + this.fstImageInfo.Image;
                  });
                }

                // get the Second Image
                if (secImgID != 1) {
                  this.network.getImageByID(secImgID).then(secImgData => {
                    const jsonArray4 = secImgData;
                    this.secImageInfo = jsonArray4[0];
                    this.secImage = this.network.mainUploadImgUrl + this.secImageInfo.Image;
                  });
                }

                // get the Third Image
                if (trdImgID != 1) {
                  this.network.getImageByID(trdImgID).then(trdImgData => {
                    const jsonArray5 = trdImgData;
                    this.trdImageInfo = jsonArray5[0];
                    this.trdImage = this.network.mainUploadImgUrl + this.trdImageInfo.Image;
                  });
                }


                // ********** get Student Answer **********
                this.network.getStudentDragDropAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray6 = stAnswerData;
                  this.studentAnswer = jsonArray6[0];
                  console.log('the studentAnswer is: ' + JSON.stringify(this.studentAnswer));

                  // get the Student Exam/Homework Question ID
                  if (this.fromWhere == 'exam') {
                    this.stExamQuestionID = this.studentAnswer.eqID;
                  } else if (this.fromWhere == 'homework') {
                    this.stExamQuestionID = this.studentAnswer.hwkQID;
                  }

                  this.stFstChoice = [];
                  this.stSecChoice = [];
                  this.stTrdChoice = [];

                  // Evaluate First Choice of Student
                  let found = false;
                  let x = this.studentAnswer.DragOne;
                  let fstStAnswer = x.split(',');
                  console.log('the fstStAnswer is: ' + fstStAnswer);
                  if (fstStAnswer.length > 0) {
                    for (let i = 0; i < fstStAnswer.length; i++) {
                      let textX = fstStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q1.length; j++) {
                        if (textX == this.q1[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stFstChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stFstChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                  // Evaluate the Second Choice of Student
                  let y = this.studentAnswer.DragTwo;
                  let secStAnswer = y.split(',');
                  console.log('the secStAnswer is: ' + secStAnswer);
                  if (secStAnswer.length > 0) {
                    for (let i = 0; i < secStAnswer.length; i++) {
                      let textX = secStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q2.length; j++) {
                        if (textX == this.q2[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stSecChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stSecChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                  // Evaluate the Third Choice of Student
                  let z = this.studentAnswer.DragThree;
                  let trdStAnswer = z.split(',');
                  console.log('the trdStAnswer is: ' + trdStAnswer);
                  if (trdStAnswer.length > 0) {
                    for (let i = 0; i < trdStAnswer.length; i++) {
                      let textX = trdStAnswer[i];
                      found = false;
                      for (let j = 0; j < this.q3.length; j++) {
                        if (textX == this.q3[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTrdChoice.push({ value: textX, color: '#6BC357' });
                      } else {
                        this.stTrdChoice.push({ value: textX, color: '#F3534B' });
                      }
                    }
                  }

                });
              });
            });
          }
        });
      });
    });
  }

  goBack() {
    if (this.whoIs == 'student') {
      if (this.fromWhere == 'exam') {
        this.router.navigate(['members', 'studenttakenexamquestionlist']);
      } else if (this.fromWhere == 'homework') {
        this.router.navigate(['members', 'studenttakenhomeworkquestionlist']);
      }
    } else if (this.whoIs == 'teacher') {
      if (this.fromWhere == 'exam') {
        this.router.navigate(['members', 'examevaluation']);
      } else {
        this.router.navigate(['members', 'homeworkevaluation']);
      }
    } else {
      this.router.navigate(['members', 'studenttakenexamquestionlist']);
    }
  }

  // *********** record the given score ***********
  recordScore(score, evaluationDescription) {
    if (score != null) {
      if (evaluationDescription == null) { evaluationDescription = ''; }

      this.network.recordStudentScore(this.stExamQuestionID, score, evaluationDescription, this.fromWhere).then(resultScore => {
        console.log('the resultScore is: ' + resultScore);
        this.toastCtrl.create({
          message: 'Score Recorded',
          duration: 3000
        }).then(toast => toast.present());
      });
    }
  }
}
