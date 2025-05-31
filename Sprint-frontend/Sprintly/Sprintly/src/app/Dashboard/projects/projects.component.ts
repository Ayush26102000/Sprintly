import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../common/Sidebar/sidebar/sidebar.component';
import { HeaderComponent } from '../../common/Header/header/header.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/DashboardServices/user.service';
import { Table } from 'primeng/table';
import { ProjectService } from '../../services/DashboardServices/project.service';
import { CommonService } from '../../services/common.service';

interface Project {
  id?: string;
  name: string;
  description: string;
  tenantId: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SidebarComponent, HeaderComponent,
    FormsModule, CommonModule,
    TableModule, InputTextModule,
    ButtonModule, DialogModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  isSidebarActive = false;
  projects: Project[] = [];
  isModalOpen = false;
  modalTitle = 'Add Project';
  editingIndex: number | null = null;
  globalFilterValue = '';

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild('dt') dt!: Table;

  formData: Project = {
    name: '',
    description: '',
    tenantId: ''
  };

  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
   const email = this.commonService.getEmailFromToken(token);

    if (email) {
      this.userService.getTenantByEmail(email).subscribe(tenant => {
        this.formData.tenantId = tenant.id;
        this.loadProjects();
      });
    }
  }

  loadProjects() {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }

  openModal(index?: number) {
    this.isModalOpen = true;
    if (index !== undefined) {
      this.modalTitle = 'Update Project';
      this.editingIndex = index;
      this.formData = { ...this.projects[index] };
    } else {
      this.modalTitle = 'Add Project';
      this.editingIndex = null;
      this.formData = {
        name: '',
        description: '',
        tenantId: this.formData.tenantId
      };
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = null;
    this.formData = {
      name: '',
      description: '',
      tenantId: this.formData.tenantId
    };
  }

  saveProject() {
    if (this.editingIndex === null) {
      // Create
      this.projectService.create(this.formData).subscribe(() => {
        this.loadProjects();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project created successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create project' });
      });
    } else {
      // Update
      const id = this.projects[this.editingIndex].id!;
      this.projectService.update(id, this.formData).subscribe(() => {
        this.loadProjects();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project updated successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update project' });
      });
    }
  }

  deleteProject(index: number) {
    const project = this.projects[index];
    if (project.id && confirm('Are you sure you want to delete this project?')) {
      this.projectService.delete(project.id).subscribe(() => {
        this.loadProjects();
        this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'Project deleted successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete project' });
      });
    }
  }
}
