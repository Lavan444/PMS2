import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const CreateShortform = ({ visible = false, onHide = () => { } }) => {
  const [showAllProjectFields, setShowAllProjectFields] = useState(false);
  const [showAllWorkItemFields, setShowAllWorkItemFields] = useState(false);
  const [showAIWriter, setShowAIWriter] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [workItems, setWorkItems] = useState([{}]);
  const [projectFiles, setProjectFiles] = useState([]);
  const toast = React.useRef(null);

  const [projectData, setProjectData] = useState({
    projectName: 'New Project Initiative',
    company: '',
    projectManager: '',
    startDate: null,
    endDate: null,
    projectDescription: ''
  });

  // Dropdown options
  const projectOptions = [
    { label: 'Select project...', value: '' },
    { label: 'Main Project', value: 'main-project' },
    { label: 'Sub Project A', value: 'sub-project-a' },
    { label: 'Sub Project B', value: 'sub-project-b' },
    { label: 'Phase 1', value: 'phase-1' },
    { label: 'Phase 2', value: 'phase-2' }
  ];

  const moduleOptions = [
    { label: 'Select module...', value: '' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Database', value: 'database' },
    { label: 'API', value: 'api' },
    { label: 'UI/UX', value: 'ui-ux' },
    { label: 'Testing', value: 'testing' },
    { label: 'Deployment', value: 'deployment' },
    { label: 'Documentation', value: 'documentation' }
  ];

  const assigneeOptions = [
    { label: 'Select assignee...', value: '' },
    { label: 'John Doe', value: 'john-doe' },
    { label: 'Jane Smith', value: 'jane-smith' },
    { label: 'Mike Johnson', value: 'mike-johnson' },
    { label: 'Sarah Wilson', value: 'sarah-wilson' },
    { label: 'David Brown', value: 'david-brown' },
    { label: 'Unassigned', value: 'unassigned' }
  ];

  const watcherOptions = [
    { label: 'Select watcher...', value: '' },
    { label: 'Project Manager', value: 'project-manager' },
    { label: 'Team Lead', value: 'team-lead' },
    { label: 'Stakeholder 1', value: 'stakeholder-1' },
    { label: 'Stakeholder 2', value: 'stakeholder-2' },
    { label: 'Quality Assurance', value: 'quality-assurance' },
    { label: 'Client', value: 'client' }
  ];

  const workTypeOptions = [
    { label: 'Select work type...', value: '' },
    { label: 'Task', value: 'task' },
    { label: 'User Story', value: 'story' },
    { label: 'Bug Fix', value: 'bug' },
    { label: 'Epic', value: 'epic' },
    { label: 'Feature', value: 'feature' },
    { label: 'Research', value: 'research' }
  ];

  const statusOptions = [
    { label: 'Select status...', value: '' },
    { label: 'Not Started', value: 'not-started' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Testing', value: 'testing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Blocked', value: 'blocked' }
  ];

  const generateAIDescription = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = `This is a comprehensive project focused on ${aiPrompt}. The project aims to deliver high-quality solutions that meet business objectives and stakeholder requirements. Key deliverables include strategic planning, implementation phases, and thorough testing to ensure optimal results. The scope encompasses all necessary activities to achieve project success within the defined timeline and budget constraints.`;

      handleProjectInputChange('projectDescription', response.trim());
      setShowAIWriter(false);
      setAiPrompt('');
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'AI description generated successfully!' });
    } catch (error) {
      console.error('Error generating AI description:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error generating description. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProjectInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkItemChange = (index, field, value) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems[index] = {
      ...updatedWorkItems[index],
      [field]: value
    };
    setWorkItems(updatedWorkItems);
  };

  const onProjectFileUpload = (event) => {
    const files = event.files;
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setProjectFiles(prev => [...prev, ...newFiles]);
    toast.current.show({ severity: 'info', summary: 'Files Uploaded', detail: `${files.length} file(s) uploaded successfully` });
  };

  const onWorkItemFileUpload = (index, event) => {
    const files = event.files;
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));

    const updatedWorkItems = [...workItems];
    updatedWorkItems[index] = {
      ...updatedWorkItems[index],
      files: [...(updatedWorkItems[index].files || []), ...newFiles]
    };
    setWorkItems(updatedWorkItems);
    toast.current.show({ severity: 'info', summary: 'Files Uploaded', detail: `${files.length} file(s) uploaded for work item ${index + 1}` });
  };

  const removeProjectFile = (fileId) => {
    setProjectFiles(prev => prev.filter(file => file.id !== fileId));
    toast.current.show({ severity: 'warn', summary: 'File Removed', detail: 'Project file removed successfully' });
  };

  const removeWorkItemFile = (workItemIndex, fileId) => {
    const updatedWorkItems = [...workItems];
    updatedWorkItems[workItemIndex].files = updatedWorkItems[workItemIndex].files.filter(file => file.id !== fileId);
    setWorkItems(updatedWorkItems);
    toast.current.show({ severity: 'warn', summary: 'File Removed', detail: 'Work item file removed successfully' });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addWorkItem = () => {
    setWorkItems([...workItems, {}]);
    toast.current.show({ severity: 'success', summary: 'Work Item Added', detail: 'New work item added successfully' });
  };

  const removeWorkItem = (index) => {
    if (workItems.length > 1) {
      confirmDialog({
        message: 'Are you sure you want to remove this work item?',
        header: 'Confirm Removal',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const updatedWorkItems = workItems.filter((_, i) => i !== index);
          setWorkItems(updatedWorkItems);
          toast.current.show({ severity: 'warn', summary: 'Work Item Removed', detail: 'Work item removed successfully' });
        }
      });
    }
  };

  const validateForm = () => {
    if (!projectData.projectName.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Project Name is required!' });
      return false;
    }

    if (showAllWorkItemFields) {
      for (let i = 0; i < workItems.length; i++) {
        const workItem = workItems[i];
        if (!workItem.title?.trim()) {
          toast.current.show({ severity: 'error', summary: 'Validation Error', detail: `Work Item ${i + 1}: Title is required!` });
          return false;
        }
        if (!workItem.summary?.trim()) {
          toast.current.show({ severity: 'error', summary: 'Validation Error', detail: `Work Item ${i + 1}: Summary is required!` });
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Project Data:', projectData);
    console.log('Project Files:', projectFiles);
    console.log('Work Items:', workItems);
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully! Check console for data.' });

    // Close the modal after successful submission
    setTimeout(() => {
      onHide();
    }, 1500);
  };

  const projectFieldsHeader = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-2">
        <i className="pi pi-file text-blue-500 text-xl"></i>
        <div>
          <h3 className="m-0 text-xl font-semibold">Project Details</h3>
          <p className="m-0 text-sm text-500">Basic information about your project</p>
        </div>
      </div>
      <Button
        label={showAllProjectFields ? 'Show Less' : 'Add More'}
        icon={showAllProjectFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
        onClick={() => setShowAllProjectFields(!showAllProjectFields)}
        className="p-button-primary"
      />
    </div>
  );

  const workItemsHeader = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-2">
        <i className="pi pi-check-circle text-green-500 text-xl"></i>
        <div>
          <h3 className="m-0 text-xl font-semibold">Work Type Details</h3>
          <p className="m-0 text-sm text-500">Define tasks and deliverables for your project</p>
        </div>
      </div>
      <Button
        label={showAllWorkItemFields ? 'Show Less' : 'Add More'}
        icon={showAllWorkItemFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'}
        onClick={() => setShowAllWorkItemFields(!showAllWorkItemFields)}
        className="p-button-success"
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <Dialog
        header={
          <div className="flex align-items-center gap-3">
            <i className="pi pi-briefcase text-2xl text-blue-600"></i>
            <div>
              <h1 className="text-xl font-bold m-0">Project Details</h1>
              <p className="text-500 mt-1 mb-0 text-sm">Configure your project details and work type</p>
            </div>
          </div>
        }
        visible={visible}
        onHide={onHide}
        style={{
          width: '60vw',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        contentStyle={{
          height: '70vh',
          overflow: 'auto'
        }}
        maximizable
        modal
        draggable={false}
        resizable={false}
        className="create-project-dialog"
        blockScroll={true}
      >
        <div className="p-4">
          {/* Project Details Section */}
          <Panel header={projectFieldsHeader} className="mb-6" toggleable collapsed={false}>
            <div className="grid">
              {/* Project Name - Always visible and REQUIRED */}
              <div className="col-12">
                <label className="block text-sm font-medium text-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <InputText
                  value={projectData.projectName}
                  onChange={(e) => handleProjectInputChange('projectName', e.target.value)}
                  className="w-full"
                  placeholder="Enter project name..."
                />
                <small className="text-500">Enter the official name of your project. (Required)</small>
              </div>

              {/* Project File Upload - Always visible */}
              <div className="col-12 mt-4">
                <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                  <i className="pi pi-upload"></i>
                  Project Files
                </label>
                <FileUpload
                  mode="basic"
                  multiple
                  accept="*/*"
                  maxFileSize={10000000}
                  onUpload={onProjectFileUpload}
                  auto
                  chooseLabel="Upload Project Files"
                  className="w-full"
                />

                {/* Display uploaded project files */}
                {projectFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-700 mb-2">Uploaded Files:</p>
                    <div className="flex flex-wrap gap-2">
                      {projectFiles.map((file) => (
                        <Tag
                          key={file.id}
                          value={`${file.name} (${formatFileSize(file.size)})`}
                          icon="pi pi-file"
                          severity="info"
                          className="cursor-pointer"
                          onClick={() => removeProjectFile(file.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <small className="text-500">Upload relevant project documents, specifications, or reference materials.</small>
              </div>

              {/* Additional fields shown when "Add More" is clicked */}
              {showAllProjectFields && (
                <>
                  <div className="col-12 md:col-6 mt-4">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-building"></i>
                      Company
                    </label>
                    <InputText
                      value={projectData.company}
                      onChange={(e) => handleProjectInputChange('company', e.target.value)}
                      className="w-full"
                      placeholder="Company name..."
                    />
                    <small className="text-500">Company or client this project is for.</small>
                  </div>

                  <div className="col-12 md:col-6 mt-4">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-user"></i>
                      Project Manager
                    </label>
                    <InputText
                      value={projectData.projectManager}
                      onChange={(e) => handleProjectInputChange('projectManager', e.target.value)}
                      className="w-full"
                      placeholder="Manager name..."
                    />
                    <small className="text-500">Person responsible for managing this project.</small>
                  </div>

                  <div className="col-12 md:col-6 mt-4">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-calendar"></i>
                      Start Date
                    </label>
                    <Calendar
                      value={projectData.startDate}
                      onChange={(e) => handleProjectInputChange('startDate', e.value)}
                      className="w-full"
                      placeholder="Select start date"
                      dateFormat="mm/dd/yy"
                    />
                    <small className="text-500">Expected start date of the project.</small>
                  </div>

                  <div className="col-12 md:col-6 mt-4">
                    <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                      <i className="pi pi-calendar"></i>
                      End Date
                    </label>
                    <Calendar
                      value={projectData.endDate}
                      onChange={(e) => handleProjectInputChange('endDate', e.value)}
                      className="w-full"
                      placeholder="Select end date"
                      dateFormat="mm/dd/yy"
                    />
                    <small className="text-500">Expected completion date of the project.</small>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="flex align-items-center justify-content-between mb-2">
                      <label className="block text-sm font-medium text-700">
                        Project Description
                      </label>
                      <Button
                        label="Write with AI"
                        icon="pi pi-sparkles"
                        onClick={() => setShowAIWriter(!showAIWriter)}
                        className="p-button-secondary p-button-sm"
                      />
                    </div>

                    {showAIWriter && (
                      <div className="mb-4 p-4 bg-purple-50 border-1 border-purple-200 border-round">
                        <div className="flex gap-2">
                          <InputText
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe your project briefly (e.g., 'e-commerce website for clothing store')"
                            className="flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && generateAIDescription()}
                          />
                          <Button
                            label={isGenerating ? 'Generating...' : 'Generate'}
                            icon={isGenerating ? null : 'pi pi-sparkles'}
                            onClick={generateAIDescription}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="p-button-help"
                          >
                            {isGenerating && <ProgressSpinner style={{ width: '16px', height: '16px' }} className="mr-2" />}
                          </Button>
                        </div>
                      </div>
                    )}

                    <InputTextarea
                      rows={4}
                      value={projectData.projectDescription}
                      onChange={(e) => handleProjectInputChange('projectDescription', e.target.value)}
                      className="w-full"
                      placeholder="Describe the project scope and objectives..."
                    />
                    <small className="text-500">Brief summary of the project scope.</small>
                  </div>
                </>
              )}
            </div>
          </Panel>

          {/* Work Item Details Section */}
          <Panel header={workItemsHeader} className="mb-6" toggleable collapsed={!showAllWorkItemFields}>
            {showAllWorkItemFields && (
              <div>
                {workItems.map((workItem, index) => (
                  <Card key={index} className="mb-4 border-1 border-200">
                    <div className="flex justify-content-between align-items-center mb-4">
                      <div className="flex align-items-center gap-2">
                        <div className="w-2rem h-2rem bg-blue-100 text-blue-600 border-circle flex align-items-center justify-content-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <h4 className="m-0 font-medium">Work Type Name {index + 1}</h4>
                      </div>
                      {workItems.length > 1 && (
                        <Button
                          icon="pi pi-times"
                          onClick={() => removeWorkItem(index)}
                          className="p-button-danger p-button-text p-button-sm"
                          tooltip="Remove work item"
                        />
                      )}
                    </div>

                    <div className="grid">
                      {/* Work Item Title - REQUIRED */}
                      <div className="col-12">
                        <label className="block text-sm font-medium text-700 mb-2">
                          Work Type Title <span className="text-red-500">*</span>
                        </label>
                        <InputText
                          value={workItem.title || ''}
                          onChange={(e) => handleWorkItemChange(index, 'title', e.target.value)}
                          className="w-full"
                          placeholder="Enter work type title..."
                        />
                        <small className="text-500">Clear, descriptive name for this work item. (Required)</small>
                      </div>

                      {/* Summary - REQUIRED */}
                      <div className="col-12 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2">
                          Summary <span className="text-red-500">*</span>
                        </label>
                        <InputTextarea
                          rows={2}
                          value={workItem.summary || ''}
                          onChange={(e) => handleWorkItemChange(index, 'summary', e.target.value)}
                          className="w-full"
                          placeholder="Brief summary of the work type..."
                        />
                        <small className="text-500">Concise overview of what this work type entails. (Required)</small>
                      </div>

                      {/* Work Item File Upload */}
                      <div className="col-12 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                          <i className="pi pi-upload"></i>
                          Work Type Files
                        </label>
                        <FileUpload
                          mode="basic"
                          multiple
                          accept="*/*"
                          maxFileSize={10000000}
                          onUpload={(e) => onWorkItemFileUpload(index, e)}
                          auto
                          chooseLabel="Upload Files"
                          className="w-full"
                        />

                        {/* Display uploaded work item files */}
                        {workItem.files && workItem.files.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-700 mb-2">Uploaded Files:</p>
                            <div className="flex flex-wrap gap-2">
                              {workItem.files.map((file) => (
                                <Tag
                                  key={file.id}
                                  value={`${file.name} (${formatFileSize(file.size)})`}
                                  icon="pi pi-file"
                                  severity="success"
                                  className="cursor-pointer"
                                  onClick={() => removeWorkItemFile(index, file.id)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        <small className="text-500">Upload documents, designs, or reference materials for this work type.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2">Project</label>
                        <Dropdown
                          value={workItem.project || ''}
                          onChange={(e) => handleWorkItemChange(index, 'project', e.value)}
                          options={projectOptions}
                          className="w-full"
                          placeholder="Select project..."
                        />
                        <small className="text-500">Which project or phase this work type belongs to.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2">Select Module</label>
                        <Dropdown
                          value={workItem.module || ''}
                          onChange={(e) => handleWorkItemChange(index, 'module', e.value)}
                          options={moduleOptions}
                          className="w-full"
                          placeholder="Select module..."
                        />
                        <small className="text-500">Technical module or component this work relates to.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                          <i className="pi pi-user"></i>
                          Assigned To
                        </label>
                        <Dropdown
                          value={workItem.assignedTo || ''}
                          onChange={(e) => handleWorkItemChange(index, 'assignedTo', e.value)}
                          options={assigneeOptions}
                          className="w-full"
                          placeholder="Select assignee..."
                        />
                        <small className="text-500">Team member responsible for completing this work.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                          <i className="pi pi-eye"></i>
                          Add Watcher
                        </label>
                        <Dropdown
                          value={workItem.watcher || ''}
                          onChange={(e) => handleWorkItemChange(index, 'watcher', e.value)}
                          options={watcherOptions}
                          className="w-full"
                          placeholder="Select watcher..."
                        />
                        <small className="text-500">Person who will receive notifications about this work type.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2">Work Type</label>
                        <Dropdown
                          value={workItem.workType || ''}
                          onChange={(e) => handleWorkItemChange(index, 'workType', e.value)}
                          options={workTypeOptions}
                          className="w-full"
                          placeholder="Select work type..."
                        />
                        <small className="text-500">Category or type of work to be performed.</small>
                      </div>

                      <div className="col-12 md:col-6 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2">Work Type Status</label>
                        <Dropdown
                          value={workItem.status || ''}
                          onChange={(e) => handleWorkItemChange(index, 'status', e.value)}
                          options={statusOptions}
                          className="w-full"
                          placeholder="Select status..."
                        />
                        <small className="text-500">Current progress status of this work type.</small>
                      </div>

                      <div className="col-12 mt-3">
                        <label className="block text-sm font-medium text-700 mb-2 flex align-items-center gap-2">
                          <i className="pi pi-clock"></i>
                          Work Hours
                        </label>
                        <InputNumber
                          value={workItem.workHours || 0}
                          onValueChange={(e) => handleWorkItemChange(index, 'workHours', e.value)}
                          className="w-full"
                          min={0}
                          step={0.5}
                          placeholder="0"
                          suffix=" hours"
                        />
                        <small className="text-500">Estimated time required to complete this work type.</small>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button
                  label="Add Another Work Item"
                  icon="pi pi-plus"
                  onClick={addWorkItem}
                  className="w-full p-button-outlined p-button-success"
                />
              </div>
            )}

            {!showAllWorkItemFields && (
              <div className="text-center py-8 text-500">
                <i className="pi pi-check-circle text-6xl mb-3 opacity-50"></i>
                <p>Click "Add More" to configure work Type for your project</p>
              </div>
            )}
          </Panel>

          {/* Submit Button */}
          <Divider />
          <div className="flex justify-content-between pt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={onHide}
              className="p-button-text p-button-secondary"
            />
            <Button
              label="Create Project"
              icon="pi pi-check"
              onClick={() => {
                onHide();
                handleSubmit();
              }}
              
              className="p-button-lg"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateShortform;