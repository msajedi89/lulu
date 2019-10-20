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
  selector: 'app-evaluationofdragtotablequestion',
  templateUrl: './evaluationofdragtotablequestion.page.html',
  styleUrls: ['./evaluationofdragtotablequestion.page.scss'],
})
export class EvaluationofdragtotablequestionPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  answer: any = '';

  q1 = [];
  q2 = [];
  q3 = [];
  q4 = [];
  q5 = [];

  // the variables to hold the Texts
  text1 = '';
  text2 = '';
  text3 = '';
  text4 = '';
  text5 = '';
  text6 = '';

  // the variable for Rooting
  fromWhere: any;

  // ******** the variables for Evaluation ********
  studentAnswer: any = '';
  stTableOne = [];
  stTableTwo = [];
  stTableOneTexts: any;
  stTableTwoTexts: any;

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

              // *********** get the question ***********
              this.network.getQuestionByID(this.QID).then(data => {
                const jsonArray = data;
                this.question = jsonArray[0];
                console.log('I received Question: ' + JSON.stringify(data));
                console.log('the question QID: ' + this.question.QID);
              });

              // ************* get the question's Answer **************
              this.network.getDragToTableAnswersByID(this.QID).then(answerData => {
                const jsonArray2 = answerData;
                this.answer = jsonArray2[0];
                console.log('I received Question: ' + JSON.stringify(this.answer));

                // ***** Split the text and get the Texts *****
                let temp = this.answer.TblOneTexts;
                const tblOneTexts = temp.split(',');
                if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) { this.text1 = tblOneTexts[0]; console.log('the First text: ' + this.text1); }
                if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) { this.text2 = tblOneTexts[1]; console.log('the Second text: ' + this.text2); }
                if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) { this.text3 = tblOneTexts[2]; console.log('the third text: ' + this.text3); }

                temp = this.answer.TblTwoTexts;
                const tblTwoTexts = temp.split(',');
                if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) { this.text4 = tblTwoTexts[0]; console.log('the Fourth text: ' + this.text4); }
                if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) { this.text5 = tblTwoTexts[1]; console.log('the Fifth text: ' + this.text5); }
                if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) { this.text6 = tblTwoTexts[2]; console.log('the Sixth text: ' + this.text6); }

                if (this.text1 != '') { this.q1.push(this.text1); }
                if (this.text2 != '') { this.q1.push(this.text2); }
                if (this.text3 != '') { this.q1.push(this.text3); }
                if (this.text4 != '') { this.q2.push(this.text4); }
                if (this.text5 != '') { this.q2.push(this.text5); }
                if (this.text6 != '') { this.q2.push(this.text6); }


                // ******** Process of Evaluation *********
                // get the student's answer
                this.network.getStudentDragToTableAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray3 = stAnswerData;
                  this.studentAnswer = jsonArray3[0];
                  console.log('the studentAnswer: ' + JSON.stringify(this.studentAnswer));

                  if (this.studentAnswer == '0') {
                    this.toastCtrl.create({
                      message: 'Student did not answer this Question',
                      duration: 4000
                    }).then(toast => toast.present());
                  } else {

                    // get the Student Exam/Homework Question ID
                    if (this.fromWhere == 'exam') {
                      this.stExamQuestionID = this.studentAnswer.eqID;
                    } else if (this.fromWhere == 'homework') {
                      this.stExamQuestionID = this.studentAnswer.hwkQID;
                    }

                    let x = this.studentAnswer.TableOne;
                    this.stTableOneTexts = x.split(',');
                    console.log('the stTableOneTexts: ' + this.stTableOneTexts);
                    let y = this.studentAnswer.TableTwo;
                    this.stTableTwoTexts = y.split(',');
                    console.log('the stTableTwoTexts: ' + this.stTableTwoTexts);

                    // evaluate of First Table
                    let textX = '';
                    let found = false;
                    for (let i = 0; i < this.stTableOneTexts.length; i++) {
                      textX = this.stTableOneTexts[i];
                      found = false;
                      for (let j = 0; j < this.q1.length; j++) {
                        if (textX == this.q1[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTableOne.push({ value: textX, color: 'green' });
                      } else {
                        this.stTableOne.push({ value: textX, color: 'red' });
                      }
                    }

                    // Evaluate of Second Table
                    textX = '';
                    found = false;
                    for (let i = 0; i < this.stTableTwoTexts.length; i++) {
                      textX = this.stTableTwoTexts[i];
                      found = false;
                      for (let j = 0; j < this.q2.length; j++) {
                        if (textX == this.q2[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTableTwo.push({ value: textX, color: 'green' });
                      } else {
                        this.stTableTwo.push({ value: textX, color: 'red' });
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

              // *********** get the question ***********
              this.network.getQuestionByID(this.QID).then(data => {
                const jsonArray = data;
                this.question = jsonArray[0];
                console.log('I received Question: ' + JSON.stringify(data));
                console.log('the question QID: ' + this.question.QID);
              });

              // ************* get the question's Answer **************
              this.network.getDragToTableAnswersByID(this.QID).then(answerData => {
                const jsonArray2 = answerData;
                this.answer = jsonArray2[0];
                console.log('I received Question: ' + JSON.stringify(this.answer));

                // ***** Split the text and get the Texts *****
                let temp = this.answer.TblOneTexts;
                const tblOneTexts = temp.split(',');
                if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) { this.text1 = tblOneTexts[0]; console.log('the First text: ' + this.text1); }
                if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) { this.text2 = tblOneTexts[1]; console.log('the Second text: ' + this.text2); }
                if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) { this.text3 = tblOneTexts[2]; console.log('the third text: ' + this.text3); }

                temp = this.answer.TblTwoTexts;
                const tblTwoTexts = temp.split(',');
                if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) { this.text4 = tblTwoTexts[0]; console.log('the Fourth text: ' + this.text4); }
                if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) { this.text5 = tblTwoTexts[1]; console.log('the Fifth text: ' + this.text5); }
                if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) { this.text6 = tblTwoTexts[2]; console.log('the Sixth text: ' + this.text6); }

                if (this.text1 != '') { this.q1.push(this.text1); }
                if (this.text2 != '') { this.q1.push(this.text2); }
                if (this.text3 != '') { this.q1.push(this.text3); }
                if (this.text4 != '') { this.q2.push(this.text4); }
                if (this.text5 != '') { this.q2.push(this.text5); }
                if (this.text6 != '') { this.q2.push(this.text6); }


                // ******** Process of Evaluation *********
                // get the student's answer
                this.network.getStudentDragToTableAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray3 = stAnswerData;
                  this.studentAnswer = jsonArray3[0];
                  console.log('the studentAnswer: ' + JSON.stringify(this.studentAnswer));

                  if (this.studentAnswer == '0') {
                    this.toastCtrl.create({
                      message: 'Student did not answer this Question',
                      duration: 4000
                    }).then(toast => toast.present());
                  } else {

                    // get the Student Exam/Homework Question ID
                    if (this.fromWhere == 'exam') {
                      this.stExamQuestionID = this.studentAnswer.eqID;
                    } else if (this.fromWhere == 'homework') {
                      this.stExamQuestionID = this.studentAnswer.hwkQID;
                    }

                    let x = this.studentAnswer.TableOne;
                    this.stTableOneTexts = x.split(',');
                    console.log('the stTableOneTexts: ' + this.stTableOneTexts);
                    let y = this.studentAnswer.TableTwo;
                    this.stTableTwoTexts = y.split(',');
                    console.log('the stTableTwoTexts: ' + this.stTableTwoTexts);

                    // evaluate of First Table
                    let textX = '';
                    let found = false;
                    for (let i = 0; i < this.stTableOneTexts.length; i++) {
                      textX = this.stTableOneTexts[i];
                      found = false;
                      for (let j = 0; j < this.q1.length; j++) {
                        if (textX == this.q1[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTableOne.push({ value: textX, color: 'green' });
                      } else {
                        this.stTableOne.push({ value: textX, color: 'red' });
                      }
                    }

                    // Evaluate of Second Table
                    textX = '';
                    found = false;
                    for (let i = 0; i < this.stTableTwoTexts.length; i++) {
                      textX = this.stTableTwoTexts[i];
                      found = false;
                      for (let j = 0; j < this.q2.length; j++) {
                        if (textX == this.q2[j]) {
                          found = true;
                        }
                      }
                      if (found == true) {
                        this.stTableTwo.push({ value: textX, color: 'green' });
                      } else {
                        this.stTableTwo.push({ value: textX, color: 'red' });
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
