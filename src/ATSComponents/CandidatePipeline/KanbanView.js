import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Toast } from "primereact/toast";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AutoComplete } from "primereact/autocomplete";

const KanbanView = () => {
  const toast = useRef(null);
  const containerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // Initial data structure
  const initialData = {
    received: [
      { id: "r1", name: 'Lavankumar Kalvala', jobTitle: 'Frontend Developer', company: 'Infosys', startDate: '15-01-2025', jobId: 'Job-101', recruiter: "Harish", jobStatus: "Active", email: "lavan9@infosys.com", phone: "987654321", city: "Hyderabad", state: "Telangana" },

      { id: "r2", name: 'Venkata Laxmi Valle', jobTitle: 'Frontend Developer', company: 'Cognizant PVT LTD', startDate: '16-01-2025', jobId: 'Job-101', recruiter: "Pavan" },

      { id: "r3", name: 'Bhargavi	Sunanda', jobTitle: 'SEO', company: 'Capgemini Limited', startDate: '17-01-2025', jobId: 'Job-103', recruiter: "Harish" },

      { id: "r4", name: 'Nagendra	Meriga', jobTitle: 'Content Writer', company: 'CA Technologies', startDate: '18-01-2025', jobId: 'Job-104', recruiter: "Harish" },
    ],
    potential: [
      { id: "p1", name: 'Ruchitha	Emmadi', jobTitle: 'Frontend Developer', company: 'Tarun Digital Media', startDate: '15-01-2025', jobId: 'Job-101' },
      { id: "p2", name: 'Saikumar	Kunda', jobTitle: 'Backend Engineer', company: 'L&T Mindtree', startDate: '17-01-2025', jobId: 'Job-106' },
      { id: "p3", name: 'Vasanth	Gudula', jobTitle: 'Data Scientist', company: 'Ram Software Services', startDate: '22-01-2025', jobId: 'Job-107' },
      { id: "p4", name: 'Ajay	Edavena', jobTitle: 'Web Developer', company: '	Citel Global Communication', startDate: '23-01-2025', jobId: 'Job-101' },
    ],
    submitted: [
      { id: "s1", name: 'Chandana	Modugula', jobTitle: 'Frontend Developer', company: 'Sai Digital Media', startDate: '25-01-2025', jobId: 'Job-101' },
      { id: "s2", name: 'RajaShekar	Konda', jobTitle: 'Graphic Designer', company: 'Mahesh Digital Media', startDate: '26-01-2025', jobId: 'Job-102' },
      { id: "s3", name: 'Naveen Reddy', jobTitle: 'Frontend Developer', company: 'Twitter', startDate: '27-01-2025', jobId: 'Job-101' },
      { id: "s4", name: 'Prasad Shetty', jobTitle: 'Frontend Developer', company: 'Uber', startDate: '28-01-2025', jobId: 'Job-101' },
    ],
    interviews: [
      { id: "i1", name: 'Joe Erla', jobTitle: 'Graphic Designer', company: 'TCS', startDate: '16-01-2025', jobId: 'Job-102' },
      { id: "i2", name: 'Sathish Kumar', jobTitle: 'Data Scientist', company: 'Wipro', startDate: '22-01-2025', jobId: 'Job-107' },
      { id: "i3", name: 'Saikumar Kondu', jobTitle: 'Backend Developer', company: 'HCL', startDate: '26-01-2025', jobId: 'Job-106' },
      { id: "i4", name: 'Amarnath kumar', jobTitle: 'UI/UX', company: 'Deloitte', startDate: '29-01-2025', jobId: 'Job-108' },
    ],
    offered: [
      { id: "o1", name: 'Harika', jobTitle: 'Planning Session', company: 'Infosys', startDate: '16-01-2025', jobId: 'Job-117' },
      { id: "o2", name: 'Mounika', jobTitle: 'Data Analysis', company: 'Capgemini', startDate: '24-01-2025', jobId: 'Job-118' },
      { id: "o3", name: 'Nithin kumar', jobTitle: 'Code Review', company: 'Accenture', startDate: '27-01-2025', jobId: 'Job-119' },
      { id: "o4", name: 'Mahesh kumar', jobTitle: 'Frontend Developer', company: 'IBM', startDate: '31-01-2025', jobId: 'Job-120' },
    ],
    rejected: [
      { id: "re1", name: 'Chandra Shekar', jobTitle: 'Frontend Developer', company: 'SAP', startDate: '16-01-2025', jobId: 'Job-101' },
      { id: "re2", name: 'Ranjith Kumar', jobTitle: 'Backend Developer', company: 'Dell', startDate: '17-01-2025', jobId: 'Job-106' },
      { id: "re3", name: 'Pramod kumar', jobTitle: 'Graphic Designer', company: 'HP', startDate: '18-01-2025', jobId: 'Job-108' },
      { id: "re4", name: 'Rajashekar Damera', jobTitle: 'Backend Developer', company: 'Cisco', startDate: '19-01-2025', jobId: 'Job-104' },
    ],
    closed: [
      { id: "c1", name: 'Naveen Kandula', jobTitle: 'Frontend Developer', company: 'Adobe', startDate: '24-02-2025', jobId: 'Job-101' },
      { id: "c2", name: 'Darmesh Kumar', jobTitle: 'Frontend Developer', company: 'PayPal', startDate: '25-02-2025', jobId: 'Job-101' },
      { id: "c3", name: 'Prem Kumar', jobTitle: 'Backend Developer', company: 'Spotify', startDate: '06-02-2025', jobId: 'Job-127' },
      { id: "c4", name: 'Neha Pandey', jobTitle: 'Backend Developer', company: 'Atlassian', startDate: '07-02-2025', jobId: 'Job-128' },
    ]
  };

  // State to manage the kanban data
  const [kanbanData, setKanbanData] = useState(initialData);
  // Store original data for filtering
  const [originalData, setOriginalData] = useState(initialData);

  // Filter states
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [candidate, setCandidate] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Track which item is being dragged
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragSourceColumn, setDragSourceColumn] = useState(null);
  // Track the element being dragged over (for within-column reordering)
  const [dragOverItemId, setDragOverItemId] = useState(null);
  // Track if we're dragging near edges to trigger scrolling
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentHoverColumn, setCurrentHoverColumn] = useState(null);

  // New state to track expanded columns
  const [expandedColumns, setExpandedColumns] = useState({});
  // Number of cards to show initially
  const CARDS_TO_SHOW = 4;

  // Define column structure with keys for identification
  const columns = [
    { id: "received", title: "Received" },
    { id: "potential", title: "Potential" },
    { id: "submitted", title: "Submitted" },
    { id: "interviews", title: "Interviews" },
    { id: "offered", title: "Offered/Accepted" },
    { id: "rejected", title: "Offer Rejected" },
    { id: "closed", title: "Placement Closed" }
  ];

  // Filter fields clear function
  const handleClear = () => {
    setSelectedRecruiter(null);
    setSelectedJobStatus(null);
    setSelectedJobTitle(null);
    setCandidate("");
    setSelectedCompany(null);
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
    setSelectedJob(null);

    // Reset kanban data to original state
    setKanbanData(originalData);
  };

  const applyFilters = () => {
    // Create a deep copy of the original data
    const filteredData = {};

    // Filter logic for each column
    Object.keys(originalData).forEach(columnId => {
      filteredData[columnId] = originalData[columnId].filter(item => {
        // Check each filter condition
        if (selectedJobTitle &&
          !item.jobTitle.toLowerCase().includes(selectedJobTitle.name.toLowerCase())) {
          return false;
        }

        if (candidate &&
          !item.name.toLowerCase().includes(candidate.toLowerCase())) {
          return false;
        }

        // Use the value from AutoComplete for company filtering
        if (value &&
          !item.company.toLowerCase().includes(value.toLowerCase())) {
          return false;
        }

        if (selectedJob &&
          item.jobId !== selectedJob.name) {
          return false;
        }

        // Job status filtering - if "closed" is selected, only show closed column items
        if (selectedJobStatus) {
          if (selectedJobStatus.value === "closed" && columnId !== "closed") {
            return false;
          }
          if (selectedJobStatus.value === "active" && columnId === "closed") {
            return false;
          }
        }

        // All filters passed
        return true;
      });
    });

    // Update kanban data with filtered results
    setKanbanData(filteredData);

    // Show notification
    toast.current?.show({
      severity: 'info',
      summary: 'Filters Applied',
      detail: 'The view has been updated based on your filters',
      life: 3000
    });
  };

  // Toggle expand/collapse for a column
  const toggleColumnExpand = (columnId) => {
    setExpandedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  // Auto-scroll when dragging near edges
  useEffect(() => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollSpeed = 15;
    const scrollThreshold = 100; // pixels from edge to start scrolling

    // Clear any existing scroll timer
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }

    // Check if we should scroll
    if (dragPosition.x > containerRect.right - scrollThreshold) {
      // Scroll right
      scrollTimerRef.current = setInterval(() => {
        container.scrollLeft += scrollSpeed;
      }, 30);
    } else if (dragPosition.x < containerRect.left + scrollThreshold) {
      // Scroll left
      scrollTimerRef.current = setInterval(() => {
        container.scrollLeft -= scrollSpeed;
      }, 30);
    }

    return () => {
      if (scrollTimerRef.current) {
        clearInterval(scrollTimerRef.current);
      }
    };
  }, [isDragging, dragPosition]);

  // Track mouse position during drag
  const onDragOver = (event, columnId = null) => {
    event.preventDefault();
    setDragPosition({ x: event.clientX, y: event.clientY });
    if (columnId && columnId !== currentHoverColumn) {
      setCurrentHoverColumn(columnId);
    }
  };

  // HTML5 Drag and Drop handlers
  const onDragStart = (event, itemId, columnId) => {
    event.dataTransfer.setData('itemId', itemId);
    event.dataTransfer.setData('sourceColumnId', columnId);
    setDraggedItemId(itemId);
    setDragSourceColumn(columnId);
    setIsDragging(true);

    // Add the dragging class for visual feedback
    if (event.target.classList) {
      event.target.classList.add('dragging');
    }
  };

  const onDragEnter = (event, itemId) => {
    if (draggedItemId !== itemId) {
      setDragOverItemId(itemId);
    }
  }

  const onDragEnd = (event) => {
    // Remove the dragging class
    if (event.target.classList) {
      event.target.classList.remove('dragging');
    }

    // Reset all drag state
    setDragOverItemId(null);
    setIsDragging(false);
    setCurrentHoverColumn(null);

    // Clear any active scroll timer
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };

  const onDrop = (event, dropColumnId) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('itemId');
    const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

    if (itemId && sourceColumnId) {
      // Create copies of both current filtered data and original data
      const newFilteredData = { ...kanbanData };
      const newOriginalData = { ...originalData };

      // Find the item from the source column in the filtered data
      const sourceColumnItems = [...newFilteredData[sourceColumnId]];
      const itemIndex = sourceColumnItems.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        const movedItem = sourceColumnItems[itemIndex];

        // Also find the item in the original data
        const originalSourceItems = [...newOriginalData[sourceColumnId]];
        const originalItemIndex = originalSourceItems.findIndex(item => item.id === itemId);

        // CASE 1: Reordering within the same column
        if (sourceColumnId === dropColumnId && dragOverItemId && itemId !== dragOverItemId) {
          // Remove the item from its current position in filtered data
          sourceColumnItems.splice(itemIndex, 1);

          // Find the position of the item being dragged over
          const dropIndex = sourceColumnItems.findIndex(item => item.id === dragOverItemId);

          // Insert the moved item at the new position
          if (dropIndex !== -1) {
            sourceColumnItems.splice(dropIndex, 0, movedItem);
            newFilteredData[sourceColumnId] = sourceColumnItems;

            // Also update original data
            if (originalItemIndex !== -1) {
              originalSourceItems.splice(originalItemIndex, 1);

              // Find where to insert in original data
              const originalDropIndex = originalSourceItems.findIndex(item => item.id === dragOverItemId);
              if (originalDropIndex !== -1) {
                originalSourceItems.splice(originalDropIndex, 0, movedItem);
              } else {
                originalSourceItems.push(movedItem);
              }

              newOriginalData[sourceColumnId] = originalSourceItems;
            }
          }
        }
        // CASE 2: Moving to a different column
        else if (sourceColumnId !== dropColumnId) {
          // Remove from source in filtered data
          sourceColumnItems.splice(itemIndex, 1);
          newFilteredData[sourceColumnId] = sourceColumnItems;

          // Remove from source in original data
          if (originalItemIndex !== -1) {
            originalSourceItems.splice(originalItemIndex, 1);
            newOriginalData[sourceColumnId] = originalSourceItems;
          }

          // Handle insertion in target column for filtered data
          if (dragOverItemId) {
            const targetColumnItems = [...newFilteredData[dropColumnId]];
            const dropIndex = targetColumnItems.findIndex(item => item.id === dragOverItemId);

            if (dropIndex !== -1) {
              // Insert at specific position
              targetColumnItems.splice(dropIndex, 0, movedItem);
            } else {
              // Add to the end if target item not found
              targetColumnItems.push(movedItem);
            }
            newFilteredData[dropColumnId] = targetColumnItems;
          } else {
            // Add to the end of target column if no specific target
            newFilteredData[dropColumnId] = [...newFilteredData[dropColumnId], movedItem];
          }

          // Handle insertion in target column for original data
          const originalTargetItems = [...newOriginalData[dropColumnId]];
          if (dragOverItemId) {
            const originalDropIndex = originalTargetItems.findIndex(item => item.id === dragOverItemId);

            if (originalDropIndex !== -1) {
              originalTargetItems.splice(originalDropIndex, 0, movedItem);
            } else {
              originalTargetItems.push(movedItem);
            }
          } else {
            originalTargetItems.push(movedItem);
          }
          newOriginalData[dropColumnId] = originalTargetItems;
        }

        // Update both states
        setKanbanData(newFilteredData);
        setOriginalData(newOriginalData);
      }

      // Reset drag tracking
      setDraggedItemId(null);
      setDragSourceColumn(null);
      setDragOverItemId(null);
      setIsDragging(false);
    }
  };

  // Enhanced function to handle dragging outside visible area
  const handleColumnDragOver = (event, columnId) => {
    onDragOver(event, columnId);

    // If column is not in view, scroll to it
    if (containerRef.current) {
      const columnElement = document.getElementById(`column-${columnId}`);
      if (columnElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const columnRect = columnElement.getBoundingClientRect();

        // If column is off-screen to the right
        if (columnRect.left > containerRect.right) {
          containerRef.current.scrollLeft += 10;
        }
        // If column is off-screen to the left
        else if (columnRect.right < containerRect.left) {
          containerRef.current.scrollLeft -= 10;
        }
      }
    }
  };

  const renderCandidateCard = (item, columnId) => {
    return (
      <div
        key={item.id}
        id={`card-${item.id}`}
        draggable={true}
        onDragStart={(e) => onDragStart(e, item.id, columnId)}
        onDragEnd={onDragEnd}
        onDragEnter={(e) => onDragEnter(e, item.id)}
        onDragOver={(e) => onDragOver(e)}
        className={`cursor-move card-container ${dragOverItemId === item.id ? 'drag-over' : ''}`}
        style={{
          cursor: 'move',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
      >
        <Card className="p-2 shadow-sm border mb-2 bg-white">
          <div className="text-gray-800 font-medium">{item.name}</div>
          <div className="text-sm text-gray-600">{item.jobTitle}</div>
          <div className="text-xs text-gray-400">{item.company}</div>
          <div className="flex justify-between text-xs text-gray-400 dates">
            <span className="me-3">{item.jobId}</span>
            <span>Start: {item.startDate}</span>
          </div>
        </Card>
        {dragOverItemId === item.id && draggedItemId !== item.id && (
          <div className="drop-indicator" style={{
            position: 'absolute',
            top: '-4px',
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#3b82f6',
            borderRadius: '2px',
            zIndex: 10
          }}></div>
        )}
      </div>
    );
  };

  // Get visible cards for a column
  const getVisibleCards = (columnId) => {
    const cards = kanbanData[columnId] || [];
    if (cards.length <= CARDS_TO_SHOW || expandedColumns[columnId]) {
      return cards;
    }
    return cards.slice(0, CARDS_TO_SHOW);
  };

  // Check if a column has more cards than the initial display count
  const hasMoreCards = (columnId) => {
    const cards = kanbanData[columnId] || [];
    return cards.length > CARDS_TO_SHOW;
  };

  // Global event listeners for drag outside container
  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      if (isDragging) {
        e.preventDefault();
        setDragPosition({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('dragover', handleGlobalDragOver);

    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
    };
  }, [isDragging]);

  // Filter option definitions
  const recruiters = [
    { name: "Harish", id: "HR001" },
    { name: "Giri", id: "GR002" },
    { name: "Pavan", id: "PR003" }
  ];

  const jobStatusOptions = [
    { label: "Active", value: "active" },
    { label: "Closed", value: "closed" },
    { label: "All Jobs", value: "all" }
  ];

  const companyOptions = [
    { name: "Varun Digital Media", code: "VDM" },
    { name: "Pranathi Software Services", code: "PSS" },
    { name: "Green Ventures", code: "GV" },
    { name: "Future Tech", code: "FT" },
    { name: "Healthify Solutions", code: "HS" }
  ];

  const jobOptions = [
    { name: "Job-101", code: "J101" },
    { name: "Job-102", code: "J102" },
    { name: "Job-103", code: "J103" },
    { name: "Job-104", code: "J104" },
    { name: "Job-105", code: "J105" }
  ];

  const jobTitleOptions = [
    { name: "Frontend Developer", code: "FDEV" },
    { name: "Backend Developer", code: "BDEV" },
    { name: "Graphic Designer", code: "GDES" },
    { name: "Data Scientist", code: "DS" },
    { name: "UI/UX", code: "UIUX" },
    { name: "SEO", code: "SEO" }
  ];


  // auto complete start

  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  // Predefined list of names
  const names = ["Infosys", "Cognizant", "Capgemini", "CA Technologies", "L&T Mindtree", "Ram Software Services", "Citel Global Communication", "Tarun Digital Media", "Sai Digital Media", "Mahesh Digital Media", "Mahesh Digital Media", "Twitter", "Uber", "TCS", "Wipro", "HCL", "Deloitte", "Accenture", "IBM", "SAP", "Dell", "HP", "Cisco", "Adobe", "PayPal", "Spotify", "Atlassian"];

  const search = (event) => {
    // Filter names based on user input
    let filteredNames = names.filter(name => name.toLowerCase().includes(event.query.toLowerCase()));
    setItems(filteredNames);
  };


  // auto complete end



  return (
    <React.Fragment>

      <div className="page-content">
        <Toast ref={toast} />
        <Container fluid>
          <div className="page-title-box actjobbread">

            <Row className="align-items-center breadcrumb-card ac-items">
              <Col xl={12} lg={12} md={12} sm={12}>
                <span className="icons-ac">
                  <Dropdown
                    value={selectedRecruiter}
                    onChange={(e) => setSelectedRecruiter(e.value)}
                    options={recruiters}
                    optionLabel="name"
                    placeholder="Recruiter"
                    className="w-full md:w-10rem icons-btn bgclr me-1"
                  />

                  <Dropdown
                    value={selectedJobStatus}
                    onChange={(e) => setSelectedJobStatus(e.value)}
                    options={jobStatusOptions}
                    optionLabel="label"
                    placeholder="Job Status"
                    className="w-full md:w-11rem icons-btn bgclr me-1"
                  />

                  <Dropdown
                    value={selectedJobTitle}
                    onChange={(e) => setSelectedJobTitle(e.value)}
                    options={jobTitleOptions}
                    optionLabel="name"
                    placeholder="Job Title"
                    className="w-full md:w-10rem icons-btn bgclr me-1"
                  />

                  <InputText value={candidate} onChange={(e) => setCandidate(e.target.value)} placeholder="Candidate" className="me-1 md:w-8rem" />

                  {/* <Dropdown
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.value)}
                  options={companyOptions}
                  optionLabel="name"
                  placeholder="Company Name"
                  className="w-full md:w-13rem bgclr icons-btn me-1"
                /> */}

                  <div className="d-inline me-1 company-auto">
                    <AutoComplete
                      value={value}
                      suggestions={items}
                      completeMethod={search}
                      onChange={(e) => setValue(e.value)}
                      placeholder="Company Name"
                    />
                  </div>

                  <InputText type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="me-1 md:w-7rem" />

                  <InputText type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="me-1 md:w-7rem" />

                  <InputText value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="me-1 md:w-7rem" />

                  <InputText value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="me-1 md:w-7rem" />

                  {/* Job ID Dropdown */}
                  <Dropdown
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.value)}
                    options={jobOptions}
                    optionLabel="name"
                    placeholder="Job ID"
                    className="w-full md:w-9rem bgclr icons-btn me-2"
                  />

                  <button type="button" className="btn btn-secondary icons-btn me-1 notes" onClick={handleClear}>Clear</button>

                  <button type="button" className="btn btn-secondary import-res-btn md:w-4rem apply-btn" onClick={applyFilters}>Apply</button>
                  
                </span>
              </Col>
            </Row>

            <Row className="pt-3">
              <Col lg={12}>
                <div
                  ref={containerRef}
                  className="flex gap-3"
                  style={{
                    position: 'relative', width: '100%', overscrollBehaviorX: 'contain', overflowX: 'auto',
                    overflowY: 'hidden',
                  }}
                >
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      id={`column-${column.id}`}
                      className={`flex-none w-80 kanban-view ${currentHoverColumn === column.id ? 'column-hover' : ''}`}
                      onDragOver={(e) => handleColumnDragOver(e, column.id)}
                      onDrop={(e) => onDrop(e, column.id)}
                    >
                      <Card className="bg-gray-100">
                        <div className="flex justify-content-between mb-2 align-items-start">
                          <h3 className="text-gray-700 font-semibold">{column.title}</h3>
                          <Badge value={kanbanData[column.id].length} className="bg-blue-500 text-white mb-2" />
                        </div>

                        <div
                          className="min-h-40 p-2 rounded"
                          onDragOver={(e) => onDragOver(e, column.id)}
                          onDrop={(e) => onDrop(e, column.id)}
                          style={{
                            minHeight: '200px',
                            padding: '8px',
                            transition: 'background-color 0.3s ease'
                          }}
                        >
                          {getVisibleCards(column.id).map((item) => renderCandidateCard(item, column.id))}

                          {/* Show More / Show Less Button */}
                          {hasMoreCards(column.id) && (
                            <div className="text-center mt-2">
                              <Button
                                className="p-button-text p-button-sm"
                                onClick={() => toggleColumnExpand(column.id)}
                                icon={expandedColumns[column.id] ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                                label={expandedColumns[column.id] ? "Show Less" : `Show More (${kanbanData[column.id].length - CARDS_TO_SHOW})`}
                              />
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}

                  {/* Edge indicators during dragging */}
                  {isDragging && (
                    <>
                      <div
                        className="scroll-indicator left"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '20px',
                          background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), transparent)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      />
                      <div
                        className="scroll-indicator right"
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '20px',
                          background: 'linear-gradient(to left, rgba(59, 130, 246, 0.2), transparent)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      />
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        <style jsx>{`
        .dragging {
          opacity: 0.5;
        }
        .droppable-container {
          transition: background-color 0.2s ease;
        }
        .droppable-container:hover {
          background-color: #f0f7ff !important;
        }
        .drag-over {
          transform: translateY(2px);
        }
        .column-hover {
          z-index: 5;
        }
      `}
        </style>

      </div>
    </React.Fragment>

  );
};

export default KanbanView;