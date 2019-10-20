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
  selector: 'app-evaluationofselectivequestion',
  templateUrl: './evaluationofselectivequestion.page.html',
  styleUrls: ['./evaluationofselectivequestion.page.scss'],
})
export class EvaluationofselectivequestionPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  answer: any = '';

  // determines that the Question is single Selection or Multi
  isMulti = false;

  // the Choice's ID
  fstChoiceID: any = '';
  secChoiceID: any = '';
  trdChoiceID: any = '';

  // the variables for holding the Choices information
  fstChoice: any = '';
  secChoice: any = '';
  trdChoice: any = '';

  // the variables for choice's Image
  fstChoiceImg: any = '';
  secChoiceImg: any = '';
  trdChoiceImg: any = '';

  // the variable to record Student's Selects
  studentSelects: any = '';

  // the variable for Rooting
  fromWhere: any;

  // the variables for Evaluating and Shownig the Correct Answers.
  oneColor = 'white';
  twoColor = 'white';
  threeColor = 'white';
  oneReal = false;
  twoReal = false;
  threeReal = false;
  stOne = false;
  stTwo = false;
  stThree = false;
  correctChoices: any;
  studentChoices: any;
  studentAnswer: any = '';

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
                const jsonArray = data;
                this.question = jsonArray[0];
                console.log('the question: ' + JSON.stringify(this.question));
              });

              // get the question' Answer
              this.network.getSelectiveQuestionAnswersByID(this.QID).then(Answerdata => {
                const jsonArray2 = Answerdata;
                this.answer = jsonArray2[0];
                console.log('the Questions Answer: ' + JSON.stringify(this.answer));

                // get the Correct Choices
                let x = this.answer.RightAnswers;
                this.correctChoices = x.split(',');
                console.log('the correctChoices: ' + this.correctChoices);

                this.isMulti = this.answer.Multi;
                this.fstChoiceID = this.answer.FirstChoice;
                this.secChoiceID = this.answer.SecChoice;
                this.trdChoiceID = this.answer.ThirdChoice;

                console.log('Selection State: ' + this.isMulti);
                console.log('the fstChoiceID: ' + this.fstChoiceID);
                console.log('the secChoiceID: ' + this.secChoiceID);
                console.log('the trdChoiceID: ' + this.trdChoiceID);

                if (this.fstChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.fstChoiceID).then(fstData => {
                    const jsonArray3 = fstData;
                    this.fstChoice = jsonArray3[0];
                    this.fstChoiceImg = this.network.mainUploadImgUrl + this.fstChoice.Image;
                    console.log('the fstChoice Data: ' + JSON.stringify(this.fstChoice));
                  });
                }

                if (this.secChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.secChoiceID).then(secData => {
                    const jsonArray4 = secData;
                    this.secChoice = jsonArray4[0];
                    this.secChoiceImg = this.network.mainUploadImgUrl + this.secChoice.Image;
                    console.log('the secChoice Data: ' + this.secChoice);
                  });
                }

                if (this.trdChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.trdChoiceID).then(trdData => {
                    const jsonArray5 = trdData;
                    this.trdChoice = jsonArray5[0];
                    this.trdChoiceImg = this.network.mainUploadImgUrl + this.trdChoice.Image;
                    console.log('the trdChoice Data: ' + this.trdChoice);
                  });
                }

                // get the Student Answer
                this.network.getStudentSelectiveAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray6 = stAnswerData;
                  this.studentAnswer = jsonArray6[0];
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

                    let y = this.studentAnswer.StudentChoices;
                    this.studentChoices = y.split(',');

                    // ******* Determine the Correct Choices *******
                    let isIn = false;
                    // Check the First choice is Answer or not?
                    isIn = this.findx(1, this.correctChoices);
                    if (isIn == true) { this.oneReal = true; console.log('the oneReal is: ' + this.oneReal); }
                    // Check the Second choice is Answer or not?
                    isIn = this.findx(2, this.correctChoices);
                    if (isIn == true) { this.twoReal = true; console.log('the twoReal is: ' + this.twoReal); }
                    // Check the Third choice is Answer or not?
                    isIn = this.findx(3, this.correctChoices);
                    if (isIn == true) { this.threeReal = true; console.log('the threeReal is: ' + this.threeReal); }

                    // ******* get the Students Choices *******
                    // Check the Student Choose the First Choice or not?
                    isIn = false;
                    isIn = this.findx(1, this.studentChoices);
                    if (isIn == true) { this.stOne = true; console.log('the stOne is: ' + this.stOne); }
                    // Check the Student Choose the Second Choice or not?
                    isIn = this.findx(2, this.studentChoices);
                    if (isIn == true) { this.stTwo = true; console.log('the stTwo is: ' + this.stTwo); }
                    // Check the Student Choose the Third Choice or not?
                    isIn = this.findx(3, this.studentChoices);
                    if (isIn == true) { this.stThree = true; console.log('the stThree is: ' + this.stThree); }

                    // ******* Evaluation Process *******
                    // evaluate the First Choice
                    if (this.oneReal == true) {
                      if (this.stOne == true) {
                        this.oneColor = '#6BC357';
                      } else {
                        this.oneColor = 'yellow';
                      }
                    } else {
                      if (this.stOne == true) {
                        this.oneColor = '#F3534B';
                      } else {
                        this.oneColor = '#b9d6da';
                      }
                    }
                    // evaluate the Second Choice
                    if (this.twoReal == true) {
                      if (this.stTwo == true) {
                        this.twoColor = '#6BC357';
                      } else {
                        this.twoColor = 'yellow';
                      }
                    } else {
                      if (this.stTwo == true) {
                        this.twoColor = '#F3534B';
                      } else {
                        this.twoColor = '#b9d6da';
                      }
                    }
                    // evaluate the Third Choice
                    if (this.threeReal == true) {
                      if (this.stThree == true) {
                        this.threeColor = '#6BC357';
                      } else {
                        this.threeColor = 'yellow';
                      }
                    } else {
                      if (this.stThree == true) {
                        this.threeColor = '#F3534B';
                      } else {
                        this.threeColor = '#b9d6da';
                      }
                    }
                  }
                });
              });
            });
          } else if (this.fromWhere == 'homework') {
            // get the Student Homework ID
            this.storage.get(STUDENTHOMEWORKID).then(resultstExamID => {
              this.stExamID = resultstExamID;
              console.log('the stHomeworkID is: ' + this.stExamID);

              // get the question
              this.network.getQuestionByID(this.QID).then(data => {
                const jsonArray = data;
                this.question = jsonArray[0];
                console.log('the question: ' + JSON.stringify(this.question));
              });

              // get the question' Answer
              this.network.getSelectiveQuestionAnswersByID(this.QID).then(Answerdata => {
                const jsonArray2 = Answerdata;
                this.answer = jsonArray2[0];
                console.log('the Questions Answer: ' + JSON.stringify(this.answer));

                // get the Correct Choices
                let x = this.answer.RightAnswers;
                this.correctChoices = x.split(',');
                console.log('the correctChoices: ' + this.correctChoices);

                this.isMulti = this.answer.Multi;
                this.fstChoiceID = this.answer.FirstChoice;
                this.secChoiceID = this.answer.SecChoice;
                this.trdChoiceID = this.answer.ThirdChoice;

                console.log('Selection State: ' + this.isMulti);
                console.log('the fstChoiceID: ' + this.fstChoiceID);
                console.log('the secChoiceID: ' + this.secChoiceID);
                console.log('the trdChoiceID: ' + this.trdChoiceID);

                if (this.fstChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.fstChoiceID).then(fstData => {
                    const jsonArray3 = fstData;
                    this.fstChoice = jsonArray3[0];
                    this.fstChoiceImg = this.network.mainUploadImgUrl + this.fstChoice.Image;
                    console.log('the fstChoice Data: ' + JSON.stringify(this.fstChoice));
                  });
                }

                if (this.secChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.secChoiceID).then(secData => {
                    const jsonArray4 = secData;
                    this.secChoice = jsonArray4[0];
                    this.secChoiceImg = this.network.mainUploadImgUrl + this.secChoice.Image;
                    console.log('the secChoice Data: ' + this.secChoice);
                  });
                }

                if (this.trdChoiceID != null) {
                  this.network.getSelectionChoicesByID(this.trdChoiceID).then(trdData => {
                    const jsonArray5 = trdData;
                    this.trdChoice = jsonArray5[0];
                    this.trdChoiceImg = this.network.mainUploadImgUrl + this.trdChoice.Image;
                    console.log('the trdChoice Data: ' + this.trdChoice);
                  });
                }

                // get the Student Answer
                this.network.getStudentSelectiveAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray6 = stAnswerData;
                  this.studentAnswer = jsonArray6[0];
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

                    let y = this.studentAnswer.StudentChoices;
                    this.studentChoices = y.split(',');

                    // ******* Determine the Correct Choices *******
                    let isIn = false;
                    // Check the First choice is Answer or not?
                    isIn = this.findx(1, this.correctChoices);
                    if (isIn == true) { this.oneReal = true; console.log('the oneReal is: ' + this.oneReal); }
                    // Check the Second choice is Answer or not?
                    isIn = this.findx(2, this.correctChoices);
                    if (isIn == true) { this.twoReal = true; console.log('the twoReal is: ' + this.twoReal); }
                    // Check the Third choice is Answer or not?
                    isIn = this.findx(3, this.correctChoices);
                    if (isIn == true) { this.threeReal = true; console.log('the threeReal is: ' + this.threeReal); }

                    // ******* get the Students Choices *******
                    // Check the Student Choose the First Choice or not?
                    isIn = false;
                    isIn = this.findx(1, this.studentChoices);
                    if (isIn == true) { this.stOne = true; console.log('the stOne is: ' + this.stOne); }
                    // Check the Student Choose the Second Choice or not?
                    isIn = this.findx(2, this.studentChoices);
                    if (isIn == true) { this.stTwo = true; console.log('the stTwo is: ' + this.stTwo); }
                    // Check the Student Choose the Third Choice or not?
                    isIn = this.findx(3, this.studentChoices);
                    if (isIn == true) { this.stThree = true; console.log('the stThree is: ' + this.stThree); }

                    // ******* Evaluation Process *******
                    // evaluate the First Choice
                    if (this.oneReal == true) {
                      if (this.stOne == true) {
                        this.oneColor = '#6BC357';
                      } else {
                        this.oneColor = 'yellow';
                      }
                    } else {
                      if (this.stOne == true) {
                        this.oneColor = '#F3534B';
                      } else {
                        this.oneColor = '#b9d6da';
                      }
                    }
                    // evaluate the Second Choice
                    if (this.twoReal == true) {
                      if (this.stTwo == true) {
                        this.twoColor = '#6BC357';
                      } else {
                        this.twoColor = 'yellow';
                      }
                    } else {
                      if (this.stTwo == true) {
                        this.twoColor = '#F3534B';
                      } else {
                        this.twoColor = '#b9d6da';
                      }
                    }
                    // evaluate the Third Choice
                    if (this.threeReal == true) {
                      if (this.stThree == true) {
                        this.threeColor = '#6BC357';
                      } else {
                        this.threeColor = 'yellow';
                      }
                    } else {
                      if (this.stThree == true) {
                        this.threeColor = '#F3534B';
                      } else {
                        this.threeColor = '#b9d6da';
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

  findx(x, collection) {
    let found = false;
    for (let i = 0; i < collection.length; i++) {
      if (x == collection[i]) {
        found = true;
      }
    }
    return found;
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
