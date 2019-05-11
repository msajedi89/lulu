import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';

const QUESTIONID = 'questionid';
const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const ROOT = 'questionroot';
const STUDENTHOMEWORKID = 'homeworkid';

const WHOIS = 'whois';

@Component({
  selector: 'app-evaluationofdrawingquestions',
  templateUrl: './evaluationofdrawingquestions.page.html',
  styleUrls: ['./evaluationofdrawingquestions.page.scss'],
})
export class EvaluationofdrawingquestionsPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  image: any;
  studentAnswer: any = '';

  // the variable for Rooting
  fromWhere: any;

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
                console.log('the question is: ' + JSON.stringify(this.question));

                this.network.getStudentDrawingAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray2 = stAnswerData;
                  this.studentAnswer = jsonArray2[0];
                  console.log('the studentAnswer is: ' + JSON.stringify(this.studentAnswer));

                  if (this.studentAnswer == '0') {
                    alert('Student did not answer this Question');
                  } else {
                    // get the Student Exam/Homework Question ID
                    if (this.fromWhere == 'exam') {
                      this.stExamQuestionID = this.studentAnswer.eqID;
                    } else if (this.fromWhere == 'homework') {
                      this.stExamQuestionID = this.studentAnswer.hwkQID;
                    }

                    this.image = this.network.mainStudentsDrawingURL + this.studentAnswer.stDrawLetter;
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
                const jsonArray = data;
                this.question = jsonArray[0];
                console.log('the question is: ' + JSON.stringify(this.question));

                this.network.getStudentDrawingAnswer(this.stID, this.stExamID, this.QID, this.fromWhere).then(stAnswerData => {
                  const jsonArray2 = stAnswerData;
                  this.studentAnswer = jsonArray2[0];
                  console.log('the studentAnswer is: ' + JSON.stringify(this.studentAnswer));

                  if (this.studentAnswer == '0') {
                    alert('Student did not answer this Question');
                  } else {
                    // get the Student Exam/Homework Question ID
                    if (this.fromWhere == 'exam') {
                      this.stExamQuestionID = this.studentAnswer.eqID;
                    } else if (this.fromWhere == 'homework') {
                      this.stExamQuestionID = this.studentAnswer.hwkQID;
                    }

                    this.image = this.network.mainStudentsDrawingURL + this.studentAnswer.stDrawLetter;
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
    } else {
      if (this.fromWhere == 'exam') {
        this.router.navigate(['members', 'examevaluation']);
      } else {
        this.router.navigate(['members', 'homeworkevaluation']);
      }
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
