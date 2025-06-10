import React, { useState, useRef, useEffect  } from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
// import { DollarIcon, MapIcon, ClockIcon } from 'primereact/icons';

import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Tag } from "primereact/tag"
import { Avatar } from "primereact/avatar"
import { Panel } from "primereact/panel"
import { Menu } from "primereact/menu";

const ReminderPopup = () => {
  const [visibleReminder, setVisibleReminder] = useState(false)

  const [selectedInterview, setSelectedInterview] = useState(null)
  

  const interviews = [
    {
      id: 1,
      jobid:"Job-101",
      candidate: "Aakash Sharma",
      role: "Business Analyst",
      company: "Technology India",
      date: "1/14/25",
      time: "4:40 PM",
      phone: "-9014838178",
      email: "aaksharma123@hotmail.com",
      type: "Video Interview",
      status: "Interview",
      contact: "Megan, CFO",
    },
    {
      id: 2,
      jobid:"Job-102",
      candidate: "Sarah Johnson",
      role: "Senior Developer",
      date: "1/15/25",
      time: "2:30 PM",
      type: "Audio Interview",
      status: "Call",
      company: "Tech Solutions",
      phone: "-9014838179",
      email: "sarah.j@tech.com",
      contact: "John, CTO",
    },
    {
      id: 3,
      jobid:"Job-103",
      candidate: "Mike Chen",
      role: "Product Manager",
      date: "1/16/25",
      time: "11:00 AM",
      type: "Talent Scan",
      status: "Meeting",
      company: "Innovation Corp",
      phone: "-9014838180",
      email: "mike.c@innovation.com",
      contact: "Lisa, Head of Product",
    },
    {
      id: 4,
      jobid:"Job-104",
      candidate: "Joseph",
      role: "Senior Developer",
      date: "1/15/25",
      time: "2:30 PM",
      type: "Audio Interview",
      status: "Task",
      company: "Tech Solutions",
      phone: "-9014838179",
      email: "sarah.j@tech.com",
      contact: "John, CTO",
    },
  ]

  const getStatusSeverity = status => {
    switch (status) {
      case "Interviews":
        return "warning"
      case "Call":
        return "success"
      case "Meeting":
        return "info"
      default:
        return "neutral"
    }
  }

  const menu = useRef(null);

  const menuItems = [
    { label: "Open",},
    { label: "Delete"},
    { label: "Snooze"},
  ];

    const headerTemplate = (
      <div className="flex justify-content-between align-items-center interview-details ps-2">
        <span className="font-bold">Interview Details</span>
        <div>
          <Menu model={menuItems} popup ref={menu} />
          <Button
            icon="pi pi-ellipsis-v"
            className="p-button-text p-button-plain"
            onClick={(e) => menu.current.toggle(e)}
          />
        </div>
      </div>
    );

    // const HeaderTemplate = ({ interview, menuItems, menu }) => (
    //   <div className="flex justify-content-between align-items-center interview-details ps-2">
    //     <span className="font-bold">{interview?.status} Details</span>
    //     <div>
    //       <Menu model={menuItems} popup ref={menu} />
    //       <Button
    //         icon="pi pi-ellipsis-v"
    //         className="p-button-text p-button-plain"
    //         onClick={(e) => menu.current.toggle(e)}
    //       />
    //     </div>
    //   </div>
    // );

    const popupShownRef = useRef(false);

    useEffect(() => {
      const checkTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
  
        // Show the popup only once when the time matches
        if (hours === 18 && minutes === 23 && seconds === 0 && !popupShownRef.current) {
          setVisibleReminder(true);
          setSelectedInterview(interviews[0]);
          popupShownRef.current = true; // Prevents re-triggering
          console.log("Popup opened at:", `${hours}:${minutes}:${seconds}`);
        }
      };
  
      const interval = setInterval(checkTime, 1000);
  
      return () => clearInterval(interval);
    }, [popupShownRef]);
    

  return (
    <div className="">
    {/* <Button
      label="Show"
      icon="pi pi-external-link"
      onClick={() => setVisible(true)}
    /> */}
    <Dialog
      header="Reminders"
      className="reminder-popup"
      visible={visibleReminder}
      style={{ width: "60vw" }}
      onHide={() => {
        if (!visibleReminder) return
        setVisibleReminder(false)
      }}
    >
    <div className="p-3">
{/* Header Section */}
<div className="flex justify-content-between align-items-center mb-3">

      {/* <div className="row"> */} 
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h3 className="text-xl">Activity Schedules</h3>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="flex gap-4">
                <span className="p-input-icon-left">
                  <i className="pi pi-search ms-1" />
                  <InputText style={{ width: '390px' }} placeholder="Search interviews..." />
                </span>
                <Button label="Filter" icon="pi pi-filter" className="p-button-outlined" />
              </div>
          </div>
      {/* </div> */}

</div>

{/* Main Content */}
<div className="grid grid-nogutter">
{/* Left: Interview List */}
<div className="col-lg-6 col-md-12 col-sm-12">
  <div className="grid">
    {interviews.map((interview) => (
      <div key={interview.id} className="col-12">
        <Card
          className={`cursor-pointer ${
            selectedInterview?.id === interview.id ? 'active-card1' : ''
          }`}
          onClick={() => {
            console.log('Selected Interview:', interview);
            setSelectedInterview(interview);
          }}
        >
          <div className="d-flex justify-content-between align-items-top">
            {/* Left Side */}
            <div className="flex-grow-1 m-0 p-0">
              <div className="d-flex align-items-start gap-2">
                <div className="mr-1">
                  <i className="pi pi-user mt-1 profile-back" />
                </div>
                <div>
                  <p className="text-gray-600 m-0 profile-name">{interview.candidate}</p>
                  <p className="role-name">{interview.role}</p>
                  <div className="d-flex align-items-center gap-2 text-sm m-0">
                    <i className="pi pi-clock" />
                    {interview.time}{' '}
                    <i className="pi pi-calendar" /> {interview.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-right d-flex flex-column align-items-end">
              <Tag
                value={interview.status}
                severity={getStatusSeverity(interview.status)}
                className="mb-1"
              />
              <p className="text-sm m-0">{interview.type}</p>
            </div>
          </div>
        </Card>
      </div>
    ))}
  </div>
</div>

{/* Right: Selected Interview Details */}
<div className="col-lg-6 col-md-12 col-sm-12 ps-2">
  {selectedInterview ? (
   <Panel headerTemplate={<div className="flex justify-content-between align-items-center interview-details ps-2">
    <span className="font-bold">{selectedInterview.type} Details</span>
    <div>
      <Menu model={menuItems} popup ref={menu} />
      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-text p-button-plain"
        onClick={(e) => menu.current.toggle(e)}
      />
    </div>
  </div>}>
    <div className="mb-2">
      <h3>Candidate</h3>
      <div className="flex align-items-start gap-2">
        <Avatar
          className="mt-1"
          label={selectedInterview.candidate[0]}
          shape="circle"
        />
        <div>
          <p className="font-bold mb-0">{selectedInterview.candidate}</p>
          <p className="text-sm text-gray-600 mb-1">
            {selectedInterview.company}
          </p>
        </div>
      </div>
    </div>

    <div className="flex align-items-start gap-2">
      <div>
        <i className="pi pi-building mt-1 profile-back" />
      </div>
      <div>
        <p className="font-bold mb-0">{selectedInterview.role}</p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="me-1">Job ID:</span>
          {selectedInterview.jobid}
        </p>
      </div>
    </div>

    <div className="mb-2">
      <div className="flex align-items-start gap-2">
        <i className="pi pi-envelope profile-back" />
        <p className="mt-1">{selectedInterview.email}</p>
      </div>
      <div className="flex align-items-start gap-2">
        <i className="pi pi-phone profile-back" />
        <p className="mt-1">{selectedInterview.phone}</p>
      </div>
      <div className="flex align-items-start gap-2">
        <i className="pi pi-briefcase profile-back" />
        <p className="mt-1">{selectedInterview.contact}</p>
      </div>
    </div>

    <div className="gap-2">
      <div className="d-flex justify-content-around gap-2">
        <Button
          label="Completed"
          className="p-button-primary reminder-btn"
        />
        <Button
          label="Snooze"
          className="p-button-outlined reminder-btn"
        />
      </div>

      <div className="d-flex justify-content-center">
        <Button
          label="Cancel Interview"
          className="p-button-danger reminder-btnfull"
        />
      </div>
    </div>
  </Panel>
  ) : (
    <div className="flex align-items-center justify-content-center text-gray-500">
      Select an interview to view details
    </div>
  )}
</div>
</div>
</div>
    </Dialog>
  </div>
  )
}

export default ReminderPopup;
