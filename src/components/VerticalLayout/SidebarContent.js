import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef, useState } from "react"

// Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link, useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { Tooltip } from "primereact/tooltip"

const SidebarContent = props => {
  const location = useLocation()
  const ref = useRef()
  const path = location.pathname
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  
  // Initial menu structure
  const [menuItems, setMenuItems] = useState([
    {
      id: 'analytics',
      title: 'Analytics Management',
      icon: 'pi pi-chart-bar',
      order: 1,
      subItems: [
        { id: 'dashboards', title: 'Dashboards', route: '/manager-dashboard' },
        // {
        //   id: 'project-health',
        //   title: 'Project Health Monitoring',
        //   subItems: [
        //     { id: 'delivery-dates', title: 'Delivery Dates', route: '/delivery-dates' },
        //     { id: 'delays', title: 'Delay', route: '/delays' },
        //     { id: 'gaps', title: 'Gaps', route: '/gaps' }
        //   ]
        // },
        {
          id: 'reports',
          title: 'Reports',
          subItems: [
            // { id: 'recruiter-report', title: 'Recruiter Performance Report', route: '/recruiter-performance-report' },
            // { id: 'active-job-summary', title: 'Active Job Summary Report', route: '/activejob-summary' },
            // { id: 'time-to-hire', title: 'Time to Hire Report', route: '/time-to-hire' },
            // { id: 'placement-report', title: 'Placement Report', route: '/placement-report' },
            // { id: 'call-report', title: 'Call Report', route: '/call-report' },
            // { id: 'source-performance', title: 'Source Performance Report', route: '/source-performance-report' },
            // { id: 'pipeline-report', title: 'My Pipeline Report', route: '/pipeline-report' },
            // { id: 'my-placement-report', title: 'My Placement Report', route: '/my-placement-report' },
            { id: 'project-status', title: 'Project Status', route: '/project-status', disabled: true },
            { id: 'project-status', title: 'Project Phases Report', route: '/project-phases-report' },
            { id: 'project-status', title: 'Resource Utilization', route: '/resource-utilization' },
            { id: 'project-status', title: 'Work Type Report', route: '/work-type-report' },
          ]
        }
      ]
    },
    {
      id: 'project',
      title: 'Project Management',
      icon: 'pi pi-folder',
      order: 2,
      subItems: [
        {
          id: 'projects',
          title: 'Projects',
          subItems: [
            { id: 'all-active-jobs', title: 'All Active', route: '/allactive-jobs' },
            { id: 'my-active-jobs', title: 'My Active', route: '/myactive-jobs' },
            { id: 'assigned-to-me', title: 'Assigned to Me', route: '/assignedtome-jobs' },
            { id: 'all-closed', title: 'All Closed', route: '/joballclosed-jobs' },
            { id: 'archived-jobs', title: 'Archived', route: '/jobarchived-jobs' }
          ]
        },
        {
          id: 'work-type',
          title: 'Work Type',
          subItems: [
            { id: 'all-active-candidates', title: 'All Active', route: '/allactive-candidates' },
            { id: 'my-active-candidates', title: 'My Active', route: '/myactive-candidates' },
            { id: 'todo-list', title: 'To Do List', route: '/candidates-tasklist' },
            // { id: 'added-by-me', title: 'Added by Me', route: '/candidates-added' },
            // { id: 'opened-by-me', title: 'Opened by Me', route: '/candidates-opened' },
            { id: 'archived-candidates', title: 'Archived', route: '/candidates-archived' }
          ]
        }
      ]
    },
    {
      id: 'customer',
      title: 'Customer Management',
      icon: 'pi pi-users',
      order: 3,
      subItems: [
        {
          id: 'companies',
          title: 'Companies',
          subItems: [
            { id: 'all-active-companies', title: 'All Active', route: '/companies-allactive' },
            { id: 'my-active-companies', title: 'My Active', route: '/companies-myactive' },
            { id: 'companies-todo', title: 'To Do List', route: '/companies-tasklist' },
            { id: 'companies-activity', title: 'Activity Log', route: '/companies-activity' },
            { id: 'companies-archived', title: 'Archived', route: '/companies-archived' },
            { id: 'companies-duplicate', title: 'Duplicate List', route: '/companies-duplicatelist' }
          ]
        },
        {
          id: 'contacts',
          title: 'Contacts',
          subItems: [
            { id: 'all-active-contacts', title: 'All Active', route: '/contacts-allactive' },
            { id: 'my-active-contacts', title: 'My Active', route: '/contacts-myactive' },
            { id: 'contacts-task', title: 'Task List', route: '/contacts-tasklist' },
            { id: 'contacts-activity-log', title: 'Activity Log', route: '/contacts-activity' },
            { id: 'contacts-archived', title: 'Archived', route: '/contacts-archived' },
            { id: 'contacts-duplicate', title: 'Duplicate List', route: '/contacts-duplicate' }
          ]
        }
      ]
    },
    {
      id: 'team',
      title: 'Team Management',
      icon: 'pi pi-user-plus',
      order: 4,
      subItems: [
        {
          id: 'employees',
          title: 'Employees',
          subItems: [
            { id: 'all-active-employees', title: 'All Active', route: '/allactive-employees' },
            { id: 'my-active-employees', title: 'My Active', route: '/myactive-employees' },
            { id: 'employees-todo', title: 'To Do List', route: '/todolist-employees' },
            // { id: 'employees-added', title: 'Added by Me', route: '/added-employees' },
            // { id: 'employees-opened', title: 'Opened by Me', route: '/opened-employees' },
            { id: 'employees-archived', title: 'Archived', route: '/archived-employees' }
          ]
        },
        { id: 'timesheet', title: 'Time Sheet', route: '/timesheet' },
        { id: 'kpi-performance', title: 'KPI Tracking', route: '/kpi-tracking' },
        { id: 'kpi-performance', title: 'KPI Performance', route: '/kpi-performance' }
      ]
    },
    {
      id: 'schedule',
      title: 'Schedule & Communication',
      icon: 'pi pi-calendar',
      order: 5,
      subItems: [
        { id: 'scheduling', title: 'Scheduling', route: '/calendar-active' },
        {
          id: 'email-sms',
          title: 'Email/SMS',
          subItems: [
            { id: 'sent-emails', title: 'Sent Emails', route: '/sentemails' },
            { id: 'outbox', title: 'OutBox', route: '/outbox' }
          ]
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management & Settings',
      icon: 'pi pi-cog',
      order: 6,
      subItems: [
        { id: 'users', title: 'Users', route: '/admin-dashboard?selectedTab=0' },
        { id: 'roles', title: 'Roles', route: '/admin-dashboard?selectedTab=0' },
        { id: 'privileges', title: 'Privileges', route: '/' },
        { id: 'master-data', title: 'Master Data', route: '/' },
        { id: 'lookups', title: 'Lookups', route: '/admin-dashboard?selectedTab=2' },
        { id: 'my-profile', title: 'My Profile', route: '/admin-dashboard?selectedTab=3' },
        { id: 'help-support', title: 'Help and Support', route: '/' }
      ]
    }
  ])

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show")

        const parent3 = parent2.parentElement
        if (parent3) {
          parent3.classList.add("mm-active")
          parent3.childNodes[0].classList.add("mm-active")
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add("mm-show")
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show")
              parent5.childNodes[0].classList.add("mm-active")
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active")
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement
            if (parent4) {
              parent4.classList.remove("mm-show")
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show")
                parent5.childNodes[0].classList.remove("mm-active")
              }
            }
          }
        }
      }
    }
  }

  const activeMenu = useCallback(() => {
    const pathName = location.pathname
    const fullPath = pathName
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  // Drag and Drop Functions
  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, item) => {
    e.preventDefault()
    setDragOverItem(item)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    // Only clear dragOverItem if we're leaving the container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e, targetItem) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return
    }

    const newMenuItems = [...menuItems]
    const draggedIndex = newMenuItems.findIndex(item => item.id === draggedItem.id)
    const targetIndex = newMenuItems.findIndex(item => item.id === targetItem.id)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove dragged item
      const [removed] = newMenuItems.splice(draggedIndex, 1)
      // Insert at target position
      newMenuItems.splice(targetIndex, 0, removed)
      
      // Update order values
      newMenuItems.forEach((item, index) => {
        item.order = index + 1
      })
      
      setMenuItems(newMenuItems)
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  // Render sub-menu items recursively
  const renderSubMenuItems = (items) => {
    return items.map(item => (
      <li key={item.id}>
        {item.route ? (
          <Link to={item.route}>
            <span
              className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
              title={item.title}
            >
              {props.t(item.title)}
            </span>
          </Link>
        ) : (
          <>
            <Link to="/#" className="has-arrow">
              <span
                className={item.title.length > 20 ? "sidebar-ellipsis" : ""}
                title={item.title}
              >
                {props.t(item.title)}
              </span>
            </Link>
            {item.subItems && (
              <ul className="sub-menu" aria-expanded="false">
                {renderSubMenuItems(item.subItems)}
              </ul>
            )}
          </>
        )}
      </li>
    ))
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <Tooltip target=".sidebar-ellipsis" position="top" />
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {menuItems.map((menuItem) => (
              <li
                key={menuItem.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, menuItem)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, menuItem)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, menuItem)}
                style={{
                  cursor: 'move',
                  backgroundColor: dragOverItem?.id === menuItem.id ? 'rgba(0, 122, 217, 0.1)' : 'transparent',
                  borderRadius: '4px',
                  margin: '2px 0',
                  transition: 'all 0.2s ease'
                }}
                className={draggedItem?.id === menuItem.id ? 'dragging' : ''}
              >
                <Link to="/#" className="has-arrow waves-effect">
                  <i className={menuItem.icon}></i>
                  <span
                    className="sidebar-ellipsis"
                    data-pr-tooltip={props.t(menuItem.title)}
                  >
                    {props.t(menuItem.title)}
                  </span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {renderSubMenuItems(menuItem.subItems)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </SimpleBar>
      
      <style jsx>{`
        .dragging {
          opacity: 0.5 !important;
        }
        
        li[draggable="true"]:hover {
          background-color: rgba(0, 122, 217, 0.05);
        }
        
        li[draggable="true"] {
          position: relative;
        }
        
        li[draggable="true"]:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s ease;
        }
        
        li[draggable="true"]:hover:before {
          background: #007ad9;
        }
      `}</style>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))