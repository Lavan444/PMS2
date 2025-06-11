import React, { useState, useRef, useEffect, useMemo } from "react"
import {
  CardBody,
  Col,
  Container,
  Row,
  // Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Dropdown } from "primereact/dropdown"
import { TabView, TabPanel } from "primereact/tabview"
import { Link, useLocation } from "react-router-dom"
import moment from "moment"
import { FilterMatchMode } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { Editor } from "primereact/editor"
import { Chips } from "primereact/chips"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import { MultiSelect } from "primereact/multiselect" // Make sure to import MultiSelect correctly
import "jspdf-autotable"
import { Calendar } from "primereact/calendar"

import { useForm } from "react-hook-form"
import axios from "axios"
import LinkCandidates from "./LinkCandidates"
// import { Toast } from 'primereact/toast';
import { Accordion, AccordionTab } from "primereact/accordion"
import { Badge } from "primereact/badge"
import { TreeTable } from "primereact/treetable"
import { Card } from "primereact/card"
import { CascadeSelect } from "primereact/cascadeselect"
import AddMenu from "components/CommonForBoth/TopbarDropdown/AddMenu"
import { TreeSelect } from "primereact/treeselect"
import Select from "react-select"
import { Dialog } from "primereact/dialog"
import { useNavigate } from "react-router-dom"
import NotesJobs from "../Common/NotesJobs"
import NotesJobs1 from "../Common/NotesJobs1"
import { Tooltip } from "primereact/tooltip"
import { Checkbox } from "primereact/checkbox"
import LinkContactsPopup from "ATSComponents/Common/LinkContactsPopup"
import LinkJobsPopup from "ATSComponents/Common/LinkCandidatesPopup"
import LinkContact2Popup from "ATSComponents/Common/LinkContact2Popup"
import { SelectButton } from "primereact/selectbutton"

import { ContextMenu } from "primereact/contextmenu"
import { Toast } from "primereact/toast"
import SubmitJobtoCandidate from "./SubmitJobtoCandidate"

import { useSelector } from "react-redux"
import WorkTypeManager from "./WorkTypeManager"
import WorkType from "ATSComponents/Common/WorkType"
import WorkType1 from "ATSComponents/Common/WorkType1"
import DateRangePicker from "ATSComponents/Common/DateRangePicker"
import EstimateTable from "./EstimateTable"

const JobAllActive = ({ toggleSidebar }) => {
  const [PoliciesfilesErrorMessagepan, setPoliciesfilesErrorMessagepan] =
    useState()
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("Active"); // default value
  const { first, rows } = useSelector(state => state.calendar.pagination)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = useForm()
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU3VwZXJ1c2VyIFJvbGUiXSwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3JvbGVzIiwibWFuYWdlX3Blcm1pc3Npb25zIiwibWFuYWdlX3JvbGVfdG9fZW1wbG95ZWUiXSwiZXhwIjoxNzM2NjYzNDMyLCJpYXQiOjE3MzQwNzE0MzJ9.VficxfYeaB2WwPhxcRAzmMjSclWyY54Js5eAQ4mqfM8`
  // action items

  const [selectedEmailOption, setSelectedEmailOption] = useState(null)
  const emailOptions = [
    { label: "New Email", icon: "pi pi-envelope" },
    { label: "Selected", icon: "pi pi-check-circle" },
    { label: "Searched", icon: "pi pi-search" },
    { label: "All", icon: "pi pi-inbox" },
    { label: "Jobs", icon: "pi pi-briefcase" },
  ]

  const customWorkTypes1 = [
    {
      name: 'Discovery / Initiation',
      color: '#000000',
      id: 'active1',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Planning / Requirements',
      color: '#000000',
      id: 'active2',
      statuses: ['Pending', 'Processing', 'Completed']
    },

    {
      name: ' Design',
      color: '#000000',
      id: 'active3',
      statuses: ['Pending', 'Processing', 'Completed']
    },

    {
      name: 'Development',
      color: '#000000',
      id: 'active1',
      statuses: ['Pending', 'Processing', 'Completed']
    },

  ];



  const customWorkTypes4 = [
    {
      name: 'BA',
      color: '#000000',
      id: 'active1',
      statuses: ['Pending', 'Processing', 'Completed']
    },
    {
      name: 'Development',
      color: '#000000',
      id: 'active2',
      statuses: ['Pending', 'Processing', 'Completed']
    },

    {
      name: 'QA',
      color: '#000000',
      id: 'active3',
      statuses: ['Pending', 'Processing', 'Completed']
    },

    {
      name: 'DevOps',
      color: '#000000',
      id: 'active1',
      statuses: ['Pending', 'Processing', 'Completed']
    },

    {
      name: 'Design',
      color: '#000000',
      id: 'active1',
      statuses: ['Pending', 'Processing', 'Completed']
    },

  ];
  const selectedEmailTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <i className={`${option.icon} mr-2`}></i>
          <div>{option.label}</div>
        </div>
      )
    }
    return (
      <div className="flex align-items-center">
        <i className="pi pi-envelope mr-2"></i>
        <span>{props.placeholder}</span>
      </div>
    )
  }

  const emailOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <div>{option.label}</div>
      </div>
    )
  }
  // sms
  const [selectedSmsOption, setSelectedSmsOption] = useState(null)
  const smsOptions = [
    { label: "Selected", icon: "pi pi-check-circle" },
    { label: "Searched", icon: "pi pi-search" },
    { label: "All", icon: "pi pi-inbox" },
  ]

  const selectedSmsTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <i className={`${option.icon} mr-2`}></i>
          <div>{option.label}</div>
        </div>
      )
    }
    return (
      <div className="flex align-items-center">
        <i className="pi pi-comment mr-2"></i>
        <span>{props.placeholder}</span>
      </div>
    )
  }

  const smsOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`}></i>
        <div>{option.label}</div>
      </div>
    )
  }

  //schedule

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(null)

  const scheduleOptions = [
    { label: "Interview", icon: "pi pi-calendar-plus" },
    { label: "Call", icon: "pi pi-phone" },
    { label: "Meeting", icon: "pi pi-users" },
    { label: "Task", icon: "pi pi-check-square" },
    { label: "Event", icon: "pi pi-calendar" },
    { label: "Other", icon: "pi pi-cog" },
  ]

  const selectedScheduleTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <i className={`${option.icon} mr-2`} />
          <div>{option.label}</div>
        </div>
      )
    }
    return (
      <div className="flex align-items-center">
        <i className="pi pi-calendar mr-2" />{" "}
        {/* Default icon for placeholder */}
        <span>{props.placeholder}</span>
      </div>
    )
  }

  const scheduleOptionTemplate = option => {
    return (
      <div className="flex align-items-center">
        <i className={`${option.icon} mr-2`} />
        <div>{option.label}</div>
      </div>
    )
  }

  const items = [
    {
      label: "Add",
      icon: "pi pi-pencil",
      command: () => {
        toast.current.show({
          severity: "info",
          summary: "Add",
          detail: "Data Added",
        })
      },
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Update",
          detail: "Data Updated",
        })
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        toast.current.show({
          severity: "error",
          summary: "Delete",
          detail: "Data Deleted",
        })
      },
    },
  ]

  const [tabs, setTabs] = useState([
    {
      key: "tab1",
      header: "Home",
      content: "Content for Home tab",
      iconClass: "pi pi-home",
    },
    {
      key: "tab2",
      header: "All Active",
      content: "Content for All Active tab",
      iconClass: "pi pi-list",
    },
    {
      key: "tab3",
      header: "Achieved",
      content: "Content for Achieved tab",
      iconClass: "pi pi-check-circle",
    },
  ])
  const [activeIndex, setActiveIndex] = useState(0)

  document.title = "ATS - Dashboard"

  const [customers, setCustomers] = useState([])

  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters["global"].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }
  const onSelectionChange = e => {
    setSelectedCustomers(e.value)
  }
  const onRowReorder = e => {
    setCustomers(e.value)
  }
  const exportCSV = () => {
    if (dt.current) {
      dt.current.exportCSV()
    }
  }
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers")
    XLSX.writeFile(workbook, "customers_data.xlsx")
  }
  const exportPdf = () => {
    const doc = new jsPDF()
    doc.text("Customer Data", 14, 10)
    doc.autoTable({
      head: [
        [
          "ID",
          "JobId",
          "First Name",
          "Status",
          "Last Name",
          "Job Title",
          "Email",
          "Phone",
          "Company",
          "Experience",
          "JobStartDate",
          "JobEndDate",
          "JobLocation",
          "WorkplaceType",
          "JobType",
          "Categories",
          "Groups",
          "ResumeAttachment",
          "PrimarySkills",
          "CreatedBy",
          "EditDate",
          "CreateDate",
        ],
      ],
      body: customers.map(customer => [
        customer.id,
        customer.JobTitle,
        customer.Status,
        customer.HiringManager,
        customer.Lastname,
        customer.Email,
        customer.MobPhone,
        customer.Company,
        customer.Openings,
        customer.JobLocation,
        customer.WorkplaceType,
        customer.Categories,
        customer.JobType,
        customer.JobId,

        customer.Groups,
        customer.Department,
        customer.JobStartDate,
        customer.JobEndDate,
        customer.Seniority,
        customer.JobFunction,
        customer.ExperienceRequired,
        customer.MinSalary,
        customer.MaxSalary,
      ]),
    })
    doc.save("customers_data.pdf")
  }

  {
    /* Side bar start */
  }

  const [visibleRight, setVisibleRight] = useState(false)
  const [jobTitle, setJobTitle] = useState("")

  // Toggle dropdown open/close
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const [hiringManager, setHiringManager] = useState(null)
  const [company, setCompany] = useState("Varun Digital Media")
  const [jobLocation, setJobLocation] = useState(null)
  const [experience, setExperience] = useState()

  // Example data for each field
  const hiringManagers = [
    { name: "John", code: "J1" },
    { name: "Michael", code: "M1" },
    { name: "Sarah", code: "S1" },
    { name: "James", code: "J2" },
  ]

  const companies = [
    { name: "Tech Corp", code: "TC" },
    { name: "BizCorp", code: "BC" },
    { name: "Creative Solutions", code: "CS" },
    { name: "Innovative Tech", code: "IT" },
  ]

  const jobLocations = [
    { name: "Hyderabad", code: "HYD" },
    { name: "Chennai", code: "CHN" },
    { name: "Mumbai", code: "MUM" },
    { name: "Bangalore", code: "BLR" },
    { name: "Delhi", code: "DEL" },
  ]

  const [jobStartDate, setJobStartDate] = useState(null)
  const [jobEndDate, setJobEndDate] = useState(null)

  //des

  const [text, setText] = useState(
    `AI Generator that creates content from user input using AI models.`
  )

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    )
  }

  const header = renderHeader()

  const [skills, setSkills] = useState([])
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [primartkey, setprimartkey] = useState([])
  const [successAlert, setSuccessAlert] = useState(false)

  const handleAddSkill = () => {
    setIsAddingSkill(true)
  }

  const handleSkillChange = e => {
    const newSkills = e.value.filter(skill => !skills.includes(skill))
    if (newSkills.length > 0) {
      setSkills(prevSkills => [...prevSkills, ...newSkills]) // Add new skills
      setIsAddingSkill(false) // Hide the input field after a skill is added
    }
  }

  const removeSkill = skillToRemove => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  {
    /* Side bar end */
  }

  const handleJobStatusChange = e => {
    setSelectedJobs(e.value)
  }

  ////////////////////////
  const [deleteRowId, setDeleteRowID] = useState(null) // end date value

  const getallactivejobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Jobs}/api/v1/jobs/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        setCustomers(results)
      }
    } catch (error) { }
  }

  const getCompanydata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Company_Contact}/api/v1/company/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        setcompamyitem(results)
      }
    } catch (error) { }
  }
  const getHirringmanager = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_Company_Contact}/api/v1/contacts/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        let results = response.data.results
        sethirringdata(results)
      }
    } catch (error) { }
  }

  const deleteHandler = async () => {
    let id = deleteRowId
    await axios
      .delete(`${process.env.REACT_APP_Jobs}/api/v1/jobs/${id}/`)
      .then(resp => {
        setSmShow(false)
        getallactivejobs()
        setSuccessAlert(true)
      })
      .catch(error => {
        console.log("on submit delete error ", error)
      })
  }

  useEffect(() => {
    getCompanydata()
    getHirringmanager()
    getallactivejobs()
  }, [])

  // jobs datatable

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    openings: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hiring_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
    workplace_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
    experience_required: { value: null, matchMode: FilterMatchMode.CONTAINS },
    min_salary: { value: null, matchMode: FilterMatchMode.CONTAINS },
    max_salary: { value: null, matchMode: FilterMatchMode.CONTAINS },
    department: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_start_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_end_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_hiring_goal: { value: null, matchMode: FilterMatchMode.CONTAINS },
    job_function: { value: null, matchMode: FilterMatchMode.CONTAINS },
    seniority: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    group: { value: null, matchMode: FilterMatchMode.CONTAINS },
    create_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    edit_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const [jobsData, setJobsData] = useState([
    {
      job_id: "Proj-101",
      job_title: "AI Generator", // Project name
      job_status:
        "AI Generator that creates content from user input using AI models.", // Description of project
      openings: "Mahesh Kumar Bhoga", // Assigned recruiter or hiring member
      hiring_manager: "13", // ID of hiring manager
      company: "9", // Company ID
      job_location: "Hyderabad", // Location of job
      workplace_type: "Due some issues", // Reason for delay
      job_type: "24-05-2025", // Target deployment or review date
      primary_skills: "HTML, CSS, JavaScript", // Required skills
      experience_required: "3 Years", // Experience
      min_salary: 600000, // Min salary
      max_salary: 800000, // Max salary
      department: "UI/UX", // Department
      job_start_date: "01-01-2025", // Start date
      job_end_date: "31-12-2025", // End date
      job_hiring_goal: 10, // Number of hires needed
      job_function: "Web Development", // Functional area
      seniority: "Mid-Level", // Seniority level
      category: "Frontend", // Job category
      group: "HTML, CSS", // Skill group
      create_date: "15-12-2024", // Created on
      edit_date: "05-01-2025", // Last edited on
      created_by: "Harish", // Created by
    },
    {
      job_id: "Proj-102",
      job_title: "Resume Parser",
      job_status:
        "Parses resumes and extracts structured data using NLP models.",
      openings: "Anjali Mehta",
      hiring_manager: "17",
      company: "12",
      job_location: "Bangalore",
      workplace_type: "Awaiting data source integration",
      job_type: "15-06-2025",
      primary_skills: "Python, NLP, Regex",
      experience_required: "2 Years",
      min_salary: 500000,
      max_salary: 750000,
      department: "Data Science",
      job_start_date: "01-03-2025",
      job_end_date: "30-11-2025",
      job_hiring_goal: 5,
      job_function: "Data Extraction",
      seniority: "Junior",
      category: "Backend",
      group: "Python, NLP",
      create_date: "20-12-2024",
      edit_date: "08-01-2025",
      created_by: "Kiran",
    },
    {
      job_id: "Proj-103",
      job_title: "Chatbot Assistant",
      job_status: "Develops intelligent chatbot for customer interaction.",
      openings: "Rahul Dev",
      hiring_manager: "21",
      company: "14",
      job_location: "Chennai",
      workplace_type: "Dependency on third-party API",
      job_type: "10-07-2025",
      primary_skills: "React, Node.js, Dialogflow",
      experience_required: "4 Years",
      min_salary: 650000,
      max_salary: 900000,
      department: "Product Development",
      job_start_date: "05-02-2025",
      job_end_date: "15-12-2025",
      job_hiring_goal: 8,
      job_function: "Customer Support Automation",
      seniority: "Mid-Level",
      category: "Full Stack",
      group: "React, Node.js",
      create_date: "18-12-2024",
      edit_date: "10-01-2025",
      created_by: "Neha",
    },
    {
      job_id: "Proj-104",
      job_title: "Image Enhancer AI",
      job_status: "AI tool that enhances low-resolution images using GANs.",
      openings: "Sneha Rao",
      hiring_manager: "19",
      company: "10",
      job_location: "Mumbai",
      workplace_type: "Awaiting design mockups",
      job_type: "05-08-2025",
      primary_skills: "TensorFlow, OpenCV, Python",
      experience_required: "3 Years",
      min_salary: 700000,
      max_salary: 1000000,
      department: "AI/ML",
      job_start_date: "10-01-2025",
      job_end_date: "20-12-2025",
      job_hiring_goal: 6,
      job_function: "Image Processing",
      seniority: "Mid-Level",
      category: "Backend",
      group: "AI, ML",
      create_date: "22-12-2024",
      edit_date: "12-01-2025",
      created_by: "Ravi",
    },
    {
      job_id: "Proj-105",
      job_title: "Voice to Text Converter",
      job_status: "Transcribes speech to text using AI-based models.",
      openings: "Nikhil Sharma",
      hiring_manager: "23",
      company: "11",
      job_location: "Noida",
      workplace_type: "Pending hardware testing",
      job_type: "12-06-2025",
      primary_skills: "Python, SpeechRecognition, DeepSpeech",
      experience_required: "4 Years",
      min_salary: 750000,
      max_salary: 950000,
      department: "AI Research",
      job_start_date: "12-02-2025",
      job_end_date: "29-11-2025",
      job_hiring_goal: 4,
      job_function: "Speech Recognition",
      seniority: "Senior",
      category: "AI",
      group: "Speech, NLP",
      create_date: "25-12-2024",
      edit_date: "15-01-2025",
      created_by: "Priya",
    },
    {
      job_id: "Proj-106",
      job_title: "E-commerce Recommender",
      job_status:
        "Builds a recommendation system for e-commerce personalization.",
      openings: "Arjun Varma",
      hiring_manager: "15",
      company: "8",
      job_location: "Pune",
      workplace_type: "Blocked on analytics integration",
      job_type: "28-06-2025",
      primary_skills: "Python, Pandas, Scikit-learn",
      experience_required: "2 Years",
      min_salary: 500000,
      max_salary: 850000,
      department: "Analytics",
      job_start_date: "01-03-2025",
      job_end_date: "30-10-2025",
      job_hiring_goal: 7,
      job_function: "Data Science",
      seniority: "Junior",
      category: "AI",
      group: "ML, Python",
      create_date: "28-12-2024",
      edit_date: "18-01-2025",
      created_by: "Suman",
    },
    {
      job_id: "Proj-107",
      job_title: "Social Media Scheduler",
      job_status: "Tool for scheduling and auto-posting on social platforms.",
      openings: "Vikas Jain",
      hiring_manager: "11",
      company: "15",
      job_location: "Delhi",
      workplace_type: "Delay in UI feedback",
      job_type: "14-07-2025",
      primary_skills: "JavaScript, Node.js, MongoDB",
      experience_required: "3 Years",
      min_salary: 620000,
      max_salary: 820000,
      department: "Marketing Tech",
      job_start_date: "20-01-2025",
      job_end_date: "01-12-2025",
      job_hiring_goal: 5,
      job_function: "Marketing Automation",
      seniority: "Mid-Level",
      category: "Full Stack",
      group: "Node.js, JS",
      create_date: "02-01-2025",
      edit_date: "20-01-2025",
      created_by: "Aditya",
    },
    {
      job_id: "Proj-108",
      job_title: "Bug Tracker Tool",
      job_status: "Develops a tool to log, track, and resolve software bugs.",
      openings: "Deepika Singh",
      hiring_manager: "18",
      company: "13",
      job_location: "Ahmedabad",
      workplace_type: "Stalled on test case setup",
      job_type: "25-06-2025",
      primary_skills: "React, Redux, Firebase",
      experience_required: "2 Years",
      min_salary: 550000,
      max_salary: 770000,
      department: "QA",
      job_start_date: "10-02-2025",
      job_end_date: "30-09-2025",
      job_hiring_goal: 6,
      job_function: "Quality Assurance",
      seniority: "Junior",
      category: "Frontend",
      group: "React, Firebase",
      create_date: "05-01-2025",
      edit_date: "25-01-2025",
      created_by: "Swati",
    },
    {
      job_id: "Proj-109",
      job_title: "Content Summarizer",
      job_status: "Generates concise summaries from long documents using NLP.",
      openings: "Tanvi Verma",
      hiring_manager: "20",
      company: "10",
      job_location: "Kolkata",
      workplace_type: "Model training delay",
      job_type: "10-09-2025",
      primary_skills: "Python, Transformers, HuggingFace",
      experience_required: "3 Years",
      min_salary: 600000,
      max_salary: 900000,
      department: "AI/ML",
      job_start_date: "15-02-2025",
      job_end_date: "30-11-2025",
      job_hiring_goal: 5,
      job_function: "Text Summarization",
      seniority: "Mid-Level",
      category: "AI",
      group: "NLP, Python",
      create_date: "10-01-2025",
      edit_date: "30-01-2025",
      created_by: "Ankit",
    },
    {
      job_id: "Proj-110",
      job_title: "Smart Form Autofill",
      job_status: "AI-powered autofill for dynamic web forms.",
      openings: "Harika Nair",
      hiring_manager: "22",
      company: "16",
      job_location: "Gurgaon",
      workplace_type: "Blocked on browser plugin API",
      job_type: "20-07-2025",
      primary_skills: "JavaScript, Chrome API, ML",
      experience_required: "3 Years",
      min_salary: 620000,
      max_salary: 850000,
      department: "Automation",
      job_start_date: "22-01-2025",
      job_end_date: "31-10-2025",
      job_hiring_goal: 4,
      job_function: "Form Automation",
      seniority: "Mid-Level",
      category: "Frontend",
      group: "JS, ML",
      create_date: "12-01-2025",
      edit_date: "02-02-2025",
      created_by: "Yash",
    },
  ])

  const [selectedJobsData, setSelectedJobsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState({ rows: 10, first: 0 })
  const navigate = useNavigate()

  const onPage = event => {
    setPageState({ rows: event.rows, first: event.first })
  }

  // clear search start

  const handleClearSearchJobs = () => {
    console.log("clicked")
    setFilters({
      job_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      job_title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_status: { value: null, matchMode: FilterMatchMode.CONTAINS },
      openings: { value: null, matchMode: FilterMatchMode.CONTAINS },
      hiring_manager: { value: null, matchMode: FilterMatchMode.CONTAINS },
      company: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
      workplace_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
      primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
      experience_required: { value: null, matchMode: FilterMatchMode.CONTAINS },
      min_salary: { value: null, matchMode: FilterMatchMode.CONTAINS },
      max_salary: { value: null, matchMode: FilterMatchMode.CONTAINS },
      department: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_start_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_end_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_hiring_goal: { value: null, matchMode: FilterMatchMode.CONTAINS },
      job_function: { value: null, matchMode: FilterMatchMode.CONTAINS },
      seniority: { value: null, matchMode: FilterMatchMode.CONTAINS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      group: { value: null, matchMode: FilterMatchMode.CONTAINS },
      create_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      edit_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
      created_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
    })

  }



  const dt = useRef(null)

  const [selectedJob, setSelectedJob] = useState(null) // State to track the right-clicked job

  const toast = useRef(null) // Reference for Toast notifications
  const cm = useRef(null) // Reference for ContextMenu

  // Context menu options
  const menuModel = [
    {
      label: "View",
      icon: "pi pi-fw pi-eye",
      command: () => setVisibleViewRight(true),
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/jobs-editform")
      },
    },
    { label: "Archived", icon: "pi pi-check-circle" },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => deleteJob(selectedJob),
    },
    {
      label: "Schedule",
      icon: "pi pi-calendar-clock",
      items: [
        // Subitems for "Schedule"
        {
          label: "Interview",
          icon: "pi pi-calendar-plus",
          command: () => SetInterviewpop(true),
        },
        {
          label: "Call",
          icon: "pi pi-phone",
          command: () => SetInterviewpopCall(true),
        },
        {
          label: "Meeting",
          icon: "pi pi-users",
          command: () => SetInterviewpopMeeting(true),
        },
        {
          label: "Task",
          icon: "pi pi-list",
          command: () => SetInterviewpopTask(true),
        },
        {
          label: "Event",
          icon: "pi pi-calendar-clock",
          command: () => SetInterviewpopEvent(true),
        },
        {
          label: "Other",
          icon: "pi pi-ellipsis-h",
          command: () => SetInterviewpopOther(true),
        },
      ],
    },
    {
      label: "More",
      icon: "pi pi-ellipsis-h",
      items: [
        // Subitems for "More"
        {
          label: "Link Candidates",
          icon: "pi pi-link",
          items: [
            // Subitems for "More"
            { label: "Received", icon: "pi pi-link" },
            { label: "Potential", icon: "pi pi-sync" },
            { label: "Submitted", icon: "pi pi-link" },
          ],
        },
        { label: "Match Candidates", icon: "pi pi-sync" },
        { label: "Change Status", icon: "pi pi-link" },
        { label: "Attachments", icon: "pi pi-sync" },
      ],
    },
    { label: "Job Notes", icon: "pi pi-clipboard" },
    {
      label: "Clear Search",
      icon: "pi pi-filter-slash",
      command: handleClearSearchJobs,
    },
  ]

  // Function to handle viewing a job
  const viewJob = job => {
    toast.current.show({
      severity: "info",
      summary: "Job Selected",
      detail: job.job_title,
    })
  }

  // Function to handle editing a job
  const editJob = job => {
    toast.current.show({
      severity: "success",
      summary: "Edit Job",
      detail: `Editing ${job.job_title}`,
    })
    // Add your edit logic here
  }

  // Function to handle deleting a job
  const deleteJob = job => {
    let _jobs = [...jobsData]
    _jobs = _jobs.filter(j => j.job_id !== job.job_id)
    setJobsData(_jobs) // Update the jobs data state
    toast.current.show({
      severity: "error",
      summary: "Job Deleted",
      detail: `Deleted ${job.job_title}`,
    })
  }

  // view page starts

  // view form pipeline starts

  const [receivedJobsFilters, setReceivedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jobid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    candidate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const receivedJobs = [
    {
      task_status: "Task",
      task_code: "Task-101",
      task_name: "Add User Role Feature",
      "Estimated Work Hours": "12",
      start_date: "01-05-2025",
      end_date: "03-05-2025",
      project_name: "AI Generator (Proj-101)",
      assigned_to: "Amit Verma",
    },
    {
      task_status: "Bug",
      task_code: "Bug-102",
      task_name: "Generate Monthly Report",
      "Estimated Work Hours": "8",
      start_date: "04-05-2025",
      end_date: "05-05-2025",
      project_name: "Sales Automation (Proj-102)",
      assigned_to: "Kiran Rao",
    },


  ]

  const [selectedReceivedJobs, setSelectedReceivedJobs] = useState([])
  const [potentialJobsFilters, setPotentialJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    EstimatedWorkHours: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const potentialJobs = [
    {
      task_status: "Task",
      task_code: "Task-103",
      task_name: "Fix Login Timeout Bug",
      "Estimated Work Hours": "5",
      start_date: "02-05-2025",
      end_date: "03-05-2025",
      project_name: "Security Enhancement",
      assigned_to: "Vikram Joshi",
    },
    {
      task_status: "Bug",
      task_code: "Bug-104",
      task_name: "Integrate PF Calculation",
      "Estimated Work Hours": "10",
      start_date: "04-05-2025",
      end_date: "06-05-2025",
      project_name: "Payroll System",
      assigned_to: "Sanjay Mishra",
    },
  ]

  const [selectedPotentialJobs, setSelectedPotentialJobs] = useState([])
  const [rejectedJobsFilters, setRejectedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    EstimatedWorkHours: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const rejectedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedRejectedJobs, setSelectedRejectedJobs] = useState([])

  // interview

  const [interviewJobsFilters, setInterviewJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const interviewJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedInterviewJobs, setSelectedInterviewJobs] = useState([])

  // submitted start

  const [submittedJobsFilters, setSubmittedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const submittedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedSubmittedJobs, setSelectedSubmittedJobs] = useState([])

  const [offerJobsFilters, setOfferJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const offerJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedOfferJobs, setSelectedOfferJobs] = useState([])

  // placed start

  const [placedJobsFilters, setPlacedJobsFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    task_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Estimated Work Hours": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    assigned_to: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });


  const placedJobs = [
    {
      task_status: "Task",
      task_code: "Task-105",
      task_name: "Connect with GSTN APIs",
      "Estimated Work Hours": "16",
      start_date: "03-05-2025",
      end_date: "07-05-2025",
      project_name: "Tax Compliance (Proj-105)",
      assigned_to: "Rajeev Menon",
    },
    {
      task_status: "Bug",
      task_code: "Bug-106",
      task_name: "Add Biometric Sync",
      "Estimated Work Hours": "6",
      start_date: "01-05-2025",
      end_date: "02-05-2025",
      project_name: "HR Automation (Proj-106)",
      assigned_to: "Nikhil Kapoor",
    },
  ]

  const [selectedPlacedJobs, setSelectedPlacedJobs] = useState([])

  // view form pipeline ends
  // view form activities starts

  const [activitiesFilters, setActivitiesFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const activities = [
    {
      type: "Technical",
      sub_type: "Software",
      priority: "High",
      subject: "Job Interview",
      date_time: "2025-01-01 10:00",
      user_id: "12345",
    },
    {
      type: "Technical",
      sub_type: "Project Management",
      priority: "Medium",
      subject: "Project Kickoff",
      date_time: "2024-12-05 09:00",
      user_id: "54321",
    },
    {
      type: "Technical",
      sub_type: "Data Analysis",
      priority: "Low",
      subject: "Data Review",
      date_time: "2025-01-15 14:00",
      user_id: "98765",
    },
    {
      type: "Non-Technical",
      sub_type: "Marketing",
      priority: "High",
      subject: "Strategy Discussion",
      date_time: "2025-02-01 11:00",
      user_id: "67890",
    },
    {
      type: "Non-Technical",
      sub_type: "Human Resources",
      priority: "Critical",
      subject: "Employee Review",
      date_time: "2025-03-01 13:00",
      user_id: "11223",
    },
  ]

  const [selectedActivities, setSelectedActivities] = useState([])
  const [isEditorVisible, setEditorVisible] = useState(false) // Manage editor visibility
  const [editorContent, setEditorContent] = useState("") // Manage editor content
  const [editIndex, setEditIndex] = useState(null)
  const [candidateNotes, setCandidateNotes] = useState([]) // Store notes in an array

  const handleAddNotes = () => {
    setEditorVisible(true) // Show the editor
    setEditorContent("") // Clear any previous content
    setEditIndex(null) // Reset editIndex when adding a new note
  }

  const handleSaveNotes = () => {
    if (editorContent.trim()) {
      const currentDateTime = new Date().toLocaleString() // Get current date and time
      const newNote = {
        content: editorContent,
        timestamp: `Saved on: ${currentDateTime}`,
        candidateName: "Note: Anup Gogoi - Senior Python developer - ATS", // Example candidate name, can be dynamic
      }

      if (editIndex !== null) {
        // Edit the existing note
        const updatedNotes = [...candidateNotes]
        updatedNotes[editIndex] = newNote // Update the specific note
        setCandidateNotes(updatedNotes)
        setEditIndex(null) // Reset editIndex after saving
      } else {
        // Add a new note in the array
        setCandidateNotes(prevNotes => [...prevNotes, newNote])
      }

      setEditorContent("") // Clear editor content after saving
    }
  }

  const handleCancelNotes = () => {
    setEditorContent("") // Clear editor content
    setEditIndex(null) // Reset editIndex on cancel
  }

  const handleEditNote = index => {
    setEditorVisible(true)
    setEditorContent(candidateNotes[index].content) // Load the note content into the editor
    setEditIndex(index) // Set editIndex to edit the current note
  }

  const handleDeleteNote = index => {
    const updatedNotes = candidateNotes.filter((_, i) => i !== index) // Remove the note by index
    setCandidateNotes(updatedNotes)
  }

  // view form notes ends

  // view form history starts

  const [historyFilters, setHistoryFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sub_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_time: { value: null, matchMode: FilterMatchMode.DATE_IS },
    user_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const history = [
    {
      type: "Technical",
      sub_type: "Software",
      priority: "High",
      subject: "Job Interview",
      date_time: "2025-01-01 10:00",
      user_id: "12345",
    },
    {
      type: "Technical",
      sub_type: "Project Management",
      priority: "Medium",
      subject: "Project Kickoff",
      date_time: "2024-12-05 09:00",
      user_id: "54321",
    },
    {
      type: "Technical",
      sub_type: "Data Analysis",
      priority: "Low",
      subject: "Data Review",
      date_time: "2025-01-15 14:00",
      user_id: "98765",
    },
    {
      type: "Non-Technical",
      sub_type: "Marketing",
      priority: "High",
      subject: "Strategy Discussion",
      date_time: "2025-02-01 11:00",
      user_id: "67890",
    },
    {
      type: "Non-Technical",
      sub_type: "Human Resources",
      priority: "Critical",
      subject: "Employee Review",
      date_time: "2025-03-01 13:00",
      user_id: "11223",
    },
  ]

  const [selectedHistory, setSelectedHistory] = useState([])

  // view form history ends

  const [visibleViewRight, setVisibleViewRight] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  const [documents, setDocuments] = useState([
    {
      key: "1",
      data: {
        id: "1",
        certificate_name: "Discovery / Initiation",
        docSubject: [
          "Project charter",
          "Goals & scope",
          "Stakeholder identification"
        ],
        created_at: "Jun 20 - July 15 2025",
        responsible: "BA Team",
      },
    },
    {
      key: "2",
      data: {
        id: "2",
        certificate_name: "Planning / Requirements",
        docSubject: [
          "Job Feedback Report for Lavankumar Kalvala - Web Developer"
        ],
        created_at: "May 20 - Jun 15 2025",
        responsible: "Development Team",
      },
    },
  ]);

  const keyDeliverablesTemplate = (rowData) => {
    if (Array.isArray(rowData.docSubject)) {
      return (
        <div className="key-deliverables">
          {rowData.docSubject.map((item, index) => (
            <div key={index} className="deliverable-item">
              - {item}
            </div>
          ))}
        </div>
      );
    }
    return rowData.docSubject;
  };

  const handleEdit = rowKey => {
    setEditingRow(rowKey)
  }

  const handleSave = (rowKey, field, value) => {
    setDocuments(prevDocuments =>
      prevDocuments.map(doc =>
        doc.key === rowKey
          ? { ...doc, data: { ...doc.data, [field]: value } }
          : doc
      )
    )
  }

  const handleDelete = rowKey => {
    setDocuments(prevDocuments =>
      prevDocuments.filter(doc => doc.key !== rowKey)
    )
  }

  const editableTemplate = (rowData, field) => {
    return editingRow === rowData.key ? (
      <input
        type="text"
        value={rowData.data[field]}
        onChange={e => handleSave(rowData.key, field, e.target.value)}
        onBlur={() => setEditingRow(null)}
        className="p-2 border border-gray-300 rounded w-full"
      />
    ) : (
      <span>{rowData.data[field]}</span>
    )
  }

  // Action template for buttons
  const actionTemplate = rowData => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          aria-label="Edit"
          className="document-btn"
          onClick={() => handleEdit(rowData.key)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          aria-label="Delete"
          className="document-btn"
          onClick={() => handleDelete(rowData.key)}
        />
      </div>
    )
  }

  // view page ends

  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const actScheduleOptions = [

    {
      name: "Call",
      code: "SCH-CA",
      icon: "pi pi-phone",
      action: () => SetInterviewpopCall(true),
    },
    {
      name: "Meeting",
      code: "SCH-ME",
      icon: "pi pi-calendar",
      action: () => SetInterviewpopMeeting(true),
    },
    {
      name: "Task",
      code: "SCH-TA",
      icon: "pi pi-check-square",
      action: () => SetInterviewpopTask(true),
    },

    {
      name: "Other",
      code: "SCH-OT",
      icon: "pi pi-ellipsis-h",
      action: () => SetInterviewpopOther(true),
    },
  ]

  const handleScheduleChange = e => {
    setSelectedSchedule(e.value)

    if (e.value && e.value.action) {
      e.value.action() // Execute the custom action
    }
  }

  const [selectedLinkJob, setSelectedLinkJob] = useState(null)
  const moreoptions = [
    {
      name: "Link Candidates",
      jobs: [
        {
          name: "Received",
          // onClick: () => { handleresend() }
        },
        {
          name: "Potential",
          // onClick: () => { handleresend() }
        },
        {
          name: "Submitted",
          onClick: () => {
            handleresend()
          },
        },
      ],
    },
    {
      name: "Change Status",
    },
    {
      name: "Attachments",
    },
    {
      name: "Delete",
    },
  ]

  // short form strats
  const [selectedCompany, setSelectedCompany] = useState(null)

  const companyOptions = [
    { name: "Varun Digital Media", code: "VDM" },
    { name: "Pranathi Software Services", code: "PSS" },
    { name: "Green Ventures pvt Ltd", code: "GV" },
    { name: "Future Tech Solutions", code: "FTS" },
    { name: "Healthify Solutions pvt Ltd", code: "MS" },
  ]

  const [selectedPerson, setSelectedPerson] = useState(null)

  const personOptions = [
    { name: "Mahesh Kumar Bhoga", role: "UI/UX Manager", code: "HR" },
    { name: "Giri Jalagam", role: "Hr Recruiter", code: "MGR" },
    { name: "Salmanuddin", role: "Sales Manager", code: "TL" },
    { name: "Suresh Reddy", role: "SEO Manager", code: "CEO" },
    { name: "Aman Kumar", role: "AIML Lead", code: "INT" },
  ]

  const [skillsOptions, setSkillsOptions] = useState([
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Java Script", label: "Java Script" },
    { value: "java", label: "Java" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    // Add more skill options as needed
  ])

  const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([])
  // Handle Primary Skills Selection
  const handlePrimarySkillsChange = selectedOptions => {
    setSelectedPrimarySkills(
      selectedOptions ? selectedOptions.map(option => option.value) : []
    )
  }

  const [categories] = useState([
    {
      key: "0",
      label: "Skills",
      children: [
        {
          key: "0-0",
          label: "Frontend",
          children: [
            { key: "0-0-0", label: "React" },
            { key: "0-0-1", label: "Angular" },
            { key: "0-0-2", label: "Bootstrap" },
          ],
        },
        {
          key: "0-1",
          label: "Backend",
          children: [
            { key: "0-1-0", label: "Python" },
            { key: "0-1-1", label: "Java" },
            { key: "0-1-2", label: "C#" },
          ],
        },
        {
          key: "0-2",
          label: "QA",
          children: [
            { key: "0-2-0", label: "Manual" },
            { key: "0-2-1", label: "Automation" },
          ],
        },
      ],
    },
  ])

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null)

  //groups

  const [groups] = useState([
    {
      key: "0",
      label: "Skills",
      children: [
        {
          key: "0-0",
          label: "Frontend",
          children: [
            { key: "0-0-0", label: "React" },
            { key: "0-0-1", label: "Angular" },
            { key: "0-0-2", label: "Bootstrap" },
          ],
        },
        {
          key: "0-1",
          label: "Backend",
          children: [
            { key: "0-1-0", label: "Python" },
            { key: "0-1-1", label: "Java" },
            { key: "0-1-2", label: "C#" },
          ],
        },
        {
          key: "0-2",
          label: "QA",
          children: [
            { key: "0-2-0", label: "Manual" },
            { key: "0-2-1", label: "Automation" },
          ],
        },
      ],
    },
  ])

  const [selectedGroupKey, setSelectedGroupKey] = useState(null)

  // short form ends

  const [importCsvIcons, setImportCsvIcons] = useState(false)

  const exportCSVBtn = selectionOnly => {
    dt.current.exportCSV({ selectionOnly })
  }

  const exportPdfBtn = () => {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("landscape") // Use landscape for better width

        const exportColumns = columns.map(col => col.header) // Headers
        const exportData = jobsData.map(
          row => columns.map(col => row[col.field] ?? "-") // Replace undefined/null with '-'
        )

        doc.autoTable({
          head: [exportColumns], // Column headers
          body: exportData, // Data rows
          startY: 20, // Adjust table position
          styles: { fontSize: 8, cellPadding: 2 }, // Adjust text size for better fit
          theme: "grid", // Add grid lines
          margin: { top: 10, left: 5, right: 5 }, // Adjust margins
          columnStyles: { 0: { cellWidth: 30 } }, // Set width for the first column
        })

        doc.save("jobs_data.pdf")
      })
    })
  }

  const exportExcelBtn = () => {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(jobsData)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] }
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })
      saveAsExcelFile(excelBuffer, "jobs_data")
    })
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then(module => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const EXCEL_EXTENSION = ".xlsx"
        const data = new Blob([buffer], { type: EXCEL_TYPE })

        module.default.saveAs(
          data,
          `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
        )
      }
    })
  }

  const columns = [
    { field: "job_id", header: "Job ID" },
    { field: "job_title", header: "Job Title" },
    { field: "job_status", header: "Job Status" },
    { field: "openings", header: "Openings" },
    { field: "hiring_manager", header: "Hiring Manager" },
    { field: "company", header: "Company" },
    { field: "job_location", header: "Location" },
    { field: "workplace_type", header: "Workplace Type" },
    { field: "job_type", header: "Job Type" },
    { field: "primary_skills", header: "Primary Skills" },
    { field: "experience_required", header: "Experience Required" },
    { field: "min_salary", header: "Min Salary" },
    { field: "max_salary", header: "Max Salary" },
    { field: "department", header: "Department" },
    { field: "job_start_date", header: "Start Date" },
    { field: "job_end_date", header: "End Date" },
    { field: "job_hiring_goal", header: "Hiring Goal" },
    { field: "job_function", header: "Function" },
    { field: "seniority", header: "Seniority" },
    { field: "category", header: "Category" },
    { field: "group", header: "Group" },
    { field: "create_date", header: "Create Date" },
    { field: "edit_date", header: "Edit Date" },
    { field: "created_by", header: "Created By" },
  ]

  const headerBtn = (
    <div className="flex align-items-center justify-content-end gap-1 actionitem-import">
      <Button
        className="csvbtn p-button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSVBtn(false)}
        data-pr-tooltip="CSV"
      />
      <Button
        className="xlsbtn p-button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcelBtn}
        data-pr-tooltip="XLS"
      />
      <Button
        className="pdfbtn p-button me-2"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdfBtn}
        data-pr-tooltip="PDF"
      />
    </div>
  )

  // Export end

  // interview popup starts
  const [interviewpop, SetInterviewpop] = useState(false)
  const [interviewpopCall, SetInterviewpopCall] = useState(false)
  const [interviewpopMeeting, SetInterviewpopMeeting] = useState(false)
  const [interviewpopTask, SetInterviewpopTask] = useState(false)
  const [interviewpopEvent, SetInterviewpopEvent] = useState(false)
  const [interviewpopOther, SetInterviewpopOther] = useState(false)

  const [intertype, setintertype] = useState("Interview")
  const [intertype1, setintertype1] = useState("Task")
  const [intertype2, setintertype2] = useState("Meeting")
  const [intertype3, setintertype3] = useState("Call")
  const [intertype4, setintertype4] = useState("Event")
  const [intertype5, setintertype5] = useState("Other")

  const [subtype, setSubtype] = useState(null)
  const [subtypeget, setsubtypeget] = useState(null)
  const [startdate, setStartdate] = useState(null)
  const [starttime, setStarttime] = useState(null)
  const [endtime, setendtime] = useState(null)
  const [enddate, setenddate] = useState(null)
  const [popTextares, setPopTextares] = useState("")
  const [priority, setPriority] = useState(null)
  const [prioritycontact, setprioritycontact] = useState(null)
  const [condidatevalu, setcondidatevalu] = useState([])

  const typeInterview = [
    { name: "Screening Interviews", value: "SI" },
    { name: "One-on-One Interviews", value: "OOI" },
    { name: "Technical Interviews", value: "TI" },
    { name: "Final Round Interviews ", value: "FRI" },
    { name: "Video/Virtual Interviews", value: "VVI" },
  ]
  const typeCall = [
    { name: "Initial Screening Calls", value: "ISC" },
    { name: "Technical Assessment Calls", value: "TAC" },
    { name: "Behavioral Interview Calls ", value: "BIC" },
    { name: "Hiring Manager Calls", value: "HMC" },
    { name: "HR/Benefits Discussion Calls", value: "HRBDC" },
    { name: "Reference Check Calls", value: "RCC" },
    { name: "Panel Interview Calls", value: "PIC" },
    { name: "Follow-up Calls ", value: "FC" },
    { name: "Offer Discussion Calls ", value: "ODC" },
    { name: "Onboarding Coordination Calls", value: "OCC" },
    { name: "Status Update Calls", value: "SUC" },
    { name: "Candidate Feedback Calls", value: "CFC" },
  ]

  const typeMeeting = [
    { name: "Planning Meetings", value: "PM" },
    { name: "Job Requirements Meetings", value: "JRM" },
    { name: "Recruitment Team Sync-ups", value: "RTS" },
    { name: "Hiring Committee Meetings", value: "HCM" },
    { name: "Interview Panel Briefings", value: "IPB" },
    { name: "Candidate Feedback Meetings", value: "CFM" },
    { name: "Selection Meetings", value: "SM" },
    { name: "Budget Meetings", value: "BM" },
    { name: "Stakeholder Updates", value: "SU" },
    { name: "Recruitment Vendor Meetings", value: "RVM" },
    { name: "Onboarding Planning Meetings", value: "OPM" },
    { name: "Process Improvement Meetings", value: "PIM" },
    { name: "Training Meetings", value: "TM" },
    { name: "Compliance Meetings", value: "CM" },
  ]

  const jobStatusDrop = [
    { name: "Open", value: "Open" },
    { name: "Closed", value: "Closed" },
    { name: "On Hold", value: "On Hold" },
  ]

  const typeInterview1 = [
    { name: "Inperson", value: "low" },
    { name: "Audio", value: "medium" },
    { name: "Video", value: "high" },
  ]

  const priorityValue = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ]
  const [reminder, setReminder] = useState(null)
  const reminderOptions = [
    { name: "0 mins", value: "0 mins" },
    { name: "5 mins", value: "5 mins" },
    { name: "10 mins", value: "10 mins" },
    { name: "15 mins", value: "15 mins" },
    { name: "30 mins", value: "30 mins" },
  ]
  const [repeat, setRepeat] = useState(null)
  const repeatOptions = [
    { name: "Do not repeat", value: "none" },
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
    { name: "Mon-Fri", value: "mon-fri" },
  ]

  const [followup, setFollowup] = useState(null)

  // Dropdown options
  const followupOptions = [
    { name: "None", value: "none" },
    { name: "1 Day", value: "1 Day" },
    { name: "2 Days", value: "2 Day" },
    { name: "3 Days", value: "3 Day" },
  ]

  const [typeInterviewcondi, settypeInterviewcondi] = useState([])
  const [subjectval, setsubjectval] = useState(null)
  const [popchecked2, setPopchecked2] = useState(false)
  const handlePopupCheckbox2 = e => {
    setPopchecked2(e.checked)
  }

  const typeInterviewcontact = [
    { name: "Harish", value: "Harish" },
    { name: "Giri", value: "Giri" },
    { name: "Pavan", value: "Pavan" },
  ]

  const typeInterviewval = [
    { name: "Open", value: "Open" },
    { name: "Closed", value: "1 Day" },
    { name: "On Hold", value: "2 Day" },
    // { name: '3 Days', value: '3 Day' },
  ]

  const [userid, setUserid] = useState([])
  const customChip = item => {
    return (
      <div>
        <span>{item} - (active)</span>
        <i className="pi pi-user-plus"></i>
      </div>
    )
  }
  const [popchecked, setPopchecked] = useState(false)
  const handlePopupCheckbox = e => {
    setPopchecked(e.checked)
  }

  const [jobid, setJobid] = useState("Proj-101")
  const [jobtitle, setJobtitle] = useState("AI Generator")
  const [expyears, setExpyears] = useState("3 Years")
  const [userids, setUserids] = useState("Harish")
  const [hiringmanager1, setHiringManager1] = useState("Mahesh Kumar Bhoga")
  const [jobloc, setJobloc] = useState("Hyderabad")
  const [workplace, setWorkplace] = useState("Work From Office")
  const [jobstart, setJobstart] = useState("01-01-2025")
  const [projectDateRange, setProjectDateRange] = useState(null);
  const [jobend, setJobend] = useState("31-12-2025")
  const [primskills, setPrimskills] = useState("HTML, CSS, Javascript")
  const [categ, setCateg] = useState("Frontend")
  const [group, setGroup] = useState("HTML, CSS, Javascript")
  const [description1, setDescription1] = useState(
    `AI Generator that creates content from user input using AI models.`
  )

  const [notes1, setNotes1] = useState(
    "An AI-powered content generator that transforms user input into high-quality, context-aware content using advanced artificial intelligence models. Whether you need engaging blog posts, marketing copy, social media content, product descriptions, or creative storytelling, this tool uses state-of-the-art language models to instantly craft tailored results based on your instructions."
  )

  // input values ends

  return (
    <React.Fragment>
      <div className="page-content allact-tabs">
        <Container fluid={true}>
          <div className="page-title-box actjobbread">
            <Row className="align-items-center breadcrumb-card ac-items">
              <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
                <span className="addcan-ac">
                  {selectedJobsData.length > 0 ? (
                    <span className="action-icons me-2">
                      <button
                        type="button"
                        className="btn btn-secondary import-res-btn me-1 md:w-8rem"
                      >
                        <i className="pi pi-briefcase"></i>{" "}
                        {selectedJobsData.length} Selected
                      </button>

                      <span className="icons-ac">
                        <Tooltip
                          target=".view"
                          content="View"
                          position="bottom"
                          style={{ marginTop: "5px" }}
                        />

                        <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 view"
                          onClick={() => setVisibleViewRight(true)}
                        >
                          <i className="pi pi-eye"></i>
                        </button>

                        <Tooltip
                          target=".edit"
                          content="Edit"
                          position="top"
                          style={{ marginBottom: "5px" }}
                        />
                        <Link to="/jobs-editform" className="p-link">
                          <button
                            type="button"
                            class="btn btn-secondary icons-btn ms-1 edit"
                          >
                            <i className="pi pi-pencil"></i>
                          </button>
                        </Link>

                        <Tooltip
                          target=".delete"
                          content="Delete"
                          position="bottom"
                          style={{ marginTop: "5px" }}
                        />

                        <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 delete"
                        >
                          <i className="pi pi-trash"></i>
                        </button>

                        <Tooltip
                          target=".archived"
                          content="Archived"
                          position="top"
                          style={{ marginBottom: "5px" }}
                        />

                        <button
                          type="button"
                          class="btn btn-secondary icons-btn ms-1 archived"
                        >
                          <i class="pi pi-check-circle"></i>
                        </button>
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary import-res-btn md:w-9rem me-1"
                      onClick={() => {
                        setVisibleRight(true)
                      }}
                    >
                      <i className="pi pi-briefcase me-1"></i> Add a Project
                    </button>
                  )}
                </span>

                <span className="drop-ac">
                  <SubmitJobtoCandidate />
                  <CascadeSelect
                    onChange={handleScheduleChange}
                    options={actScheduleOptions}
                    optionLabel="name"
                    optionGroupLabel="name"
                    className="md:w-10rem me-1"
                    optionGroupChildren={["subItems", "subItems"]}
                    breakpoint="767px"
                    placeholder="Schedule"
                  />
                  <LinkCandidates />
                </span>
              </Col>

              <Col xxl={3} xl={12} lg={12} sm={12}>
                <div className="clr-icons">
                  {selectedJobsData.length > 0 ? <NotesJobs /> : <NotesJobs1 />}
                  <Tooltip
                    target=".expbtn"
                    content="Export"
                    position="bottom"
                    style={{ marginTop: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn me-1 expbtn"
                    title="Export"
                    onClick={() => setImportCsvIcons(!importCsvIcons)}
                  >
                    <i className="pi pi-file-export"></i>
                  </button>

                  {importCsvIcons && <span>{headerBtn}</span>}

                  <Tooltip
                    target=".clear"
                    content="Clear Search"
                    position="bottom"
                    style={{ marginTop: "5px" }}
                  />

                  <button
                    type="button"
                    className="btn btn-secondary icons-btn clear"
                    onClick={handleClearSearchJobs}
                  >
                    <i className="pi pi-sync"></i>
                  </button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <section className="allactjobs-table">
                  {/* Toast for notifications */}
                  <Toast ref={toast} />

                  {/* ContextMenu for right-click actions */}
                  <ContextMenu
                    model={menuModel}
                    ref={cm}
                    onHide={() => setSelectedJob(null)}
                  />

                  <div className="card1 mt-3 actjobsumtable">
                    <DataTable
                      ref={dt} // Reference for CSV export
                      value={jobsData.slice(first, first + rows)}
                      rows={rows}
                      first={first}
                      onPage={onPage}
                      dataKey="job_id"
                      loading={loading}
                      scrollable
                      emptyMessage="No records found."
                      selection={selectedJobsData}
                      onSelectionChange={e => setSelectedJobsData(e.value)}
                      selectionMode="multiple"
                      filters={filters}
                      filterDisplay="row"
                      // reorderableRows
                      resizableColumns
                      reorderableColumns
                      columnResizeMode="expand"
                      className="jobsallactive-table"
                      onContextMenu={e => {
                        cm.current.show(e.originalEvent) // Show the context menu
                        setSelectedJob(e.data) // Set the selected job
                      }}
                      contextMenuSelection={selectedJob}
                      onContextMenuSelectionChange={e =>
                        setSelectedJob(e.value)
                      }
                    >
                      <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                      />
                      <Column
                        field="job_id"
                        header="Project Code"
                        sortable
                        frozen
                        filter
                        style={{ minWidth: "8rem" }}
                      />
                      <Column
                        field="job_title"
                        header="Project Name"
                        sortable
                        filter
                      />
                      <Column
                        field="openings"
                        header="Project Manager"
                        sortable
                        filter
                      />

                      <Column
                        field="workplace_type"
                        header="Reason for Delay"
                        sortable
                        filter
                      />
                      <Column
                        field="job_start_date"
                        header="Start Date"
                        sortable
                        filter
                      />
                      <Column
                        field="job_end_date"
                        header="End Date"
                        sortable
                        filter
                      />
                      <Column
                        field="job_type"
                        header="Extended End Date"
                        sortable
                        filter
                      />
                      <Column
                        field="hiring_manager"
                        header="# Tasks"
                        sortable
                        filter
                        style={{ textAlign: "center" }}
                      />
                      <Column
                        field="company"
                        header="# Completed Tasks"
                        sortable
                        filter
                      />
                    </DataTable>
                  </div>
                </section>
              </Col>
            </Row>

            {/* Side bar start */}
            <Row>
              <Col lg={12}>
                <Sidebar
                  visible={visibleRight}
                  position="right"
                  className="sidebar"
                  onHide={() => setVisibleRight(false)}
                >
                  <div className="sidebar-header">
                    <h3>Create a Project</h3>
                    <div className="d-flex align-items-center">
                      <Button
                        icon="pi pi-pencil"
                        className="p-button-text edit-btn rounded-2 p-2"
                        style={{ backgroundColor: '#f0f0f0' }} // Optional: light background
                        title="Edit Project"
                        onClick={() => navigate('/jobs-editform')}
                      />
                      <Button
                        icon="pi pi-times"
                        className="p-button-text close-btn"
                        onClick={() => setVisibleRight(false)}
                      />
                    </div>
                  </div>

                  <div className="card sidebardetails">
                    <Row className="mb-0">

                      <Col lg={6}>
                        <div className="field">
                          <label htmlFor="jobId" className="mb-1">
                            Project Code{" "}
                          </label>
                          <InputText
                            id="jobId"
                            placeholder="Job-101"
                            className="w-full"
                            value={jobid}
                            disabled
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="p-field">
                          <label htmlFor="jobTitle" className="p-d-block">
                            Project Name <span className="text-danger">*</span>
                          </label>
                          <InputText
                            id="jobTitle"
                            placeholder="Web Developer"
                            className="p-d-block"
                            value={jobtitle}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col lg={6}>
                        <div className="p-field">
                          <label htmlFor="hiringManager">Select Company</label>
                          <select
                            className="form-select profileDetailsInput w-full"
                            id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                            aria-label="Default select example"
                          >
                            <option value="">Varun Digital Media</option>
                            <option value="Office">Varun Digital Media</option>
                            <option value="Remote">
                              Pranathi Software Services
                            </option>
                            <option value="Hybrid">
                              Vitel Global Communications
                            </option>
                          </select>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="p-field">
                          <label htmlFor="hiringManager">Project Manager</label>
                          <select
                            className="form-select profileDetailsInput w-full"
                            id="MyPro_EmpDet_Team_WorkInfo_DesSelBox"
                            aria-label="Default select example"
                          >
                            <option value="">Mahesh Kumar Bhoga</option>
                            <option value="Office">Mahesh Kumar Bhoga</option>
                            <option value="Remote">Salmanuddin Sayyad</option>
                            <option value="Hybrid">Girish Bodepudi</option>
                          </select>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col lg={6}>
                        <label htmlFor="jobStartDate" className="p-mb-2">
                          Project Start Date
                        </label>
                        <Calendar
                          id="jobStartDate"
                          value={jobStartDate}
                          onChange={e => setJobStartDate(e.value)}
                          dateFormat="dd/mm/yy"
                          placeholder="20/04/2025"
                          className="w-full activejobdrop"
                          showIcon
                        />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="jobEndDate" className="mr-2">
                          Project End Date
                        </label>
                        <Calendar
                          id="jobEndDate"
                          value={jobEndDate}
                          onChange={e => setJobEndDate(e.value)}
                          dateFormat="dd/mm/yy"
                          placeholder="20/05/2025"
                          className="w-full activejobdrop"
                          showIcon
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col lg={12}>
                        <label htmlFor="projectStatus" className="mr-2">
                          Project Status
                        </label>
                        <Select
                          id="projectStatus"
                          name="projectStatus"
                          options={[
                            { value: "Active", label: "Active" },
                            { value: "In Active", label: "In Active" },
                            { value: "On Hold", label: "On Hold" }
                          ]}
                          value={{
                            value: selectedProjectStatus,
                            label: selectedProjectStatus
                          }}
                          onChange={(option) => setSelectedProjectStatus(option.value)}
                          placeholder="Select status"
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2 d-flex justify-content-between align-items-end">
                      <Col lg={6}>
                        <div className="">
                          <label htmlFor="descriptionEditor">Description</label>
                        </div>
                      </Col>
                      <Col lg={6} className="d-flex justify-content-end mt-2">
                        <Button
                          color="primary"
                          className="btn btn-primary aibtn"
                        >
                          <i class="pi pi-star me-1"></i>
                          Write with AI
                        </Button>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col lg={12}>
                        <div className="">
                          <Editor
                            value={text}
                            onTextChange={e => setText(e.htmlValue)}
                            headerTemplate={header}
                            style={{ height: "140px" }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col lg={12}>
                        <label
                          htmlFor="availabilityDate"
                          className="mb-0 avbdate"
                        >
                          Files Upload
                        </label>

                        <input
                          type="file"
                          accept="image/jpg,image/jpeg,image/png,image/pdf"
                          className="form-control addEmp_ProfilePhoto"
                          id="MyPro_UploadedProfilePhoto_Modal_FilesInput"
                        />

                        <small className="text-danger">
                          {" "}
                          {PoliciesfilesErrorMessagepan}
                        </small>
                        <small className="text-muted">
                          Eg: (pdf,word,excel,zip)
                        </small>
                      </Col>


                      <Col lg={6}>
                        <div className="p-field mt-3">
                          <label htmlFor="jobType">Categories</label>
                          <TreeSelect
                            value={selectedCategoryKey}
                            onChange={e => setSelectedCategoryKey(e.value)}
                            options={categories}
                            filter
                            className="w-full"
                            placeholder="Frontend"
                          ></TreeSelect>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="p-field mt-3">
                          <label htmlFor="jobType">Groups</label>
                          <TreeSelect
                            value={selectedGroupKey}
                            onChange={e => setSelectedGroupKey(e.value)}
                            options={groups}
                            filter
                            className="w-full"
                            placeholder="HTML, CSS"
                          ></TreeSelect>
                        </div>
                      </Col>
                    </Row>

                    <Row className="justify-content-end align-items-end mt-2">
                      <Col lg={6}>
                        <div className="p-field">
                          <input type="checkbox" className="me-2" checked />
                          <label htmlFor="jobType">Private</label>
                        </div>
                      </Col>
                      <Col lg={6} className="d-flex justify-content-end">
                        <Button
                          color="primary"
                          className="btn btn-primary sidebarbtn"
                          onClick={() => setVisibleRight(false)}
                        >
                          Create
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Sidebar>
              </Col>
            </Row>
            {/* Side bar end */}
          </div>
        </Container>
      </div>

      {/* view page starts */}
      <Row>
        <Col lg={12}>
          <Sidebar
            visible={visibleViewRight}
            position="right"
            onHide={() => setVisibleViewRight(false)}
            className="view-form-sidebar"
          >
            <div className="sidebar-header">
              <h3 className="head">
                <i className="pi pi-folder me-1"></i> Project - Project Name
              </h3>
              <div className="d-flex align-items-center">
                <Link to="/jobs-editform">
                  <p className="mb-0 text-white">
                    {" "}
                    <i class="fa-regular fa-pen-to-square me-3"></i>{" "}
                  </p>
                </Link>
                <Button
                  icon="pi pi-times"
                  className="p-button-text close-btn"
                  onClick={() => setVisibleViewRight(false)}
                />
              </div>
            </div>
            <TabView className="mt-4">
              <TabPanel header="Project" leftIcon="pi pi-folder mr-2">
                <Row>
                  <Col lg={12}>
                    <Accordion activeIndex={0}>
                      <AccordionTab
                        header={
                          <span className="flex align-items-center gap-2 w-full">
                            <span className="white-space-nowrap">
                              PROFILE INFORMATION
                            </span>
                            <Badge value="-" className="ml-auto" />
                          </span>
                        }
                      >
                        <Row>
                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="jobId">Project Code</label>
                              <InputText
                                id="jobId"
                                placeholder="Job-101"
                                className="w-full"
                                value={jobid}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="jobTitle">Project Name</label>
                              <InputText
                                id="jobTitle"
                                placeholder="Web Developer"
                                className="w-full"
                                value={jobtitle}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="company">Company</label>
                              <InputText
                                id="company"
                                placeholder="Varun Digital Media"
                                className="w-full"
                                value={company}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="hiringManager">
                                Project Manager
                              </label>
                              <InputText
                                id="hiringManager"
                                placeholder="Mahesh Kumar Bhoga"
                                className="w-full"
                                value={hiringmanager1}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="jobType">Categories</label>
                              <InputText
                                id="categories"
                                placeholder="Frontend"
                                className="block w-full"
                                value={categ}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="jobType">Groups</label>
                              <InputText
                                id="groups"
                                placeholder="HTML, CSS"
                                className="block w-full"
                                value={group}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="workplaceType">
                                Workplace Type
                              </label>
                              <InputText
                                id="workplaceType"
                                placeholder="Work From Office"
                                className="w-full"
                                value={workplace}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="jobStartDate" className="block">
                                Project Start Date
                              </label>
                              <InputText
                                id="ProjectStartDate"
                                placeholder="01-01-2025"
                                className="block w-full"
                                value={jobstart}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="field">
                              <label htmlFor="jobEndDate" className="block">
                                Project End Date
                              </label>
                              <InputText
                                id="jobEndDate"
                                placeholder="31-12-2025"
                                className="block w-full"
                                value={jobend}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="p-field">
                              <label htmlFor="jobType">UserID</label>
                              <InputText
                                id="userIds"
                                placeholder="Harish"
                                className="block w-full"
                                value={userids}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col lg={12}>
                            <div className="field">
                              <label htmlFor="description">Description</label>
                              <InputTextarea
                                id="description"
                                // value={text}
                                placeholder=""
                                rows={4}
                                cols={30}
                                className="w-full"
                                value={description1}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={12}>
                            <div className="p-field">
                              <label htmlFor="jobType" className="block">
                                Notes
                              </label>
                              <InputTextarea
                                // autoResize
                                // rows={2}
                                // cols={20}
                                placeholder=""
                                className="w-full"
                                value={notes1}
                              />
                            </div>
                          </Col>
                        </Row>
                      </AccordionTab>
                      <AccordionTab
                        header={
                          <span className="flex align-items-center gap-2 w-full">
                            <span className="white-space-nowrap">
                              DOCUMENTS
                            </span>
                            <Badge value="-" className="ml-auto" />
                          </span>
                        }
                      >
                        <Row>
                          <Col lg={12}>
                            <div className="doc-table">
                              <TreeTable
                                value={documents}
                                tableStyle={{ minWidth: "50rem" }}
                              >
                                <Column
                                  field="certificate_name"
                                  header="Document Type"
                                  body={rowData =>
                                    editableTemplate(
                                      rowData,
                                      "certificate_name"
                                    )
                                  }
                                />
                                <Column
                                  field="docSubject"
                                  header="Document Subject"
                                  body={rowData =>
                                    editableTemplate(rowData, "docSubject")
                                  }
                                />
                                <Column
                                  field="created_at"
                                  header="Applied Date & Time"
                                />
                                <Column
                                  body={actionTemplate}
                                  header="Actions"
                                />
                              </TreeTable>
                            </div>
                          </Col>
                        </Row>
                      </AccordionTab>
                    </Accordion>
                  </Col>
                </Row>
              </TabPanel>

              <TabPanel header="Estimates" leftIcon="pi pi-sitemap mr-2">
                <Row>
                  <Col lg={12}>
                    <EstimateTable />

                    <Row className="mt-5">
                      <Col lg={12}>
                        <div className="doc-table">
                          <TreeTable
                            value={documents}
                            tableStyle={{ minWidth: "50rem" }}
                          >
                            <Column
                              field="certificate_name"
                              header="Document Type"
                              body={rowData =>
                                editableTemplate(
                                  rowData,
                                  "certificate_name"
                                )
                              }
                            />
                            <Column
                              field="docSubject"
                              header="Document Subject"
                              body={rowData =>
                                editableTemplate(rowData, "docSubject")
                              }
                            />
                            <Column
                              field="created_at"
                              header="Applied Date & Time"
                            />
                            <Column
                              body={actionTemplate}
                              header="Actions"
                            />
                          </TreeTable>
                        </div>
                      </Col>
                    </Row>
                    <Accordion activeIndex={0}>
                    </Accordion>
                  </Col>
                </Row>
              </TabPanel>


              <TabPanel header="Activities" leftIcon="pi pi-calendar mr-2">
                <Row>
                  <Col lg={12}>
                    <section className="job-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                        <DataTable
                          responsive
                          showGridlines
                          value={activities}
                          tableStyle={{
                            minWidth: "50rem",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                          paginator
                          rows={5}
                          rowsPerPageOptions={[5, 10, 25, 50]}
                          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                          currentPageReportTemplate="{first} to {last} of {totalRecords}"
                          filters={activitiesFilters}
                          filterDisplay="row"
                          globalFilterFields={[
                            "type",
                            "sub_type",
                            "priority",
                            "subject",
                            "date_time",
                            "user_id",
                          ]}
                          emptyMessage="No activities found."
                          selection={selectedActivities}
                          onSelectionChange={e => setSelectedActivities(e.value)}
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
                          <Column
                            field="type"
                            header="Type"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="sub_type"
                            header="Sub Type"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="priority"
                            header="Priority"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="subject"
                            header="Subject"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="date_time"
                            header="Date and Time"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="user_id"
                            header="User ID"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                        </DataTable>
                      </div>
                    </section>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel header="Work Type" leftIcon="pi pi-check-square mr-2">
                <Row>
                  <Col lg={12}>
                    <div className="pipelinetabs">
                      <TabView
                        scrollable
                        style={{ maxWidth: "1200px", overflow: "hidden" }}
                      >
                        <TabPanel
                          header="To Do"
                          rightIcon={
                            <Badge
                              value={receivedJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">

                                  <DataTable
                                    value={receivedJobs}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={receivedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "Estimated Work Hours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No jobs found."
                                    selection={selectedReceivedJobs}
                                    onSelectionChange={e =>
                                      setSelectedReceivedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="Estimated Work Hours"
                                      header="Estimated Work Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>
                        <TabPanel
                          header="In Progress"
                          rightIcon={
                            <Badge
                              value={potentialJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">


                                  <DataTable
                                    value={potentialJobs.map(job => ({
                                      ...job,
                                      EstimatedWorkHours:
                                        job["Estimated Work Hours"], // remap to remove space
                                    }))}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={potentialJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "EstimatedWorkHours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No potential jobs found."
                                    selection={selectedPotentialJobs}
                                    onSelectionChange={e =>
                                      setSelectedPotentialJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="EstimatedWorkHours"
                                      header="Estimated Work Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project Name"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>

                        <TabPanel
                          header="In Review"
                          rightIcon={
                            <Badge
                              value={submittedJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">


                                  <DataTable
                                    value={submittedJobs}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={submittedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "Estimated Work Hours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No submitted jobs found."
                                    selection={selectedSubmittedJobs}
                                    onSelectionChange={e =>
                                      setSelectedSubmittedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="Estimated Work Hours"
                                      header="Est. Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project Name"
                                      sortable
                                      filter
                                      style={{ minWidth: "14rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>
                        <TabPanel
                          header="Ready for QA"
                          rightIcon={
                            <Badge
                              value={interviewJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">


                                  <DataTable
                                    value={interviewJobs}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={interviewJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "Estimated Work Hours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No interview jobs found."
                                    selection={selectedInterviewJobs}
                                    onSelectionChange={e =>
                                      setSelectedInterviewJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="Estimated Work Hours"
                                      header="Est. Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project Name"
                                      sortable
                                      filter
                                      style={{ minWidth: "14rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>
                        <TabPanel
                          header="QA in Progress"
                          rightIcon={
                            <Badge
                              value={offerJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">


                                  <DataTable
                                    value={offerJobs}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={offerJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "Estimated Work Hours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No offer jobs found."
                                    selection={selectedOfferJobs}
                                    onSelectionChange={e =>
                                      setSelectedOfferJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="Estimated Work Hours"
                                      header="Est. Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project"
                                      sortable
                                      filter
                                      style={{ minWidth: "14rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>
                        <TabPanel
                          header="Blocked"
                          rightIcon={
                            <Badge
                              value={rejectedJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">

                                  <DataTable
                                    value={rejectedJobs.map(job => ({
                                      ...job,
                                      EstimatedWorkHours:
                                        job["Estimated Work Hours"], // remap key with spaces
                                    }))}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={rejectedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "EstimatedWorkHours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No rejected jobs found."
                                    selection={selectedRejectedJobs}
                                    onSelectionChange={e =>
                                      setSelectedRejectedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="EstimatedWorkHours"
                                      header="Estimated Work Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project Name"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                  </DataTable>
                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>

                        <TabPanel
                          header="Done or Closed"
                          rightIcon={
                            <Badge
                              value={placedJobs.length}
                              severity="success"
                              className="ml-2"
                            />
                          }
                          leftIcon="pi pi-cog mr-1"
                        >
                          <Row>
                            <Col lg={12}>
                              <section className="job-datatable-section">
                                <div className="card1 mt-3 mb-4 actjobsumtable">
                                  <DataTable
                                    value={placedJobs}
                                    responsiveLayout="scroll"
                                    showGridlines
                                    tableStyle={{
                                      minWidth: "60rem",
                                      borderRadius: "8px",
                                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    filters={placedJobsFilters}
                                    filterDisplay="row"
                                    globalFilterFields={[
                                      "task_status",
                                      "task_code",
                                      "task_name",
                                      "Estimated Work Hours",
                                      "start_date",
                                      "end_date",
                                      "project_name",
                                      "assigned_to",
                                    ]}
                                    emptyMessage="No placed jobs found."
                                    selection={selectedPlacedJobs}
                                    onSelectionChange={e =>
                                      setSelectedPlacedJobs(e.value)
                                    }
                                    selectionMode="multiple"
                                    resizableColumns
                                    columnResizeMode="expand"
                                  >
                                    <Column
                                      selectionMode="multiple"
                                      headerStyle={{ width: "3em" }}
                                    />
                                    <Column
                                      field="task_status"
                                      header="Work Type Status"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_code"
                                      header="Work Type Code"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="task_name"
                                      header="Summary"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                    <Column
                                      field="Estimated Work Hours"
                                      header="Est. Hours"
                                      sortable
                                      filter
                                      style={{ minWidth: "4rem" }}
                                      className="dis-tablecenter"
                                    />
                                    <Column
                                      field="start_date"
                                      header="Start Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="end_date"
                                      header="End Date"
                                      sortable
                                      filter
                                      style={{ minWidth: "10rem" }}
                                    />
                                    <Column
                                      field="project_name"
                                      header="Project"
                                      sortable
                                      filter
                                      style={{ minWidth: "14rem" }}
                                    />
                                    <Column
                                      field="assigned_to"
                                      header="Assigned To"
                                      sortable
                                      filter
                                      style={{ minWidth: "12rem" }}
                                    />
                                  </DataTable>


                                </div>
                              </section>
                            </Col>
                          </Row>
                        </TabPanel>
                      </TabView>
                    </div>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel header="History" leftIcon="pi pi-clock mr-2">
                <Row>
                  <Col lg={12} sm={12}>
                    <section className="job-datatable-section">
                      <div className="card1 mt-3 mb-4 actjobsumtable">
                        <DataTable
                          responsive
                          showGridlines
                          value={history}
                          tableStyle={{
                            minWidth: "50rem",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                          paginator
                          rows={5}
                          rowsPerPageOptions={[5, 10, 25, 50]}
                          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                          currentPageReportTemplate="{first} to {last} of {totalRecords}"
                          filters={historyFilters}
                          filterDisplay="row"
                          globalFilterFields={[
                            "type",
                            "sub_type",
                            "priority",
                            "subject",
                            "date_time",
                            "user_id",
                          ]}
                          emptyMessage="No history found."
                          selection={selectedHistory}
                          onSelectionChange={e => setSelectedHistory(e.value)}
                          selectionMode="multiple"
                          resizableColumns
                          columnResizeMode="expand"
                        >
                          <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3em" }}
                          />
                          <Column
                            field="type"
                            header="Type"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="sub_type"
                            header="Sub Type"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="priority"
                            header="Priority"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="subject"
                            header="Subject"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="date_time"
                            header="Date and Time"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="user_id"
                            header="User ID"
                            sortable
                            filter
                            style={{ minWidth: "10rem" }}
                          />
                        </DataTable>
                      </div>
                    </section>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel header="Notes" leftIcon="pi pi-pencil mr-2">
                <Row>
                  <Col lg={12}>
                    <div className="d-flex justify-content-end">
                      <Button
                        type="button"
                        label="Add Notes"
                        icon="pi pi-plus"
                        className="btn btn-primary waves-effect waves-light me-2 sidebarbtn"
                        onClick={handleAddNotes}
                      />
                    </div>
                  </Col>
                </Row>

                {isEditorVisible && (
                  <Row className="mt-4">
                    <Col lg={12}>
                      <Editor
                        value={editorContent}
                        onTextChange={e => setEditorContent(e.htmlValue)}
                        style={{ height: "200px" }}
                        placeholder="Enter your notes here..."
                      />
                      <div className="d-flex justify-content-end mt-2">
                        <Button
                          type="button"
                          label="Save"
                          icon="pi pi-save"
                          className="btn btn-success me-2"
                          onClick={handleSaveNotes}
                        />
                        <Button
                          color="primary"
                          className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                          onClick={handleCancelNotes}
                        >
                          <i className="pi pi-times me-1"></i>
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}

                <Row className="mt-4 notes">
                  <Col lg={12}>
                    {candidateNotes.length > 0 && (
                      <Card className="pt-0 pb-0">
                        {candidateNotes.map((note, index) => (
                          <div key={index}>
                            <div className="d-flex mt-0">
                              <strong className="text-muted me-4">
                                {note.candidateName}
                              </strong>
                              <strong className="text-muted">
                                {note.timestamp}
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between mt-2 mb-0">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: note.content,
                                }}
                              />
                              <div>
                                <Button
                                  icon="pi pi-pencil"
                                  className="btn btn-warning editbtn p-0"
                                  onClick={() => handleEditNote(index)}
                                />
                                <Button
                                  icon="pi pi-trash"
                                  className="btn btn-danger deletebtn"
                                  onClick={() => handleDeleteNote(index)}
                                />
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))}
                      </Card>
                    )}
                  </Col>
                </Row>
              </TabPanel>
            </TabView>
          </Sidebar>
        </Col>
      </Row>

      <Dialog
        header="Appointment - LavanKumar Kalvala"
        visible={interviewpop}
        className="interview-popup"
        style={{ width: "50vw" }}
        onHide={() => {
          SetInterviewpop(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype}
                      onChange={e => setintertype(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeInterview1}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Job Status</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={typeInterview}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <LinkJobsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Candidate</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Select Candidates`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Interview Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
      {/* Interview schedule end */}

      {/* Interview schedule call start */}
      <Dialog
        header="Appointment - Lavankumar Kalvala"
        visible={interviewpopCall}
        className="interview-popup"
        style={{ width: "50vw" }}
        // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
        onHide={() => {
          SetInterviewpopCall(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype3}
                      onChange={e => setintertype1(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeCall}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Job Status</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={typeInterview}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <LinkJobsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Candidate</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Lavankumar Kalvala`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Interview Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
      {/* Interview schedule call end */}

      {/* Interview schedule meeting start */}
      <Dialog
        header="Appointment - Lavankumar Kalvala"
        visible={interviewpopMeeting}
        className="interview-popup"
        style={{ width: "50vw" }}
        onHide={() => {
          SetInterviewpopMeeting(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype2}
                      onChange={e => setintertype(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeMeeting}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Project</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={jobStatusDrop}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>


                <LinkContactsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Task</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Lavankumar Kalvala`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
      {/* Interview schedule meeting end */}

      {/* Interview schedule Task start */}
      <Dialog
        header="Appointment - Lavankumar Kalvala"
        visible={interviewpopTask}
        className="interview-popup"
        style={{ width: "50vw" }}
        // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
        onHide={() => {
          SetInterviewpopTask(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype1}
                      onChange={e => setintertype1(e.target.value)}
                    />

                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeInterview}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Project</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={jobStatusDrop}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <LinkContactsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Task</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Lavankumar Kalvala`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
      {/* Interview schedule Task end */}

      {/* Interview schedule Event start */}
      <Dialog
        header="Appointment - Lavankumar Kalvala"
        visible={interviewpopEvent}
        className="interview-popup"
        style={{ width: "50vw" }}
        // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
        onHide={() => {
          SetInterviewpopEvent(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype5}
                      onChange={e => setintertype1(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeInterview}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Project</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={jobStatusDrop}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <LinkContactsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Task</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Lavankumar Kalvala`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
      {/* Interview schedule Event end */}

      {/* Interview schedule Other start */}
      <Dialog
        header="Appointment - Lavankumar Kalvala"
        visible={interviewpopOther}
        className="interview-popup"
        style={{ width: "50vw" }}
        onHide={() => {
          SetInterviewpopOther(false)
        }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText
                      disabled
                      value={intertype5}
                      onChange={e => setintertype1(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="integer" className=" block">
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={e => setSubtype(e.value)}
                      options={typeInterview}
                      optionLabel="name"
                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={e => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={e => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={e => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>

                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={e => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Project</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={jobStatusDrop}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <LinkContactsPopup />
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Task</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => {
                        condidatelist(e)
                      }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Lavankumar Kalvala`}
                      maxSelectedLabels={0}
                      className="w-full"
                    />
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText
                      placeholder="Subject"
                      value={subjectval}
                      onChange={e => setsubjectval(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={e => setPopTextares(e.target.value)}
                      placeholder="Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label For="Priority" className=" block">
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={e => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Completed
                            </label>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">
                              Private
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips
                    value={userid}
                    onChange={e => setUserid(e.value)}
                    itemTemplate={customChip}
                    className="w-full"
                  />
                </Col>
              </Row>
            </div>

            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light btn btn-primary me-2 btn-main"
                  >
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </p>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
export default JobAllActive
