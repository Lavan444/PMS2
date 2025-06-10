import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, } from "reactstrap";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const ManagerDashboard = () => {

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
        job_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        job_title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        openings: { value: null, matchMode: FilterMatchMode.EQUALS },
        hiring_manager: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        workplace_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        primary_skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
        experience_required: { value: null, matchMode: FilterMatchMode.EQUALS },
        min_salary: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL },
        max_salary: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL },
        department: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        job_start_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        job_end_date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        user_ids: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [selectedJobs, setSelectedJobs] = useState([]);

    const openJobs = [
        {
            job_id: "Job-101",
            job_title: "Web Developer",
            job_status: "Open",
            openings: 5,
            hiring_manager: "Rajesh Kumar",
            company: "TechMahindra",
            job_location: "Bangalore, Karnataka",
            workplace_type: "Hybrid",
            job_type: "Full-time",
            primary_skills: "JavaScript, React, Node.js",
            experience_required: 3,
            min_salary: 70000,
            max_salary: 100000,
            department: "Engineering",
            job_start_date: "01-02-2025",
            job_end_date: "01-05-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-102",
            job_title: "Graphic Designer",
            job_status: "Open",
            openings: 2,
            hiring_manager: "Priya Sharma",
            company: "Infosys",
            job_location: "Hyderabad, Telangana",
            workplace_type: "Remote",
            job_type: "Contract",
            primary_skills: "Agile, Scrum",
            experience_required: 5,
            min_salary: 90000,
            max_salary: 120000,
            department: "Management",
            job_start_date: "15-03-2025",
            job_end_date: "30-06-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-103",
            job_title: "Project Manager",
            job_status: "Open",
            openings: 3,
            hiring_manager: "Vikram Singh",
            company: "TCS",
            job_location: "Pune, Maharashtra",
            workplace_type: "Hybrid",
            job_type: "Full-Time",
            primary_skills: "JavaScript, React, Node.js",
            experience_required: 2,
            min_salary: 80000,
            max_salary: 100000,
            department: "Development",
            job_start_date: "01-02-2025",
            job_end_date: "31-01-2026",
            user_ids: "Harish",
        },
        {
            job_id: "Job-104",
            job_title: "UI/UX Designer",
            job_status: "Closed",
            openings: 1,
            hiring_manager: "Ananya Reddy",
            company: "Wipro",
            job_location: "Chennai, Tamil Nadu",
            workplace_type: "On-Site",
            job_type: "Full-Time",
            primary_skills: "Python, Machine Learning, SQL",
            experience_required: 3,
            min_salary: 100000,
            max_salary: 130000,
            department: "Data Analytics",
            job_start_date: "10-01-2025",
            job_end_date: "31-12-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-105",
            job_title: "HR Specialist",
            job_status: "Open",
            openings: 2,
            hiring_manager: "Arjun Patel",
            company: "HCL Technologies",
            job_location: "Gurgaon, Haryana",
            workplace_type: "Remote",
            job_type: "Contract",
            primary_skills: "Figma, Sketch, Adobe XD",
            experience_required: 4,
            min_salary: 70000,
            max_salary: 90000,
            department: "Design",
            job_start_date: "01-10-2025",
            job_end_date: "31-10-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-106",
            job_title: "Marketing Manager",
            job_status: "Open",
            openings: 3,
            hiring_manager: "Divya Nair",
            company: "TechWave India",
            job_location: "Noida, Uttar Pradesh",
            workplace_type: "Hybrid",
            job_type: "Full-Time",
            primary_skills: "React, JavaScript, CSS, HTML",
            experience_required: 3,
            min_salary: 80000,
            max_salary: 100000,
            department: "Engineering",
            job_start_date: "15-03-2025",
            job_end_date: "15-03-2026",
            user_ids: "Harish",
        },
        {
            job_id: "Job-107",
            job_title: "Content Writer",
            job_status: "Open",
            openings: 1,
            hiring_manager: "Rahul Iyer",
            company: "Accenture",
            job_location: "Mumbai, Maharashtra",
            workplace_type: "On-Site",
            job_type: "Part-Time",
            primary_skills: "Node.js, Express, MongoDB, AWS",
            experience_required: 5,
            min_salary: 90000,
            max_salary: 120000,
            department: "Engineering",
            job_start_date: "01-05-2025",
            job_end_date: "31-12-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-108",
            job_title: "Data Scientist",
            job_status: "Open",
            openings: 2,
            hiring_manager: "Neha Kapoor",
            company: "Cognizant",
            job_location: "Kolkata, West Bengal",
            workplace_type: "Remote",
            job_type: "Full-Time",
            primary_skills: "Python, SQL, Machine Learning, Tableau",
            experience_required: 6,
            min_salary: 95000,
            max_salary: 130000,
            department: "Data Science",
            job_start_date: "01-02-2025",
            job_end_date: "01-02-2026",
            user_ids: "Harish",
        },
        {
            job_id: "Job-109",
            job_title: "Project Manager",
            job_status: "Open",
            openings: 1,
            hiring_manager: "Sanjay Joshi",
            company: "Capgemini",
            job_location: "Ahmedabad, Gujarat",
            workplace_type: "Hybrid",
            job_type: "Contract",
            primary_skills: "Agile, Scrum, Jira, Leadership",
            experience_required: 7,
            min_salary: 110000,
            max_salary: 140000,
            department: "Management",
            job_start_date: "01-06-2025",
            job_end_date: "31-12-2025",
            user_ids: "Harish",
        },
        {
            job_id: "Job-110",
            job_title: "Marketing Specialist",
            job_status: "Open",
            openings: 4,
            hiring_manager: "Pooja Desai",
            company: "Zoho",
            job_location: "Coimbatore, Tamil Nadu",
            workplace_type: "On-Site",
            job_type: "Full-Time",
            primary_skills: "SEO, SEM, Content Marketing, Google Analytics",
            experience_required: 2,
            min_salary: 60000,
            max_salary: 80000,
            department: "Marketing",
            job_start_date: "01-03-2025",
            job_end_date: "31-12-2025",
            user_ids: "Harish",
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
                                            <h1 className="title">Recent Open Jobs</h1>
                                            <Dropdown
                                                value={selectedPeriod}
                                                onChange={(e) => setSelectedPeriod(e.value)}
                                                options={periods}
                                                optionLabel="name"
                                                placeholder="Select a Period"
                                                className="md:w-10rem bgclr"
                                            />
                                        </div>


                                        <div className="card1 actjobsumtable">
                                            <DataTable
                                                value={openJobs}
                                                dataKey="job_id"
                                                filters={openjobfilters}
                                                filterDisplay="row"
                                                globalFilterFields={[
                                                    "job_id",
                                                    "job_title",
                                                    "job_status",
                                                    "openings",
                                                    "hiring_manager",
                                                    "company",
                                                    "job_location",
                                                    "workplace_type",
                                                    "job_type",
                                                    "primary_skills",
                                                    "experience_required",
                                                    "min_salary",
                                                    "max_salary",
                                                    "department",
                                                    "job_start_date",
                                                    "job_end_date",
                                                    "user_ids",
                                                ]}
                                                scrollable
                                                scrollHeight="400px"
                                                emptyMessage="No open jobs found."
                                                selection={selectedJobs}
                                                onSelectionChange={(e) => setSelectedJobs(e.value)}
                                                selectionMode="multiple"
                                                resizableColumns
                                                columnResizeMode="expand"
                                            >
                                                <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                                                <Column field="job_id" header="Job ID" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_title" header="Job Title" sortable frozen filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_status" header="Job Status" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="openings" header="Openings" sortable filter style={{ minWidth: "8rem" }} />
                                                <Column field="hiring_manager" header="Hiring Manager" sortable filter style={{ minWidth: "12rem" }} />
                                                <Column field="company" header="Company" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_location" header="Job Location" sortable filter style={{ minWidth: "12rem" }} />
                                                <Column field="workplace_type" header="Workplace Type" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_type" header="Job Type" sortable filter style={{ minWidth: "8rem" }} />
                                                <Column field="primary_skills" header="Primary Skills" sortable filter style={{ minWidth: "15rem" }} />
                                                <Column field="experience_required" header="Experience Required" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="min_salary" header="Min Salary" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="max_salary" header="Max Salary" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="department" header="Department" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_start_date" header="Job Start Date" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="job_end_date" header="Job End Date" sortable filter style={{ minWidth: "10rem" }} />
                                                <Column field="user_ids" header="User IDs" sortable filter style={{ minWidth: "12rem" }} />
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

