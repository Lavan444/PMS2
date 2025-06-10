import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';


const ManagerDashboard = () => {
    const navigate = useNavigate();

    // all departments dropdown starts

    const [selectedValues, setSelectedValues] = useState(null);
    const values = [
        { name: 'All Projects' },
        { name: 'Engineering' },
        { name: 'Sales' },
        { name: 'Marketing' }
    ];

    const [selectedRange, setSelectedRange] = useState(null);
    const ranges = [
        { name: 'Custom Range' },
        { name: 'This Week' },
        { name: 'Last 30 Days' },
        { name: 'One Year' }
    ];

    const [worktype, setworktype] = useState(null);
    const worktypes = [
        { name: 'All' },
        { name: 'Task' },
        { name: 'Bug' },
        { name: 'Others' }
    ];

    // all departments dropdown ends


    // candidate source distribution starts

    const [taskdata, setTaskdata] = useState({});
    const [taskoptions, setTaskoptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const data = {
            labels: ['Completed Tasks', 'Incompleted Tasks', 'All Tasks'],
            datasets: [
                {
                    data: [50, 30, 20], // Example data for completed, incompleted, and all tasks
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'), // Completed Tasks
                        documentStyle.getPropertyValue('--red-500'),   // Incompleted Tasks
                        documentStyle.getPropertyValue('--blue-500')   // All Tasks
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--blue-400')
                    ]
                }
            ]
        };

        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setTaskdata(data);
        setTaskoptions(options);
    }, []);

    // candidate source distribution ends

    // recruiter team activities starts

    const [taskData, setTaskData] = useState({});
    const [taskOptions, setTaskOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: [
                'Project A',
                'Project B',
                'Project C',
                'Project D',
                'Project E'
            ],
            datasets: [
                {
                    label: 'Created Tasks',
                    backgroundColor: '#4caf50', // Green for Created Tasks
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [150, 200, 120, 180, 220] // Example data for Created Tasks
                },
                {
                    label: 'Completed Tasks',
                    backgroundColor: '#C71585', // Blue for Completed Tasks
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [100, 150, 80, 130, 200] // Example data for Completed Tasks
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        stepSize: 50, // Adjust step size based on data
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    suggestedMin: 0, // Minimum value for y-axis
                    suggestedMax: 250 // Maximum value for y-axis
                }
            }
        };

        setTaskData(data);
        setTaskOptions(options);
    }, []);

    // recruiter team activities ends


    // recruitment trends starts

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: [
                'Amit Kumar',
                'Priya Sharma',
                'Rajesh Singh',
                'Anjali Gupta',
                'Ravi Patel',
                'Neha Reddy',
                'Vikram Yadav',
                'Pooja Verma',
                'Sandeep Mehta',
                'Sneha Joshi'
            ],  // Top 10 Indian Assignees names
            datasets: [
                {
                    label: 'Completed Tasks',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [45, 78, 56, 88, 60, 40, 95, 70, 80, 90]  // Example data for completed tasks
                }
            ]
        };

        const options = {
            indexAxis: 'x',  // Change to 'x' to make it a vertical bar chart
            maintainAspectRatio: false,
            aspectRatio: 1,  // Adjust the aspect ratio to fit the vertical bar chart
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        },
                        stepSize: 10,  // Set the interval of 10 for the tasks count
                    },
                    grid: {
                        display: true,
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    min: 0,  // Minimum value for x-axis (tasks count starts from 0)
                    max: 100,  // Maximum value for x-axis (tasks count ends at 100)
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    // recruitment trends ends


    // open jobs table starts
    const [openjobfilters, setopenjobfilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        project_code: { value: null, matchMode: FilterMatchMode.CONTAINS },
        project_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        extended_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        reason_for_late: { value: null, matchMode: FilterMatchMode.CONTAINS },
        project_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const [selectedJobs, setSelectedJobs] = useState([]);

    // Handle view project function
    const handleViewProject = () => {
        // Navigate to allactive-jobs page
        navigate('/allactive-jobs');
    };

    // Extended End Date body template
    const extendedEndDateBodyTemplate = (rowData) => {
        return rowData.extended_end_date ? (
            <span>{rowData.extended_end_date}</span>
        ) : (
            <span style={{ color: '#888', fontStyle: 'italic' }}>Not Extended</span>
        );
    };

    // Reason for Late body template
    const reasonForLateBodyTemplate = (rowData) => {
        return rowData.reason_for_late ? (
            <span>{rowData.reason_for_late}</span>
        ) : (
            <span style={{ color: '#888', fontStyle: 'italic' }}>No reason specified</span>
        );
    };

    const openJobs = [
        {
            project_code: "PROJ-2025-001",
            project_name: "Customer Portal Development",
            status: "In Progress",
            start_date: "01-01-2025",
            end_date: "30-04-2025",
            extended_end_date: "15-05-2025",
            reason_for_late: "Additional feature requests from client",
            project_manager: "Amit Sharma",
            company: "TechMahindra"
        },
        {
            project_code: "PROJ-2025-002",
            project_name: "Mobile Banking Application",
            status: "Completed",
            start_date: "15-01-2025",
            end_date: "28-03-2025",
            extended_end_date: null,
            reason_for_late: null,
            project_manager: "Priya Patel",
            company: "Infosys"
        },
        {
            project_code: "PROJ-2025-003",
            project_name: "Business Intelligence Dashboard",
            status: "In Progress",
            start_date: "01-02-2025",
            end_date: "31-05-2025",
            extended_end_date: "15-06-2025",
            reason_for_late: "Data integration complexities",
            project_manager: "Vikram Singh",
            company: "TCS"
        },
        {
            project_code: "PROJ-2025-004",
            project_name: "Cloud Infrastructure Migration",
            status: "On Hold",
            start_date: "10-01-2025",
            end_date: "30-08-2025",
            extended_end_date: "30-09-2025",
            reason_for_late: "Budget approval pending",
            project_manager: "Ananya Reddy",
            company: "Wipro"
        },
        {
            project_code: "PROJ-2025-005",
            project_name: "Employee Management System",
            status: "In Progress",
            start_date: "01-03-2025",
            end_date: "30-07-2025",
            extended_end_date: null,
            reason_for_late: null,
            project_manager: "Arjun Kumar",
            company: "HCL Technologies"
        },
        {
            project_code: "PROJ-2025-006",
            project_name: "Digital Marketing Platform",
            status: "Completed",
            start_date: "15-12-2024",
            end_date: "28-02-2025",
            extended_end_date: null,
            reason_for_late: null,
            project_manager: "Divya Nair",
            company: "TechWave Solutions"
        },
        {
            project_code: "PROJ-2025-007",
            project_name: "Enterprise Content Management",
            status: "In Progress",
            start_date: "01-04-2025",
            end_date: "31-08-2025",
            extended_end_date: "15-09-2025",
            reason_for_late: "Security compliance requirements",
            project_manager: "Rahul Iyer",
            company: "Accenture"
        },
        {
            project_code: "PROJ-2025-008",
            project_name: "AI-Powered Analytics Engine",
            status: "In Progress",
            start_date: "01-02-2025",
            end_date: "31-07-2025",
            extended_end_date: "31-08-2025",
            reason_for_late: "Model training optimization required",
            project_manager: "Neha Kapoor",
            company: "Cognizant"
        },
        {
            project_code: "PROJ-2025-009",
            project_name: "Project Collaboration Suite",
            status: "Completed",
            start_date: "15-11-2024",
            end_date: "15-02-2025",
            extended_end_date: null,
            reason_for_late: null,
            project_manager: "Sanjay Joshi",
            company: "Capgemini"
        },
        {
            project_code: "PROJ-2025-010",
            project_name: "Omnichannel Marketing Solution",
            status: "In Progress",
            start_date: "01-03-2025",
            end_date: "31-07-2025",
            extended_end_date: "15-08-2025",
            reason_for_late: "Third-party API integration delays",
            project_manager: "Pooja Desai",
            company: "Zoho Corporation"
        }
    ];
    //  open jobs table ends

    // user activity starts

    const [userActivityData, setUserActivityData] = useState({});
    const [userActivityOptions, setUserActivityOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: ['01-01-2025', '02-01-2025', '03-01-2025', '04-01-2025', '05-01-2025', '06-01-2025', '07-01-2025', '08-01-2025', '09-01-2025', '10-01-2025', '11-01-2025', '12-01-2025', '13-01-2025', '14-01-2025', '15-01-2025'],
            datasets: [
                {
                    label: 'Average Activity',
                    data: [5, 8, 6, 9, 7, 10, 12, 11, 10, 13, 12, 15, 14, 16, 17], // Smaller values for average activity
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Total Activity',
                    data: [20, 25, 22, 28, 26, 30, 35, 33, 32, 38, 36, 40, 39, 45, 50], // Smaller values for total activity
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                },
                {
                    label: 'User Activity',
                    data: [3, 5, 4, 6, 5, 7, 8, 7, 6, 9, 8, 10, 9, 11, 12], // Smaller values for user activity
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.raw || 0;
                            return `${datasetLabel}: ${value}`;
                        },
                        footer: function (tooltipItems) {
                            const index = tooltipItems[0].dataIndex;
                            const avg = data.datasets[0].data[index];
                            const total = data.datasets[1].data[index];
                            const user = data.datasets[2].data[index];
                            return `Average: ${avg} | Total: ${total} | User: ${user}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 5 // Adjusted step size for smaller values
                    },
                    grid: {
                        color: surfaceBorder
                    },
                    suggestedMin: 0, // Minimum value for y-axis
                    suggestedMax: 20 // Adjusted maximum value for y-axis
                }
            }
        };

        setUserActivityData(data);
        setUserActivityOptions(options);
    }, []);

    // user activity ends

    // table dropdown starts
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const periods = [
        { name: "Yearly", code: "YR" },
        { name: "Monthly", code: "MT" },
        { name: "Weekly", code: "WK" },
        { name: "Today", code: "TD" }
    ];
    // table dropdown ends

    return (
        <React.Fragment>
            <div className="page-content allact-tabs manager-dash">
                <Container fluid={true}>
                    <div className="page-title-box mb-0 recruiter-dashboard actjobsum">
                        <Row>
                            <Col lg={12}>
                                <h1 class="page-title mb-4">Manager Dashboard
                                </h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3} md={6} className="mb-4">
                                <Dropdown value={selectedValues} onChange={(e) => setSelectedValues(e.value)} options={values} optionLabel="name"
                                    placeholder="All Projects" className="w-full bgclr me-2" checkmark={true} highlightOnSelect={false} />
                            </Col>
                            <Col lg={3} md={6} className="mb-4">
                                <Dropdown value={selectedRange} onChange={(e) => setSelectedRange(e.value)} options={ranges} optionLabel="name"
                                    placeholder="Custom Range" className="w-full bgclr" checkmark={true} highlightOnSelect={false} />
                            </Col>

                            <Col lg={3} md={6} className="mb-4">
                                <Dropdown value={worktype} onChange={(e) => setworktype(e.value)} options={worktypes} optionLabel="name"
                                    placeholder="WorkTypes" className="w-full bgclr" checkmark={true} highlightOnSelect={false} />
                            </Col>


                        </Row>

                        <Row>
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="h-100">
                                    <p className="smalltitle"> Total Projects </p>
                                    <div className="d-flex justify-content-between">
                                        <h3 className="smallhead">30</h3>
                                        <span><i className="pi pi-arrow-up me-2 success-txt"></i>+12%</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="h-100">
                                    <p className="smalltitle"> Total Tasks </p>
                                    <div className="d-flex justify-content-between">
                                        <h3 className="smallhead">200</h3>
                                        <span><i className="pi pi-arrow-down me-2 danger-txt"></i>-40%</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="h-100">
                                    <p className="smalltitle"> Tasks Completed </p>
                                    <div className="d-flex justify-content-between">
                                        <h3 className="smallhead">80</h3>
                                        <span><i className="pi pi-arrow-up me-2 success-txt"></i> +70%</span>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="h-100">
                                    <p className="smalltitle"> Tasks Extended </p>
                                    <div className="d-flex justify-content-between">
                                        <h3 className="smallhead">30</h3>
                                        <span><i className="pi pi-arrow-down me-2 danger-txt"></i> -52%</span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Row >
                            <Col lg={4} className="mb-4">
                                <Card className="h-100">
                                    <div className="d-flex">
                                        <h1 className="title">Tasks by Priority</h1>
                                    </div>
                                    <Chart type="pie" data={taskdata} options={taskoptions} className="w-full" />
                                </Card>
                            </Col>

                            <Col lg={8} className="mb-4">
                                <Card className="h-70">
                                    <h1 className="title">Created vs. Completed Tasks in Projects</h1>
                                    <Chart type="bar" data={taskData} options={taskOptions} />
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12} className="mb-4">
                                <div className="mandashtable">
                                    <Card className="h-100">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <h1 className="title mb-0">Recent Projects</h1>
                                                {selectedJobs.length > 0 && (
                                                    <Button
                                                        icon="pi pi-eye"
                                                        className="p-button-rounded rounded-1 p-button-text p-button-sm"
                                                        onClick={handleViewProject}
                                                        tooltip={`View ${selectedJobs.length} selected project${selectedJobs.length > 1 ? 's' : ''}`}
                                                        tooltipOptions={{ position: 'top' }}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            color: '#4f46e5'
                                                        }}
                                                    />
                                                )}
                                            </div>


                                            <div className="d-flex align-items-center gap-3">

                                                <Dropdown
                                                    value={selectedPeriod}
                                                    onChange={(e) => setSelectedPeriod(e.value)}
                                                    options={periods}
                                                    optionLabel="name"
                                                    placeholder="Select a Period"
                                                    className="md:w-12.1rem bgclr"
                                                />
                                            </div>
                                        </div>

                                        <div className="card1 actjobsumtable">
                                            <DataTable
                                                value={openJobs}
                                                dataKey="project_code"
                                                filters={openjobfilters}
                                                filterDisplay="row"
                                                globalFilterFields={[
                                                    "project_code",
                                                    "project_name",
                                                    "status",
                                                    "start_date",
                                                    "end_date",
                                                    "extended_end_date",
                                                    "reason_for_late",
                                                    "project_manager",
                                                    "company"
                                                ]}
                                                scrollable
                                                scrollHeight="400px"
                                                emptyMessage="No projects found."
                                                selection={selectedJobs}
                                                onSelectionChange={(e) => setSelectedJobs(e.value)}
                                                selectionMode="multiple"
                                                resizableColumns
                                                columnResizeMode="expand"
                                            >
                                                <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                <Column field="project_code" header="Project Code" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="project_name" header="Project Name" sortable frozen filter style={{ minWidth: "15rem" }} />
                                                <Column field="status" header="Status" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="start_date" header="Start Date" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="end_date" header="End Date" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column 
                                                    field="extended_end_date" 
                                                    header="Extended End Date" 
                                                    sortable 
                                                    filter 
                                                    style={{ minWidth: "12rem" }}
                                                    body={extendedEndDateBodyTemplate}
                                                />
                                                <Column 
                                                    field="reason_for_late" 
                                                    header="Reason for Late" 
                                                    sortable 
                                                    filter 
                                                    style={{ minWidth: "15rem" }}
                                                    body={reasonForLateBodyTemplate}
                                                />
                                                <Column field="project_manager" header="Project Manager" sortable filter style={{ minWidth: "12rem" }} />
                                                <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                            </DataTable>
                                        </div>
                                    </Card>

                                </div>
                            </Col>
                        </Row>

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ManagerDashboard;

