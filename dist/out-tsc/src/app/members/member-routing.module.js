import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
    { path: 'teacherdash', loadChildren: './teacherdash/teacherdash.module#TeacherdashPageModule' },
    { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
    { path: 'lecterns', loadChildren: './lecterns/lecterns.module#LecternsPageModule' },
    { path: 'selectiontypequestions', loadChildren: './selectiontypequestions/selectiontypequestions.module#SelectiontypequestionsPageModule' },
    { path: 'dragdroptypequestion', loadChildren: './dragdroptypequestion/dragdroptypequestion.module#DragdroptypequestionPageModule' },
    { path: 'dragtotabletypequestion', loadChildren: './dragtotabletypequestion/dragtotabletypequestion.module#DragtotabletypequestionPageModule' },
    { path: 'answertypequestions', loadChildren: './answertypequestions/answertypequestions.module#AnswertypequestionsPageModule' },
    { path: 'drawletterquestion', loadChildren: './drawletterquestion/drawletterquestion.module#DrawletterquestionPageModule' },
    { path: 'recitethequran', loadChildren: './recitethequran/recitethequran.module#RecitethequranPageModule' },
    { path: 'makingexam', loadChildren: './makingexam/makingexam.module#MakingexamPageModule' },
    { path: 'makinghomework', loadChildren: './makinghomework/makinghomework.module#MakinghomeworkPageModule' },
    { path: 'studentsexam', loadChildren: './studentsexam/studentsexam.module#StudentsexamPageModule' },
    { path: 'examevaluation', loadChildren: './examevaluation/examevaluation.module#ExamevaluationPageModule' },
    { path: 'studentsexamlist', loadChildren: './studentsexamlist/studentsexamlist.module#StudentsexamlistPageModule' },
    { path: 'studentdragdropquestion', loadChildren: './studentdragdropquestion/studentdragdropquestion.module#StudentdragdropquestionPageModule' },
    { path: 'studentsdragdrop', loadChildren: './studentsdragdrop/studentsdragdrop.module#StudentsdragdropPageModule' },
    { path: 'studentselectivequestions', loadChildren: './studentselectivequestions/studentselectivequestions.module#StudentselectivequestionsPageModule' },
    { path: 'studentsdragtotablequestion', loadChildren: './studentsdragtotablequestion/studentsdragtotablequestion.module#StudentsdragtotablequestionPageModule' },
    { path: 'studentdrawingquestion', loadChildren: './studentdrawingquestion/studentdrawingquestion.module#StudentdrawingquestionPageModule' },
    { path: 'studentdescriptivequestion', loadChildren: './studentdescriptivequestion/studentdescriptivequestion.module#StudentdescriptivequestionPageModule' },
    { path: 'studentrecitequran', loadChildren: './studentrecitequran/studentrecitequran.module#StudentrecitequranPageModule' },
    { path: 'listofstudentexams', loadChildren: './listofstudentexams/listofstudentexams.module#ListofstudentexamsPageModule' },
    { path: 'studentexamquestionslist', loadChildren: './studentexamquestionslist/studentexamquestionslist.module#StudentexamquestionslistPageModule' },
    { path: 'listofstudenthomeworks', loadChildren: './listofstudenthomeworks/listofstudenthomeworks.module#ListofstudenthomeworksPageModule' },
    { path: 'studenthomeworkquestionslist', loadChildren: './studenthomeworkquestionslist/studenthomeworkquestionslist.module#StudenthomeworkquestionslistPageModule' },
    { path: 'evaluationofselectivequestion', loadChildren: './evaluationofselectivequestion/evaluationofselectivequestion.module#EvaluationofselectivequestionPageModule' },
    { path: 'listofstudentstakenexam', loadChildren: './listofstudentstakenexam/listofstudentstakenexam.module#ListofstudentstakenexamPageModule' },
    { path: 'studenttakenexamquestionlist', loadChildren: './studenttakenexamquestionlist/studenttakenexamquestionlist.module#StudenttakenexamquestionlistPageModule' },
    { path: 'listofstudenttakenhomework', loadChildren: './listofstudenttakenhomework/listofstudenttakenhomework.module#ListofstudenttakenhomeworkPageModule' },
    { path: 'studenttakenhomeworkquestionlist', loadChildren: './studenttakenhomeworkquestionlist/studenttakenhomeworkquestionlist.module#StudenttakenhomeworkquestionlistPageModule' },
    { path: 'evaluationofdragtotablequestion', loadChildren: './evaluationofdragtotablequestion/evaluationofdragtotablequestion.module#EvaluationofdragtotablequestionPageModule' },
    { path: 'evaluationofdescriptivequestions', loadChildren: './evaluationofdescriptivequestions/evaluationofdescriptivequestions.module#EvaluationofdescriptivequestionsPageModule' },
    { path: 'evaluationofdrawingquestions', loadChildren: './evaluationofdrawingquestions/evaluationofdrawingquestions.module#EvaluationofdrawingquestionsPageModule' },
    { path: 'evaluationofrecitequranquestions', loadChildren: './evaluationofrecitequranquestions/evaluationofrecitequranquestions.module#EvaluationofrecitequranquestionsPageModule' },
    { path: 'evaluationofdragdropquestions', loadChildren: './evaluationofdragdropquestions/evaluationofdragdropquestions.module#EvaluationofdragdropquestionsPageModule' },
    { path: 'studentshomeworklist', loadChildren: './studentshomeworklist/studentshomeworklist.module#StudentshomeworklistPageModule' },
    { path: 'homeworkevaluation', loadChildren: './homeworkevaluation/homeworkevaluation.module#HomeworkevaluationPageModule' },
    { path: 'lecternmaintitlepage', loadChildren: './lecternmaintitlepage/lecternmaintitlepage.module#LecternmaintitlepagePageModule' },
    { path: 'lecternsubtitlepage', loadChildren: './lecternsubtitlepage/lecternsubtitlepage.module#LecternsubtitlepagePageModule' },
    { path: 'lecternquestionspage', loadChildren: './lecternquestionspage/lecternquestionspage.module#LecternquestionspagePageModule' },
    { path: 'lecternselectivequestion', loadChildren: './lecternselectivequestion/lecternselectivequestion.module#LecternselectivequestionPageModule' },
    { path: 'lecterndragdropquestion', loadChildren: './lecterndragdropquestion/lecterndragdropquestion.module#LecterndragdropquestionPageModule' },
    { path: 'lecterndragtablequestion', loadChildren: './lecterndragtablequestion/lecterndragtablequestion.module#LecterndragtablequestionPageModule' },
    { path: 'lecterndrawingquestion', loadChildren: './lecterndrawingquestion/lecterndrawingquestion.module#LecterndrawingquestionPageModule' },
    { path: 'lecterndescriptivequestion', loadChildren: './lecterndescriptivequestion/lecterndescriptivequestion.module#LecterndescriptivequestionPageModule' },
    { path: 'lecternrecitequranquestion', loadChildren: './lecternrecitequranquestion/lecternrecitequranquestion.module#LecternrecitequranquestionPageModule' },
    { path: 'managetitles', loadChildren: './managetitles/managetitles.module#ManagetitlesPageModule' },
    { path: 'managemaintitle', loadChildren: './managemaintitle/managemaintitle.module#ManagemaintitlePageModule' },
    { path: 'managesubtitle', loadChildren: './managesubtitle/managesubtitle.module#ManagesubtitlePageModule' },
    { path: 'editmaintitle', loadChildren: './editmaintitle/editmaintitle.module#EditmaintitlePageModule' },
    { path: 'editsubtitle', loadChildren: './editsubtitle/editsubtitle.module#EditsubtitlePageModule' },
    { path: 'managestudents', loadChildren: './managestudents/managestudents.module#ManagestudentsPageModule' },
    { path: 'edituser', loadChildren: './edituser/edituser.module#EdituserPageModule' },
    { path: 'editteacherprofile', loadChildren: './editteacherprofile/editteacherprofile.module#EditteacherprofilePageModule' },
    { path: 'homeworkslist', loadChildren: './homeworkslist/homeworkslist.module#HomeworkslistPageModule' },
    { path: 'studenthomeworks', loadChildren: './studenthomeworks/studenthomeworks.module#StudenthomeworksPageModule' },
    { path: 'studenthomeworkdetails', loadChildren: './studenthomeworkdetails/studenthomeworkdetails.module#StudenthomeworkdetailsPageModule' },
    { path: 'studentreports', loadChildren: './studentreports/studentreports.module#StudentreportsPageModule' },
    { path: 'reportexamprogress', loadChildren: './reportexamprogress/reportexamprogress.module#ReportexamprogressPageModule' }
];
var MemberRoutingModule = /** @class */ (function () {
    function MemberRoutingModule() {
    }
    MemberRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], MemberRoutingModule);
    return MemberRoutingModule;
}());
export { MemberRoutingModule };
//# sourceMappingURL=member-routing.module.js.map