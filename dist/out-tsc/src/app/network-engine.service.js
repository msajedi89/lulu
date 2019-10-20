import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var NetworkEngineService = /** @class */ (function () {
    function NetworkEngineService(http) {
        this.http = http;
        this.mainUrl = "http://luluwa.me/";
        this.mainUploadImgUrl = "http://luluwa.me/images/QuestionImages/";
        this.mainUploadImgAPI = "http://luluwa.me/upload.php";
        this.mainUploadStudentsDrawingAPI = "http://luluwa.me/uploadStudentDrawing.php";
        this.mainStudentsDrawingURL = "http://luluwa.me/images/StudentsDrawing/";
        this.mainUploadVoiceAPI = "http://luluwa.me/uploadaudio.php";
        this.mainStudentsProfileImgUrl = "http://luluwa.me/images/StudentsProfileImg/";
        this.MainUploadStudentsVoiceAPI = "http://luluwa.me/uploadStudentsVoice.php";
        this.mainStudentsVoiceUrl = "http://luluwa.me/audios/StudentVoices/";
        this.mainQuestionVoicesUrl = "http://luluwa.me/audios/QuestionVoice/";
        this.mainTeacherProfileImgURL = "http://luluwa.me/images/TeacherProfileImg/";
        this.mainUploadStudentProfileImgAPI = "http://luluwa.me/uploadStudentProfileImg.php";
        this.mainUploadTeacherProfileImgAPI = "http://luluwa.me/uploadTeacherProfileImg.php";
        console.log('Hello NetworkEngineProvider Provider');
    }
    NetworkEngineService.prototype.readTable = function (userNameParam, userPassParam, whoIsParam) {
        var url = this.mainUrl + 'login.php';
        var param = { username: userNameParam, userpass: userPassParam, whoIs: whoIsParam };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    NetworkEngineService.prototype.get100LatestQuestions = function () {
        var url = this.mainUrl + "get100latestquestions.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    // get the list of all Main Titles
    NetworkEngineService.prototype.getMainTitles = function () {
        var url = this.mainUrl + "getMainTitles.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    // get the Sub Title of requested Main Title
    NetworkEngineService.prototype.getSubTitles = function (maintitleparam) {
        var url = this.mainUrl + "getSubTitles.php";
        var param = { maintitle: maintitleparam };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get the list of all Selection Choices
    NetworkEngineService.prototype.getSelectionChoices = function () {
        var url = this.mainUrl + "getSelectionChoices.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    NetworkEngineService.prototype.insertImage = function (image, imageName) {
        var url = this.mainUrl + "insertImage.php";
        var param = { image: image, imageName: imageName };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Voice in tbl_Voices.
    NetworkEngineService.prototype.insertVoice = function (voice, voiceNameEn, voiceNameAr) {
        var url = this.mainUrl + "insertVoice.php";
        var param = { voice: voice, voiceName: voiceNameEn, voiceNameAr: voiceNameAr };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Selection Choices.
    NetworkEngineService.prototype.insertSelectionCoice = function (nameEn, nameAr, nameAz, imageID, voiceID) {
        var url = this.mainUrl + "insertSelectionChoice.php";
        var param = { nameEn: nameEn, nameAr: nameAr, nameAz: nameAz, imageID: imageID, voiceID: voiceID };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Selection Type Questions
    NetworkEngineService.prototype.insertQuestion = function (name, mainTitle, subTitle, maxTime, question, questionAr, questionAz, questionVoiceID, questionImgID, description, descriptionAr, type) {
        var url = this.mainUrl + "insertQuestion.php";
        var param = {
            name: name, mainTitle: mainTitle, subTitle: subTitle, maxTime: maxTime, question: question, questionAr: questionAr,
            questionAz: questionAz, questionVoiceID: questionVoiceID, questionImgID: questionImgID, description: description,
            descriptionAr: descriptionAr, type: type
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Selection Answers
    NetworkEngineService.prototype.insertSelectionAnswer = function (QID, multi, fstChoiceID, secChoiceID, trdChoiceID, correctAnswers) {
        var url = this.mainUrl + "insertSelectionAnswersType.php";
        var param = {
            QID: QID, multi: multi, fstChoiceID: fstChoiceID, secChoiceID: secChoiceID, trdChoiceID: trdChoiceID,
            correctAnswers: correctAnswers
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Drag & Drop Answers Type
    NetworkEngineService.prototype.insertDragDropAnswersType = function (QID, fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr, secChoiceAz, trdChoiceEn, trdChoiceAr, trdChoiceAz, fstChoiceImgID, secChoiceImgID, trdChoiceImgID) {
        var url = this.mainUrl + "insertDragDropAnswersType.php";
        var param = {
            QID: QID, fstChoiceEn: fstChoiceEn, fstChoiceAr: fstChoiceAr, fstChoiceAz: fstChoiceAz, secChoiceEn: secChoiceEn,
            secChoiceAr: secChoiceAr, secChoiceAz: secChoiceAz, trdChoiceEn: trdChoiceEn, trdChoiceAr: trdChoiceAr, trdChoiceAz: trdChoiceAz,
            fstChoiceImgID: fstChoiceImgID, secChoiceImgID: secChoiceImgID, trdChoiceImgID: trdChoiceImgID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Drag To Table Answers Type
    NetworkEngineService.prototype.insertDragToTableAnswersType = function (QID, tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz, tblOneTexts, tblTwoTexts) {
        var url = this.mainUrl + "insertDragToTableAnswersType.php";
        var param = {
            QID: QID, tblOneEn: tblOneEn, tblOneAr: tblOneAr, tblOneAz: tblOneAz, tblTwoEn: tblTwoEn,
            tblTwoAr: tblTwoAr, tblTwoAz: tblTwoAz, tblOneTexts: tblOneTexts, tblTwoTexts: tblTwoTexts
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get all Questions
    NetworkEngineService.prototype.getAllQuestions = function () {
        var url = this.mainUrl + "getAllQuestions.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    // get all Students
    NetworkEngineService.prototype.getAllStudents = function () {
        var url = this.mainUrl + "getAllStudents.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    // the method for inserting Exam
    NetworkEngineService.prototype.insertExam = function (name, subject, examDate, qListIDs, stListIDs) {
        var url = this.mainUrl + "insertExam.php";
        var param = {
            name: name, subject: subject, examDate: examDate, qListIDs: qListIDs, stListIDs: stListIDs
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Exam for EACH Selected Student
    NetworkEngineService.prototype.insertStudentExam = function (examID, stID) {
        var url = this.mainUrl + "insertStudentsExam.php";
        var param = {
            examID: examID, stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Homework
    NetworkEngineService.prototype.insertHomework = function (name, subject, homeworkDate, qListIDs, stListIDs) {
        var url = this.mainUrl + "insertHomework.php";
        var param = {
            name: name, subject: subject, homeworkDate: homeworkDate, qListIDs: qListIDs, stListIDs: stListIDs
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting homework for EACH selected Student
    NetworkEngineService.prototype.insertStudentHomework = function (homeworkID, stID) {
        var url = this.mainUrl + "insertStudentsHomework.php";
        var param = {
            homeworkID: homeworkID, stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get all Students
    NetworkEngineService.prototype.filterStudents = function (mySearch) {
        var url = this.mainUrl + "filterStudents.php";
        var param = {
            mySearch: mySearch
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student by ID
    NetworkEngineService.prototype.getStudentByID = function (stID) {
        var url = this.mainUrl + "getStudentByID.php";
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Exam list
    NetworkEngineService.prototype.getStudentsExamsList = function (stID) {
        var url = this.mainUrl + 'getStudentsExam.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Exam Questions list
    NetworkEngineService.prototype.getStudentExamQuestionList = function (stExamID) {
        var url = this.mainUrl + 'getStudentExamQuestion.php';
        var param = {
            stExamID: stExamID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Question by its ID
    NetworkEngineService.prototype.getQuestionByID = function (QID) {
        var url = this.mainUrl + "getQuestionByID.php";
        var param = {
            QID: QID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Question by its ID
    NetworkEngineService.prototype.getDragDropAnswerQuestionByID = function (QID) {
        var url = this.mainUrl + "getDragDropAnswerQuestionByID.php";
        var param = {
            QID: QID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Answer to drag & drop Questions
    NetworkEngineService.prototype.recordStudentDragDropAnswer = function (stExamID, stID, QID, dragOne, dragTwo, dragThree, whereTo) {
        var url = this.mainUrl + 'recordStudentDragDropAnswer.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, dragOne: dragOne, dragTwo: dragTwo, dragThree: dragThree, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get the Selective Answers of Selective Question by its ID
    NetworkEngineService.prototype.getSelectiveQuestionAnswersByID = function (QID) {
        var url = this.mainUrl + 'getSelectiveQuestionAnswersByID.php';
        var param = {
            QID: QID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Selection Choices of Selective Questions by its ID
    NetworkEngineService.prototype.getSelectionChoicesByID = function (SID) {
        var url = this.mainUrl + 'getSelectionChoicesByID.php';
        var param = {
            SID: SID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Answer to Selective Questions
    NetworkEngineService.prototype.recordStudentSelectiveAnswer = function (stExamID, stID, QID, studentChoices, whereTo) {
        var url = this.mainUrl + 'recordStudentSelectiveAnswers.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, studentChoices: studentChoices, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get the Drag To Table Answers by its ID
    NetworkEngineService.prototype.getDragToTableAnswersByID = function (QID) {
        var url = this.mainUrl + 'getDragTableAnswerByID.php';
        var param = {
            QID: QID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Answer to Drag To Table Questions
    NetworkEngineService.prototype.recordStudentDragToTableAnswer = function (stExamID, stID, QID, stTableOne, stTableTwo, whereTo) {
        var url = this.mainUrl + 'recordStudentDragToTableAnswer.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, stTableOne: stTableOne, stTableTwo: stTableTwo, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Drawing Answer
    NetworkEngineService.prototype.recordStudentDrawingAnswer = function (stExamID, stID, QID, stDrawLetter, whereTo) {
        var url = this.mainUrl + 'recordStudentDrawingAnswer.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, stDrawLetter: stDrawLetter, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get an Image by its ID
    NetworkEngineService.prototype.getImageByID = function (ImgID) {
        var url = this.mainUrl + 'getImageByID.php';
        var param = {
            ImgID: ImgID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Descriptive Answer
    NetworkEngineService.prototype.recordStudentDescriptiveAnswer = function (stExamID, stID, QID, listenAnswer, listenVoice, whereTo) {
        var url = this.mainUrl + 'recordStudentDescriptiveAnswer.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, listenAnswer: listenAnswer, listenVoice: listenVoice, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // record the Student's Recitaion of Quran
    NetworkEngineService.prototype.recordStudentReciteQuran = function (stExamID, stID, QID, stQuran, whereTo) {
        var url = this.mainUrl + 'recordStudentReciteQuran.php';
        var param = {
            stExamID: stExamID, stID: stID, QID: QID, stQuran: stQuran, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Exam list for Student Side
    NetworkEngineService.prototype.getExamsList = function (stID) {
        var url = this.mainUrl + 'getExamsList.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Exam by ExamID
    NetworkEngineService.prototype.getExamByID = function (examID) {
        var url = this.mainUrl + 'getExamByID.php';
        var param = {
            examID: examID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get General Information of a Question By its ID
    NetworkEngineService.prototype.getQuestionGeneralInfoByID = function (QID) {
        var url = this.mainUrl + 'getQuestionGeneralInfoByID.php';
        var param = {
            QID: QID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Exam by stExamID
    NetworkEngineService.prototype.getStudentExamByID = function (stExamID) {
        var url = this.mainUrl + 'getStudentExamByID.php';
        var param = {
            stExamID: stExamID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // update the information of student's Exam
    NetworkEngineService.prototype.updateStudentExam = function (stExamID, hasSeen, hasDone, hasCompleted) {
        var url = this.mainUrl + 'updateStudentExam.php';
        var param = {
            stExamID: stExamID, hasSeen: hasSeen, hasDone: hasDone, hasCompleted: hasCompleted
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Homeworks list for Student Side
    NetworkEngineService.prototype.getHomeworksList = function (stID) {
        var url = this.mainUrl + 'getHomeworksList.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // update the information of student's Homework
    NetworkEngineService.prototype.updateStudentHomework = function (hwkID, hasSeen, hasDone, hasCompleted) {
        var url = this.mainUrl + 'updateStudentHomework.php';
        var param = {
            hwkID: hwkID, hasSeen: hasSeen, hasDone: hasDone, hasCompleted: hasCompleted
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Homework by stHomeworkID
    NetworkEngineService.prototype.getStudentHomeworkByID = function (stHomeworkID) {
        var url = this.mainUrl + 'getStudentHomeworkByID.php';
        var param = {
            stHomeworkID: stHomeworkID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's TAKEN Exam list for Student Side
    NetworkEngineService.prototype.getStudentTakenExamsList = function (stID) {
        var url = this.mainUrl + 'getStudentsTakenExamsList.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Selective Answer
    NetworkEngineService.prototype.getStudentSelectiveAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsSelectiveAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's TAKEN Homeworks list for Student Side
    NetworkEngineService.prototype.getStudentTakenHomeworksList = function (stID) {
        var url = this.mainUrl + 'getStudentTakenHomeworksList.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Drag To Table Answer
    NetworkEngineService.prototype.getStudentDragToTableAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsDragToTableAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Descriptive Answer
    NetworkEngineService.prototype.getStudentDescriptiveAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsDescriptiveAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Drawing Answer
    NetworkEngineService.prototype.getStudentDrawingAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsDrawingAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Recitation of Quran Answer
    NetworkEngineService.prototype.getStudentReciteQuranAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsReciteQuranAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Drag & Drop Answer
    NetworkEngineService.prototype.getStudentDragDropAnswer = function (stID, stExamID, QID, fromWhere) {
        var url = this.mainUrl + 'getStudentsDragDropAnswer.php';
        var param = {
            stID: stID, stExamID: stExamID, QID: QID, fromWhere: fromWhere
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Record an Score for Student Exam/Homework Questions
    NetworkEngineService.prototype.recordStudentScore = function (stExamQID, evaluationState, evaluation, whereTo) {
        var url = this.mainUrl + 'recordStudentScore.php';
        var param = {
            stExamQID: stExamQID, evaluationState: evaluationState, evaluation: evaluation, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Homeworks list
    NetworkEngineService.prototype.getStudentsHomeworksList = function (stID) {
        var url = this.mainUrl + 'getStudentsHomework.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Main Title By ID
    NetworkEngineService.prototype.getMainTitleByID = function (mtID) {
        var url = this.mainUrl + 'getMainTitleByID.php';
        var param = {
            mtID: mtID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Sub Title By ID
    NetworkEngineService.prototype.getSubTitleByID = function (subTID) {
        var url = this.mainUrl + 'getSubTitleByID.php';
        var param = {
            subTID: subTID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get 100 Questions Filter by Main Title & Sub Title for Lectern Questions Page
    NetworkEngineService.prototype.get100QuestionsFilterByTitle = function (mtID, subTID) {
        var url = this.mainUrl + 'get100QuestionsFilterByTitles.php';
        var param = {
            mtID: mtID, subTID: subTID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Teacher Info by its ID
    NetworkEngineService.prototype.getTeacherByID = function (teacherID) {
        var url = this.mainUrl + 'getTeacherByID.php';
        var param = {
            teacherID: teacherID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Filter Main Titles
    NetworkEngineService.prototype.filterMainTitles = function (mySearch) {
        var url = this.mainUrl + 'filterMainTitles.php';
        var param = {
            mySearch: mySearch
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Add or Edit Main Title
    NetworkEngineService.prototype.addOrEditMainTitle = function (mtID, mainTitle, status, addOrEdit) {
        var url = this.mainUrl + 'addOrEditMainTitle.php';
        var param = {
            mtID: mtID, mainTitle: mainTitle, status: status, addOrEdit: addOrEdit
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get the list of all Enable and Disable Main Titles for Managing
    NetworkEngineService.prototype.getAllMainTitles = function () {
        var url = this.mainUrl + 'getMainTitlesForManaging.php';
        var request = this.http.get(url);
        return request.toPromise();
    };
    // get the list of all Enable and Disable Sub Titles for Managing
    NetworkEngineService.prototype.getAllSubTitles = function () {
        var url = this.mainUrl + 'getSubTitlesForManaging.php';
        var request = this.http.get(url);
        return request.toPromise();
    };
    // Filter Sub Titles
    NetworkEngineService.prototype.filterSubTitles = function (mySearch) {
        var url = this.mainUrl + 'filterSubTitles.php';
        var param = {
            mySearch: mySearch
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Sub Title By ID for Managing
    NetworkEngineService.prototype.getSubTitleByIDForManaging = function (subTID) {
        var url = this.mainUrl + 'getSubTitleByIDForManaging.php';
        var param = {
            subTID: subTID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Add or Edit Sub Title
    NetworkEngineService.prototype.addOrEditSubTitle = function (subTID, subTitle, subTitleOf, status, addOrEdit) {
        var url = this.mainUrl + 'addOrEditSubTitle.php';
        var param = {
            subTID: subTID, subTitle: subTitle, subTitleOf: subTitleOf, status: status, addOrEdit: addOrEdit
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get all Enabled & Disabled Students for Managing
    NetworkEngineService.prototype.getAllStudentsForManaging = function () {
        var url = this.mainUrl + 'getAllStudentsForManaging.php';
        var request = this.http.get(url);
        return request.toPromise();
    };
    // Filter Students for Managing
    NetworkEngineService.prototype.filterStudentsForManaging = function (mySearch) {
        var url = this.mainUrl + 'filterStudentsForManaging.php';
        var param = {
            mySearch: mySearch
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student by ID For Managing
    NetworkEngineService.prototype.getStudentByIDForManaging = function (stID) {
        var url = this.mainUrl + 'getStudentByIDForManaging.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Add or Edit Student
    NetworkEngineService.prototype.addOrEditStudent = function (stID, nameFamily, username, pass, address, birthdate, status, profileImg, addOrEdit, parentID) {
        var url = this.mainUrl + 'addOrEditStudent.php';
        var param = {
            stID: stID, nameFamily: nameFamily, username: username, pass: pass, address: address, birthdate: birthdate, status: status,
            profileImg: profileImg, addOrEdit: addOrEdit, parentID: parentID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Edit Teacher Profile
    NetworkEngineService.prototype.EditTeacherProfile = function (teacherID, name, family, username, pass, address, phone, email, profileImg) {
        var url = this.mainUrl + 'editTeacherProfile.php';
        var param = {
            teacherID: teacherID, name: name, family: family, username: username, pass: pass, address: address, phone: phone,
            profileImg: profileImg, email: email
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Record a Mark for Student Exam/Homework
    NetworkEngineService.prototype.recordStudentMark = function (hwkID, mark, whereTo) {
        var url = this.mainUrl + 'recordStudentMark.php';
        var param = {
            hwkID: hwkID, mark: mark, whereTo: whereTo
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // the method for inserting Homeworks list
    NetworkEngineService.prototype.insertHomeworksList = function (name, homeworks, homeworkDate, studentID) {
        var url = this.mainUrl + 'insertHomeworksList.php';
        var param = {
            name: name, homeworks: homeworks, homeworkDate: homeworkDate, studentID: studentID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Homeworks list for parents to see their children's homeworks
    NetworkEngineService.prototype.getStudentHomeworks = function (stID) {
        var url = this.mainUrl + 'getHomeworksListNEW.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Update the HasSeen field of Homeworks List
    NetworkEngineService.prototype.updateHasSeenHomework = function (homeID) {
        var url = this.mainUrl + 'updateHomeworkSeen.php';
        var param = {
            homeID: homeID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Homeworks list By HomeID
    NetworkEngineService.prototype.getHomeworkListByID = function (homeID) {
        var url = this.mainUrl + 'getHomeworkListByID.php';
        var param = {
            homeID: homeID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student's Exam Progress report
    NetworkEngineService.prototype.reportStudentExamProgress = function (stID) {
        var url = this.mainUrl + 'reportStudentExamProgress.php';
        var param = {
            stID: stID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student Username for checking in register page
    NetworkEngineService.prototype.getStudentByUsername = function (stUsername) {
        var url = this.mainUrl + 'getStudentByUsername.php';
        var param = {
            stUsername: stUsername
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get all Parents
    NetworkEngineService.prototype.getAllParents = function () {
        var url = this.mainUrl + "getAllParents.php";
        var request = this.http.get(url);
        return request.toPromise();
    };
    // get Parent Username for checking in Signup page
    NetworkEngineService.prototype.getParentByUsername = function (ptUsername) {
        var url = this.mainUrl + 'getParentByUsername.php';
        var param = {
            ptUsername: ptUsername
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // Add or Edit Parent
    NetworkEngineService.prototype.addOrEditParent = function (parentID, nameFamily, username, pass, address, phone, status, addOrEdit) {
        var url = this.mainUrl + 'addOrEditParent.php';
        var param = {
            parentID: parentID, nameFamily: nameFamily, username: username, pass: pass, address: address, phone: phone, status: status,
            addOrEdit: addOrEdit
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    // get Student by ParentID
    NetworkEngineService.prototype.getStudentByParentID = function (parentID) {
        var url = this.mainUrl + "getStudentByParentID.php";
        var param = {
            parentID: parentID
        };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    NetworkEngineService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], NetworkEngineService);
    return NetworkEngineService;
}());
export { NetworkEngineService };
//# sourceMappingURL=network-engine.service.js.map