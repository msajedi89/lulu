import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkEngineService {

  mainUrl = "http://luluwa.me/";
  mainUploadImgUrl = "http://luluwa.me/images/QuestionImages/";
  mainUploadImgAPI = "http://luluwa.me/upload.php";
  mainUploadStudentsDrawingAPI = "http://luluwa.me/uploadStudentDrawing.php";
  mainStudentsDrawingURL = "http://luluwa.me/images/StudentsDrawing/";
  mainUploadVoiceAPI = "http://luluwa.me/uploadaudio.php";
  mainStudentsProfileImgUrl = "http://luluwa.me/images/StudentsProfileImg/";
  MainUploadStudentsVoiceAPI = "http://luluwa.me/uploadStudentsVoice.php";
  mainStudentsVoiceUrl = "http://luluwa.me/audios/StudentVoices/";
  mainQuestionVoicesUrl = "http://luluwa.me/audios/QuestionVoice/";
  mainTeacherProfileImgURL = "http://luluwa.me/images/TeacherProfileImg/";
  mainUploadStudentProfileImgAPI = "http://luluwa.me/uploadStudentProfileImg.php";
  mainUploadTeacherProfileImgAPI = "http://luluwa.me/uploadTeacherProfileImg.php";

  constructor(public http: HttpClient) {
    console.log('Hello NetworkEngineProvider Provider');
  }

  readTable(userNameParam, userPassParam, whoIsParam): Promise<any> {
    const url = this.mainUrl + 'login.php';

    const param = { username: userNameParam, userpass: userPassParam, whoIs: whoIsParam };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  get100LatestQuestions(): Promise<any> {
    let url = this.mainUrl + "get100latestquestions.php";

    let request = this.http.get(url);

    return request.toPromise();
  }

  // get the list of all Main Titles
  getMainTitles(): Promise<any> {
    let url = this.mainUrl + "getMainTitles.php";

    let request = this.http.get(url);

    return request.toPromise();
  }

  // get the Sub Title of requested Main Title
  getSubTitles(maintitleparam): Promise<any> {
    let url = this.mainUrl + "getSubTitles.php";

    let param = { maintitle: maintitleparam };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get the list of all Selection Choices
  getSelectionChoices(): Promise<any> {
    let url = this.mainUrl + "getSelectionChoices.php";

    let request = this.http.get(url);

    return request.toPromise();
  }

  insertImage(image, imageName): Promise<any> {
    let url = this.mainUrl + "insertImage.php";

    let param = { image: image, imageName: imageName };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Voice in tbl_Voices.
  insertVoice(voice, voiceNameEn, voiceNameAr): Promise<any> {
    let url = this.mainUrl + "insertVoice.php";

    let param = { voice: voice, voiceName: voiceNameEn, voiceNameAr: voiceNameAr };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Selection Choices.
  insertSelectionCoice(nameEn, nameAr, nameAz, imageID, voiceID): Promise<any> {
    let url = this.mainUrl + "insertSelectionChoice.php";

    let param = { nameEn: nameEn, nameAr: nameAr, nameAz: nameAz, imageID: imageID, voiceID: voiceID };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Selection Type Questions
  insertQuestion(name, mainTitle, subTitle, maxTime, question, questionAr, questionAz, questionVoiceID,
    questionImgID, description, descriptionAr, type): Promise<any> {
    let url = this.mainUrl + "insertQuestion.php";

    let param = {
      name: name, mainTitle: mainTitle, subTitle: subTitle, maxTime: maxTime, question: question, questionAr: questionAr,
      questionAz: questionAz, questionVoiceID: questionVoiceID, questionImgID: questionImgID, description: description,
      descriptionAr: descriptionAr, type: type
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Selection Answers
  insertSelectionAnswer(QID, multi, fstChoiceID, secChoiceID, trdChoiceID, correctAnswers): Promise<any> {
    let url = this.mainUrl + "insertSelectionAnswersType.php";

    let param = {
      QID: QID, multi: multi, fstChoiceID: fstChoiceID, secChoiceID: secChoiceID, trdChoiceID: trdChoiceID,
      correctAnswers: correctAnswers
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Drag & Drop Answers Type
  insertDragDropAnswersType(QID, fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr, secChoiceAz, trdChoiceEn, trdChoiceAr,
    trdChoiceAz, fstChoiceImgID, secChoiceImgID, trdChoiceImgID): Promise<any> {

    let url = this.mainUrl + "insertDragDropAnswersType.php";

    let param = {
      QID: QID, fstChoiceEn: fstChoiceEn, fstChoiceAr: fstChoiceAr, fstChoiceAz: fstChoiceAz, secChoiceEn: secChoiceEn,
      secChoiceAr: secChoiceAr, secChoiceAz: secChoiceAz, trdChoiceEn: trdChoiceEn, trdChoiceAr: trdChoiceAr, trdChoiceAz: trdChoiceAz,
      fstChoiceImgID: fstChoiceImgID, secChoiceImgID: secChoiceImgID, trdChoiceImgID: trdChoiceImgID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Drag To Table Answers Type
  insertDragToTableAnswersType(QID, tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz, tblOneTexts, tblTwoTexts): Promise<any> {

    let url = this.mainUrl + "insertDragToTableAnswersType.php";

    let param = {
      QID: QID, tblOneEn: tblOneEn, tblOneAr: tblOneAr, tblOneAz: tblOneAz, tblTwoEn: tblTwoEn,
      tblTwoAr: tblTwoAr, tblTwoAz: tblTwoAz, tblOneTexts: tblOneTexts, tblTwoTexts: tblTwoTexts
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get all Questions
  getAllQuestions(): Promise<any> {
    let url = this.mainUrl + "getAllQuestions.php";

    let request = this.http.get(url);

    return request.toPromise();
  }

  // get all Students
  getAllStudents(): Promise<any> {
    let url = this.mainUrl + "getAllStudents.php";

    let request = this.http.get(url);

    return request.toPromise();
  }


  // the method for inserting Exam
  insertExam(name, subject, examDate, qListIDs, stListIDs): Promise<any> {

    let url = this.mainUrl + "insertExam.php";

    let param = {
      name: name, subject: subject, examDate: examDate, qListIDs: qListIDs, stListIDs: stListIDs
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting Exam for EACH Selected Student
  insertStudentExam(examID, stID): Promise<any> {

    let url = this.mainUrl + "insertStudentsExam.php";

    let param = {
      examID: examID, stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }


  // the method for inserting Homework
  insertHomework(name, subject, homeworkDate, qListIDs, stListIDs): Promise<any> {

    let url = this.mainUrl + "insertHomework.php";

    let param = {
      name: name, subject: subject, homeworkDate: homeworkDate, qListIDs: qListIDs, stListIDs: stListIDs
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // the method for inserting homework for EACH selected Student
  insertStudentHomework(homeworkID, stID): Promise<any> {

    let url = this.mainUrl + "insertStudentsHomework.php";

    let param = {
      homeworkID: homeworkID, stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get all Students
  filterStudents(mySearch): Promise<any> {
    let url = this.mainUrl + "filterStudents.php";

    let param = {
      mySearch: mySearch
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student by ID
  getStudentByID(stID): Promise<any> {
    let url = this.mainUrl + "getStudentByID.php";

    let param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's Exam list
  getStudentsExamsList(stID): Promise<any> {
    let url = this.mainUrl + 'getStudentsExam.php';

    let param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's Exam Questions list
  getStudentExamQuestionList(stExamID): Promise<any> {
    let url = this.mainUrl + 'getStudentExamQuestion.php';

    let param = {
      stExamID: stExamID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Question by its ID
  getQuestionByID(QID): Promise<any> {
    let url = this.mainUrl + "getQuestionByID.php";

    let param = {
      QID: QID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Question by its ID
  getDragDropAnswerQuestionByID(QID): Promise<any> {
    let url = this.mainUrl + "getDragDropAnswerQuestionByID.php";

    let param = {
      QID: QID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Answer to drag & drop Questions
  recordStudentDragDropAnswer(stExamID, stID, QID, dragOne, dragTwo, dragThree, whereTo): Promise<any> {
    let url = this.mainUrl + 'recordStudentDragDropAnswer.php';

    let param = {
      stExamID: stExamID, stID: stID, QID: QID, dragOne: dragOne, dragTwo: dragTwo, dragThree: dragThree, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get the Selective Answers of Selective Question by its ID
  getSelectiveQuestionAnswersByID(QID): Promise<any> {
    const url = this.mainUrl + 'getSelectiveQuestionAnswersByID.php';

    const param = {
      QID: QID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Selection Choices of Selective Questions by its ID
  getSelectionChoicesByID(SID): Promise<any> {
    const url = this.mainUrl + 'getSelectionChoicesByID.php';

    const param = {
      SID: SID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Answer to Selective Questions
  recordStudentSelectiveAnswer(stExamID, stID, QID, studentChoices, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentSelectiveAnswers.php';

    const param = {
      stExamID: stExamID, stID: stID, QID: QID, studentChoices: studentChoices, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get the Drag To Table Answers by its ID
  getDragToTableAnswersByID(QID): Promise<any> {
    const url = this.mainUrl + 'getDragTableAnswerByID.php';

    const param = {
      QID: QID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Answer to Drag To Table Questions
  recordStudentDragToTableAnswer(stExamID, stID, QID, stTableOne, stTableTwo, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentDragToTableAnswer.php';

    const param = {
      stExamID: stExamID, stID: stID, QID: QID, stTableOne: stTableOne, stTableTwo: stTableTwo, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Drawing Answer
  recordStudentDrawingAnswer(stExamID, stID, QID, stDrawLetter, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentDrawingAnswer.php';

    const param = {
      stExamID: stExamID, stID: stID, QID: QID, stDrawLetter: stDrawLetter, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get an Image by its ID
  getImageByID(ImgID): Promise<any> {
    const url = this.mainUrl + 'getImageByID.php';

    const param = {
      ImgID: ImgID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Descriptive Answer
  recordStudentDescriptiveAnswer(stExamID, stID, QID, listenAnswer, listenVoice, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentDescriptiveAnswer.php';

    const param = {
      stExamID: stExamID, stID: stID, QID: QID, listenAnswer: listenAnswer, listenVoice: listenVoice, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // record the Student's Recitaion of Quran
  recordStudentReciteQuran(stExamID, stID, QID, stQuran, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentReciteQuran.php';

    const param = {
      stExamID: stExamID, stID: stID, QID: QID, stQuran: stQuran, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's Exam list for Student Side
  getExamsList(stID): Promise<any> {
    const url = this.mainUrl + 'getExamsList.php';

    const param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Exam by ExamID
  getExamByID(examID): Promise<any> {
    const url = this.mainUrl + 'getExamByID.php';

    const param = {
      examID: examID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get General Information of a Question By its ID
  getQuestionGeneralInfoByID(QID): Promise<any> {
    const url = this.mainUrl + 'getQuestionGeneralInfoByID.php';

    const param = {
      QID: QID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Exam by stExamID
  getStudentExamByID(stExamID): Promise<any> {
    const url = this.mainUrl + 'getStudentExamByID.php';

    const param = {
      stExamID: stExamID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // update the information of student's Exam
  updateStudentExam(stExamID, hasSeen, hasDone, hasCompleted): Promise<any> {
    const url = this.mainUrl + 'updateStudentExam.php';

    const param = {
      stExamID: stExamID, hasSeen: hasSeen, hasDone: hasDone, hasCompleted: hasCompleted
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's Homeworks list for Student Side
  getHomeworksList(stID): Promise<any> {
    const url = this.mainUrl + 'getHomeworksList.php';

    const param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // update the information of student's Homework
  updateStudentHomework(hwkID, hasSeen, hasDone, hasCompleted): Promise<any> {
    const url = this.mainUrl + 'updateStudentHomework.php';

    const param = {
      hwkID: hwkID, hasSeen: hasSeen, hasDone: hasDone, hasCompleted: hasCompleted
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Homework by stHomeworkID
  getStudentHomeworkByID(stHomeworkID): Promise<any> {
    const url = this.mainUrl + 'getStudentHomeworkByID.php';

    const param = {
      stHomeworkID: stHomeworkID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's TAKEN Exam list for Student Side
  getStudentTakenExamsList(stID): Promise<any> {
    const url = this.mainUrl + 'getStudentsTakenExamsList.php';

    const param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Selective Answer
  getStudentSelectiveAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsSelectiveAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's TAKEN Homeworks list for Student Side
  getStudentTakenHomeworksList(stID): Promise<any> {
    const url = this.mainUrl + 'getStudentTakenHomeworksList.php';

    const param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Drag To Table Answer
  getStudentDragToTableAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsDragToTableAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Descriptive Answer
  getStudentDescriptiveAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsDescriptiveAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Drawing Answer
  getStudentDrawingAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsDrawingAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Recitation of Quran Answer
  getStudentReciteQuranAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsReciteQuranAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student Drag & Drop Answer
  getStudentDragDropAnswer(stID, stExamID, QID, fromWhere): Promise<any> {
    const url = this.mainUrl + 'getStudentsDragDropAnswer.php';

    const param = {
      stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Record an Score for Student Exam/Homework Questions
  recordStudentScore(stExamQID, evaluationState, evaluation, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentScore.php';

    const param = {
      stExamQID: stExamQID, evaluationState: evaluationState, evaluation: evaluation, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student's Homeworks list
  getStudentsHomeworksList(stID): Promise<any> {
    let url = this.mainUrl + 'getStudentsHomework.php';

    let param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Main Title By ID
  getMainTitleByID(mtID): Promise<any> {
    let url = this.mainUrl + 'getMainTitleByID.php';

    let param = {
      mtID: mtID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Sub Title By ID
  getSubTitleByID(subTID): Promise<any> {
    let url = this.mainUrl + 'getSubTitleByID.php';

    let param = {
      subTID: subTID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get 100 Questions Filter by Main Title & Sub Title for Lectern Questions Page
  get100QuestionsFilterByTitle(mtID, subTID): Promise<any> {
    let url = this.mainUrl + 'get100QuestionsFilterByTitles.php';

    let param = {
      mtID: mtID, subTID: subTID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Teacher Info by its ID
  getTeacherByID(teacherID): Promise<any> {
    const url = this.mainUrl + 'getTeacherByID.php';

    let param = {
      teacherID: teacherID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Filter Main Titles
  filterMainTitles(mySearch): Promise<any> {
    const url = this.mainUrl + 'filterMainTitles.php';

    const param = {
      mySearch: mySearch
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Add or Edit Main Title
  addOrEditMainTitle(mtID, mainTitle, status, addOrEdit): Promise<any> {
    const url = this.mainUrl + 'addOrEditMainTitle.php';

    const param = {
      mtID: mtID, mainTitle: mainTitle, status: status, addOrEdit: addOrEdit
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get the list of all Enable and Disable Main Titles for Managing
  getAllMainTitles(): Promise<any> {
    const url = this.mainUrl + 'getMainTitlesForManaging.php';

    let request = this.http.get(url);

    return request.toPromise();
  }

  // get the list of all Enable and Disable Sub Titles for Managing
  getAllSubTitles(): Promise<any> {
    const url = this.mainUrl + 'getSubTitlesForManaging.php';

    let request = this.http.get(url);

    return request.toPromise();
  }

  // Filter Sub Titles
  filterSubTitles(mySearch): Promise<any> {
    const url = this.mainUrl + 'filterSubTitles.php';

    const param = {
      mySearch: mySearch
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Sub Title By ID for Managing
  getSubTitleByIDForManaging(subTID): Promise<any> {
    const url = this.mainUrl + 'getSubTitleByIDForManaging.php';

    const param = {
      subTID: subTID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Add or Edit Sub Title
  addOrEditSubTitle(subTID, subTitle, subTitleOf, status, addOrEdit): Promise<any> {
    const url = this.mainUrl + 'addOrEditSubTitle.php';

    const param = {
      subTID: subTID, subTitle: subTitle, subTitleOf: subTitleOf, status: status, addOrEdit: addOrEdit
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get all Enabled & Disabled Students for Managing
  getAllStudentsForManaging(): Promise<any> {
    const url = this.mainUrl + 'getAllStudentsForManaging.php';

    let request = this.http.get(url);

    return request.toPromise();
  }

  // Filter Students for Managing
  filterStudentsForManaging(mySearch): Promise<any> {
    const url = this.mainUrl + 'filterStudentsForManaging.php';

    const param = {
      mySearch: mySearch
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // get Student by ID For Managing
  getStudentByIDForManaging(stID): Promise<any> {
    const url = this.mainUrl + 'getStudentByIDForManaging.php';

    const param = {
      stID: stID
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Add or Edit Student
  addOrEditStudent(stID, nameFamily, username, pass, address, birthdate, status, profileImg, addOrEdit): Promise<any> {
    const url = this.mainUrl + 'addOrEditStudent.php';

    const param = {
      stID: stID, nameFamily: nameFamily, username: username, pass: pass, address: address, birthdate: birthdate, status: status,
      profileImg: profileImg, addOrEdit: addOrEdit
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Edit Teacher Profile
  EditTeacherProfile(teacherID, name, family, username, pass, address, phone, email, profileImg): Promise<any> {
    const url = this.mainUrl + 'editTeacherProfile.php';

    const param = {
      teacherID: teacherID, name: name, family: family, username: username, pass: pass, address: address, phone: phone,
      profileImg: profileImg, email: email
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

  // Record a Mark for Student Exam/Homework
  recordStudentMark(hwkID, mark, whereTo): Promise<any> {
    const url = this.mainUrl + 'recordStudentMark.php';

    const param = {
      hwkID: hwkID, mark: mark, whereTo: whereTo
    };

    let request = this.http.post(url, param);

    return request.toPromise();
  }

}
