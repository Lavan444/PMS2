import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const EstimateTable = () => {
  const [phases, setPhases] = useState([
    {
      phase: 'Discovery / Initiation',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-14'),
      deliverables: ['Project charter', 'Goals & scope', 'Stakeholder identification'],
      responsible: 'Project Manager'
    },
  ]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [currentPhase, setCurrentPhase] = useState({
    phase: '',
    startDate: null,
    endDate: null,
    deliverables: [],
    responsible: ''
  });
  const [editIndex, setEditIndex] = useState(null); // Track editing row

  // Add state for error dialog
  const [errorDialog, setErrorDialog] = useState({ visible: false, message: '' });
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, rowIndex: null });

  const responsibleOptions = [
    'Project Manager',
    'Business Analyst',
    'UI/UX Designer',
    'Software Developer',
    'DevOps Engineer',
    'QA Engineer',
    'Product Owner',
    'Scrum Master',
    'Technical Lead',
    'System Architect'
  ];

  const openNewPhaseDialog = () => {
    setCurrentPhase({ phase: '', startDate: null, endDate: null, deliverables: [], responsible: '' });
    setEditIndex(null);
    setDisplayDialog(true);
  };

  const openEditPhaseDialog = (rowData, rowIndex) => {
    setCurrentPhase({ ...rowData });
    setEditIndex(rowIndex);
    setDisplayDialog(true);
  };

  const savePhase = () => {
    if (!currentPhase.phase) {
      setErrorDialog({ visible: true, message: 'Phase is required' });
      return;
    }
    if (currentPhase.startDate && currentPhase.endDate && currentPhase.endDate < currentPhase.startDate) {
      setErrorDialog({ visible: true, message: 'End date must be after start date' });
      return;
    }

    // Ensure deliverables is always an array
    const phaseToSave = {
      ...currentPhase,
      deliverables: Array.isArray(currentPhase.deliverables) ? currentPhase.deliverables : []
    };

    if (editIndex !== null) {
      // Edit mode
      const updatedPhases = [...phases];
      updatedPhases[editIndex] = phaseToSave;
      setPhases(updatedPhases);
    } else {
      // Add mode
      setPhases([...phases, phaseToSave]);
    }
    setDisplayDialog(false);
  };

  const confirmDeletePhase = (rowIndex) => {
    setDeleteDialog({ visible: true, rowIndex });
  };

  const handleDeleteConfirmed = () => {
    const updatedPhases = phases.filter((_, idx) => idx !== deleteDialog.rowIndex);
    setPhases(updatedPhases);
    setDeleteDialog({ visible: false, rowIndex: null });
  };

  const handleDeleteCancelled = () => {
    setDeleteDialog({ visible: false, rowIndex: null });
  };

  const formatDateRange = (startDate, endDate) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const start = new Date(startDate).toLocaleDateString(undefined, options);
    const end = new Date(endDate).toLocaleDateString(undefined, options);
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(diffDays / 7);
    // Split main date and extra info for custom rendering
    return {
      main: `${start} - ${end}`,
      extra: `(${weeks} week${weeks !== 1 ? 's' : ''}, ${diffDays} days)`
    };
  };

  // Custom body template for dateRange column
  const dateRangeBody = (rowData) => {
    const { main, extra } = formatDateRange(rowData.startDate, rowData.endDate);
    return (
      <div>
        <div>{main}</div>
        <div style={{ fontSize: '1em', color: '#000' }}>{extra}</div>
      </div>
    );
  };

  const sanitizeId = (str) =>
    String(str)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  const deliverablesTemplate = (rowData) => {
    const deliverables = Array.isArray(rowData.deliverables) ? rowData.deliverables : [];

    // If no deliverables, show a placeholder
    if (deliverables.length === 0) {
      return <div style={{ color: '#888', fontStyle: 'italic' }}>No deliverables added</div>;
    }

    const maxLen = 25; // increased max chars per bullet before ellipsis
    return (
      <div>
        {deliverables.map((item, i) => {
          // Ensure item is a string
          const itemText = typeof item === 'string' ? item : String(item || '');

          if (!itemText.trim()) return null; // Skip empty items

          const showEllipsis = itemText.length > maxLen;
          const shortText = showEllipsis ? itemText.slice(0, maxLen) + '...' : itemText;
          const tooltipId = `deliverable-tooltip-${sanitizeId(rowData.phase || 'phase')}-${i}`;

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{
                display: 'inline-block',
                minWidth: 16,
                marginRight: 8,
                fontWeight: 'bold',
                fontSize: '1.1em',
                lineHeight: 1,
                color: '#4f46e5'
              }}>•</span>
              <span
                id={tooltipId}
                style={{
                  cursor: showEllipsis ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  maxWidth: 200,
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}
              >
                {shortText}
              </span>
              {showEllipsis && (
                <Tooltip target={`#${tooltipId}`} content={itemText} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Actions column template
  const actionsBodyTemplate = (rowData, { rowIndex }) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-sm"
        onClick={() => openEditPhaseDialog(rowData, rowIndex)}
        tooltip="Edit"
        type="button"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-sm"
        onClick={() => confirmDeletePhase(rowIndex)}
        tooltip="Delete"
        type="button"
        severity="danger"
      />
    </div>
  );

  return (
    <div className="mx-auto" style={{ border: 'none' }}>
      <style>
        {`
          /* Table header styling */
          .custom-ats-table .p-datatable-thead > tr > th {
            border: none !important;
            background: #f8fafc !important;
            color: #22223b !important;
            font-weight: 600;
            font-size: 1rem;
            padding: 14px 18px !important;
          }
          /* Table row styling */
          .custom-ats-table .p-datatable-tbody > tr {
            background: #fff !important;
            transition: background 0.2s;
          }
          .custom-ats-table .p-datatable-tbody > tr:hover {
            background: #f1f5f9 !important;
          }
          /* Table cell styling */
          .custom-ats-table .p-datatable-tbody > tr > td {
            border: none !important;
            color: #22223b !important;
            font-size: 0.97rem;
            padding: 12px 18px !important;
            vertical-align: middle;
          }
          /* Table container */
          .doc-table {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: none !important;
            border: none !important;
            background: #fff;
          }
          /* Remove DataTable border */
          .custom-ats-table.p-datatable {
            border: none !important;
            box-shadow: none !important;
          }
          /* Remove border from p-datatable-wrapper */
          .custom-ats-table .p-datatable-wrapper {
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <div
        className="flex justify-content-end align-items-center mb-3"
        style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}
      >
        <Button icon="pi pi-plus" label="Add Phase" onClick={openNewPhaseDialog} />
      </div>
      <div className="doc-table" style={{ border: 'none', boxShadow: 'none' }}>
        <DataTable
          value={phases}
          responsiveLayout="scroll"
          className="p-datatable-sm custom-ats-table"
          showGridlines={false}
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <Column field="phase" header="Phase" style={{ width: '22%' }}></Column>
          <Column
            field="dateRange"
            header="Duration (Example)"
            body={dateRangeBody}
            style={{ width: '22%' }}
          ></Column>
          <Column
            field="deliverables"
            header="Key Deliverables"
            body={deliverablesTemplate}
            style={{ width: '31%' }}
          ></Column>
          <Column field="responsible" header="Responsible" style={{ width: '15%' }}></Column>
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ width: '10%', textAlign: 'center' }}
          />
        </DataTable>
      </div>

      {/* Modal */}
      <Dialog
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
        header={editIndex !== null ? "Edit Phase" : "Add New Phase"}
        style={{ width: '40vw', maxWidth: 600, border: 'none', boxShadow: 'none' }}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} severity="secondary" />
            <Button label="Save" icon="pi pi-check" onClick={savePhase} />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="field mb-4">
            <label className="font-semibold mb-2 block">Phase *</label>
            <InputText
              value={currentPhase.phase}
              onChange={(e) => setCurrentPhase({ ...currentPhase, phase: e.target.value })}
              className="w-full"
              placeholder="Enter phase name"
            />
          </div>
          <div className="formgrid grid mb-4">
            <div className="field col-6">
              <label className="font-semibold mb-2 block">Start Date</label>
              <Calendar
                value={currentPhase.startDate}
                onChange={(e) => setCurrentPhase({ ...currentPhase, startDate: e.value })}
                showIcon
                className="w-full"
                placeholder="Select start date"
              />
            </div>
            <div className="field col-6">
              <label className="font-semibold mb-2 block">End Date</label>
              <Calendar
                value={currentPhase.endDate}
                onChange={(e) => setCurrentPhase({ ...currentPhase, endDate: e.value })}
                minDate={currentPhase.startDate}
                showIcon
                className="w-full"
                placeholder="Select end date"
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="font-semibold mb-2 block">Deliverables</label>
            <Chips
              value={currentPhase.deliverables || []}
              onChange={(e) => setCurrentPhase({ ...currentPhase, deliverables: e.value || [] })}
              className="w-full"
              separator=","
              placeholder="Type deliverable and press Enter to add"
              addOnBlur={true}
            />
            <small className="text-gray-600 mt-1 block">Press Enter or Tab after typing each deliverable</small>
          </div>
          <div className="field mb-2">
            <label className="font-semibold mb-2 block">Responsible</label>
            <Dropdown
              value={currentPhase.responsible}
              options={responsibleOptions}
              onChange={(e) => setCurrentPhase({ ...currentPhase, responsible: e.value })}
              placeholder="Select Responsible"
              className="w-full bgclr"
            />
          </div>
        </div>
      </Dialog>
      {/* Error Dialog */}
      <Dialog
        visible={errorDialog.visible}
        onHide={() => setErrorDialog({ visible: false, message: '' })}
        header="Validation Error"
        style={{ width: '350px' }}
        footer={
          <Button
            label="OK"
            icon="pi pi-check"
            onClick={() => setErrorDialog({ visible: false, message: '' })}
            autoFocus
          />
        }
        modal
      >
        <div>{errorDialog.message}</div>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        visible={deleteDialog.visible}
        onHide={handleDeleteCancelled}
        header="Confirm Delete"
        style={{ width: '350px' }}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" onClick={handleDeleteCancelled} severity="secondary" />
            <Button label="Delete" icon="pi pi-trash" onClick={handleDeleteConfirmed} severity="danger" />
          </div>
        }
        modal
      >
        <div>Are you sure you want to delete this phase?</div>
      </Dialog>
    </div>
  );
};

export default EstimateTable;