import React from "react";


// Dashboard
import Dashboard from "../pages/Dashboard/index";



// import CustomFilterDemo from "pages/Tables/CustomFilterDemo";
import JobsAllactiveemp from "components/Jobs/JobsAllactiveemp";


//candidates
import AllActiveemp from "ATSComponents/Candidates/AllActiveemp";
import CandidateEditFrom from "components/Candidates/CandidateEditForm";
import CandidateEditFormExtra from "ATSComponents/Candidates/CandidateEditForm";
import AdminDashboard from "ATSComponents/Common/AdminDasboard";
import CandidatesMyActive from "ATSComponents/Candidates/CandidatesMyActive";
import CandidatesTaskList from "ATSComponents/Candidates/CandidatesTaskList";
import CandidatesAddedbyme from "ATSComponents/Candidates/CandidatesAdded";
import CandidatesOpened from "ATSComponents/Candidates/CandidatesOpened";
import CandidatesActivityLog from "ATSComponents/Candidates/CandidatesActivity";
import CandidatesArchived from "ATSComponents/Candidates/CandidatesArchived";
import CandidatesPool from "ATSComponents/Candidates/CandidatePool";
import CandidatesDuplicate from "ATSComponents/Candidates/CandidatesDuplicate";
import CreateCandidate from "ATSComponents/Candidates/CreateCandidate";
//contacts
import ContactsAllActive from "ATSComponents/Contacts/ContactsAllActive";
import ContactsMyActive from "ATSComponents/Contacts/ContactsMyActive";
import ContactsTaskList from "ATSComponents/Contacts/ContactsTaskList";
import ContactsActivity from "ATSComponents/Contacts/ContactsActivity";
import ContactsArchived from "ATSComponents/Contacts/ContactsArchived";
import ContactsDuplicate from "ATSComponents/Contacts/ContactsDuplicate";
import ContactEditForm from "ATSComponents/Contacts/ContactsEditForm";
import ImportResumeCan from "ATSComponents/Candidates/ImportResumeCan";

//companies
import CompaniesAllActive from "ATSComponents/Companies/CompaniesAllActive";
import CompaniesMyActive from "ATSComponents/Companies/CompaniesMyActive";
import CompaniesArchived from "ATSComponents/Companies/CompaniesArchived";
import CompaniesTaskList from "ATSComponents/Companies/CompaniesTaskList";
import CompaniesActivity from "ATSComponents/Companies/CompaniesActivity";
import CompaniesDuplicateList from "ATSComponents/Companies/CompaniesDuplicateList";
import CompanyEditForm from "ATSComponents/Companies/CompanyEditForm";

// jobs
import JobAllActive from "ATSComponents/JobsAts/JobAllActive";
import JobMyActive from "ATSComponents/JobsAts/JobMyActive";
import JobAddedByMe from "ATSComponents/JobsAts/JobAddedByMe";
import JobAssignedToMe from "ATSComponents/JobsAts/JobAssignedToMe";
import JobAllClosed from "ATSComponents/JobsAts/JobAllClosed";
import JobActivityLog from "ATSComponents/JobsAts/JobActivityLog";
import JobArchived from "ATSComponents/JobsAts/JobArchived";

import ActionItems from "ATSComponents/JobsAts/ActionItems";
import AllActiveCompanies from "ATSComponents/Companies/CompaniesAllActive";
import UploadResumeForm from "ATSComponents/Candidates/UploadResumeForm";
import JobsEditForm from "ATSComponents/JobsAts/JobsEditForm";

//reports
import ActiveJobSummary from "ATSComponents/Reports/ActiveJobSummary";
import RecruiterPerformanceReport from "ATSComponents/Reports/RecruiterPerformanceReport";
import MyPlacementReport from "ATSComponents/Reports/MyPlacementReport";
import LoginPage from "ATSComponents/login";
import SourcePerformanceReport from "ATSComponents/Reports/SourcePerformanceReport";
import CallReport from "ATSComponents/Reports/CallReport";
import PlacementReport from "ATSComponents/Reports/PlacementReport";
import TimeToHire from "ATSComponents/Reports/TimeToHire";
import MyPipelineReport from "ATSComponents/Reports/MyPipelineReport";

// calender
import CalenderActive from "ATSComponents/Calendar/CalenderActive";
import CalenderAll from "ATSComponents/Calendar/CalenderAll";

// common
import ImportBulkResume from "ATSComponents/Common/ImportResume";
import ImportFromCSV from "ATSComponents/Candidates/ImportfromcsvCandidates";
import ImportFromCSVCompanies from "ATSComponents/Companies/ImportfromcsvCompanies";
import ImportFromCSVContacts from "ATSComponents/Contacts/ImportfromcsvContacts";
import ImportFromCSVJobs from "ATSComponents/JobsAts/ImportfromcsvJobs";

// dashboard

import RecruiterDashboard from "ATSComponents/Dashboard/RecruiterDashboard";
import ManagerDashboard from "ATSComponents/Dashboard/ManagerDashboard";

// candidate pipeline
import TableView from "ATSComponents/CandidatePipeline/TableView";
import KanbanView from "ATSComponents/CandidatePipeline/KanbanView";

//  emials

import OutBox from "ATSComponents/Emails/OutBox";
import SentEmails from "ATSComponents/Emails/SentEmails";
// import CreateCandidate from "ATSComponents/Candidates/CreateCandidate";

//login 
// import LoginPage from "ATSComponents/login";

import EmailAC from "ATSComponents/Candidates/EmailAC";
import SubmitCandidatetoJob from "ATSComponents/Candidates/SubmitCandidatetoJob";
import TalentScan from "ATSComponents/Candidates/TalentScan";

// Time sheet

import TimeSheet from "ATSComponents/TimeSheet/TimeSheet";

// Employee 

import EmployeeAllActive from "ATSComponents/Employee/EmployeesAllActive";
import EmployeesMyActive from "ATSComponents/Employee/EmployeesMyActive";
import EmployeesTodoList from "ATSComponents/Employee/EmployeesTodoList";
import EmployeesAddedByMe from "ATSComponents/Employee/EmployeesAddedByMe";
import EmployeesOpened from "ATSComponents/Employee/EmployeesOpened";
import EmployeesArchived from "ATSComponents/Employee/EmployeesArchived";
import EmployeeEditFrom from "ATSComponents/Employee/EmployeeEditForm";


const userRoutes = [
  // Jobs
  { path: "/allactive-jobs", component: <JobAllActive /> },

  // Candidates

  { path: "/candidate-edit", component: <CandidateEditFrom /> },
  { path: "/candidate-editform", component: <CandidateEditFormExtra /> },
  { path: "/uploadresumeform", component: <UploadResumeForm /> },
  { path: "/admin-dashboard", component: <AdminDashboard /> },
  { path: "/myactive-candidates", component: <CandidatesMyActive /> },
  { path: "/candidates-tasklist", component: <CandidatesTaskList /> },
  { path: "/candidates-added", component: <CandidatesAddedbyme /> },
  { path: "/candidates-opened", component: <CandidatesOpened /> },
  { path: "/candidates-activity", component: <CandidatesActivityLog /> },
  { path: "/candidates-archived", component: <CandidatesArchived /> },
  { path: "/candidates-pool", component: <CandidatesPool /> },
  { path: "/candidates-duplicate", component: <CandidatesDuplicate /> },
  { path: "/create-candidate", component: <CreateCandidate /> },


  // contacts

  { path: "/contacts-allactive", component: <ContactsAllActive /> },
  { path: "/contacts-myactive", component: <ContactsMyActive /> },
  { path: "/contacts-tasklist", component: <ContactsTaskList /> },
  { path: "/contacts-activity", component: <ContactsActivity /> },
  { path: "/contacts-archived", component: <ContactsArchived /> },
  { path: "/contacts-duplicate", component: <ContactsDuplicate /> },
  { path: "/contacts-editform", component: <ContactEditForm /> },

  
  // companies

  { path: "/companies-allactive", component: <CompaniesAllActive /> },
  { path: "/companies-myactive", component: <CompaniesMyActive /> },
  { path: "/companies-archived", component: <CompaniesArchived /> },
  { path: "/companies-tasklist", component: <CompaniesTaskList /> },
  { path: "/companies-activity", component: <CompaniesActivity /> },
  { path: "/companies-duplicatelist", component: <CompaniesDuplicateList /> },
  { path: "/companies-editform", component: <CompanyEditForm /> },

  
  //jobs
  { path: "/allactive-jobs", component: <JobsAllactiveemp /> },
  { path: "/myactive-jobs", component: <JobMyActive /> },
  { path: "/addedbyme-jobs", component: <JobAddedByMe /> },
  { path: "/assignedtome-jobs", component: <JobAssignedToMe /> },
  { path: "/joballclosed-jobs", component: <JobAllClosed /> },
  { path: "/jobactivitylog-jobs", component: <JobActivityLog /> },
  { path: "/jobarchived-jobs", component: <JobArchived /> },
  { path: "/actionitems", component: <ActionItems /> },
  { path: "/jobs-editform", component: <JobsEditForm /> },
  { path: "/jobs-editform/:id", component: <JobsEditForm /> },
  { path: "/dashboard", component: <Dashboard /> },

  
  //reports
  { path: "/activejob-summary", component: <ActiveJobSummary /> },
  { path: "/recruiter-performance-report", component: <RecruiterPerformanceReport /> },
  { path: "/my-placement-report", component: <MyPlacementReport /> },
  { path: "/time-to-hire", component: <TimeToHire /> },
  { path: "/source-performance-report", component: <SourcePerformanceReport /> },
  { path: "/call-report", component: <CallReport /> },
  { path: "/placement-report", component: <PlacementReport /> },
  { path: "/pipeline-report", component: <MyPipelineReport /> },

  // Calender
  { path: "/calendar-active", component: <CalenderActive /> },
  { path: "/calendar-all", component: <CalenderAll /> },


  // Tables

  { path: "/allactive-candidates", component: <AllActiveemp /> },
  // { path: "/candidate-editform/:id", component: <CandidateEditFormExtra /> },

  // dashboard

  { path: "/recruiter-dashboard", component: <RecruiterDashboard /> },
  { path: "/manager-dashboard", component: <ManagerDashboard /> },

  // candidate pipeline
  { path: "/tableview", component: <TableView /> },
  { path: "/Kanbanview", component: <KanbanView /> },

  // Emails
  { path: "/outbox", component: <OutBox /> },
  { path: "/sentemails", component: <SentEmails /> },

  // common

  { path: "/import-bulkresume", component: <ImportBulkResume /> },
  { path: "/importfromcsv-candidates", component: <ImportFromCSV /> },
  { path: "/importfromcsv-companies", component: <ImportFromCSVCompanies /> },
  { path: "/importfromcsv-contacts", component: <ImportFromCSVContacts /> },
  { path: "/importfromcsv-jobs", component: <ImportFromCSVJobs /> },

  { path: "/email-ac", component: <EmailAC /> },

  { path: "/submitcandidate-job", component: <SubmitCandidatetoJob /> },
  { path: "/import-resume-candidate", component: <ImportResumeCan /> },
  { path: "/talent-scan", component: <TalentScan /> },

  // Time sheet

  { path: "/timesheet", component: <TimeSheet /> },

  // Employee 

  { path: "/allactive-employees", component: <EmployeeAllActive /> },
  { path: "/myactive-employees", component: <EmployeesMyActive /> },
  { path: "/todolist-employees", component: <EmployeesTodoList /> },
   { path: "/added-employees", component: <EmployeesAddedByMe /> },
  { path: "/opened-employees", component: <EmployeesOpened /> },
  { path: "/archived-employees", component: <EmployeesArchived /> },
  { path: "/employee-edit", component: <EmployeeEditFrom /> },

  // { path: "/candidate-editform", component: <CandidateEditFormExtra /> },
  // { path: "/uploadresumeform", component: <UploadResumeForm /> },
  // { path: "/admin-dashboard", component: <AdminDashboard /> },
 
  // { path: "/candidates-activity", component: <CandidatesActivityLog /> },
  // { path: "/candidates-pool", component: <CandidatesPool /> },
  // { path: "/candidates-duplicate", component: <CandidatesDuplicate /> },
  // { path: "/create-candidate", component: <CreateCandidate /> },


  
  //Login
  // { path: "/login", component: <LoginPage /> },



  // this route should be at the end of all other routes
  // { path: "/", component: <Dashboard /> },
];


export { userRoutes };

