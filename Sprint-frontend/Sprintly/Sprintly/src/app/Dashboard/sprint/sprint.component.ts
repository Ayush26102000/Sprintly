import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserService } from "../../services/DashboardServices/user.service";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { jwtDecode } from "jwt-decode";
import { Table } from 'primeng/table';
import { SprintService } from '../../services/DashboardServices/sprint.service';
import { CommonService } from '../../services/common.service';

interface Sprint {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  projectId: string;
  tenantID: string;
}

@Component({
  selector: 'app-sprint',
  imports: [SidebarComponent, HeaderComponent, FormsModule, CommonModule, TableModule,
    InputTextModule, DropdownModule, ToastModule,
    ButtonModule, DialogModule],
  providers: [MessageService],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {

  sprint: Sprint[] = [];
  isModalOpen = false;
  modalTitle = 'Add Sprint';
  globalFilterValue = '';
  editingIndex: number | null = null;
  isSidebarActive = false;

  @ViewChild('dt') dt!: Table;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private commonService: CommonService, private userService: UserService, private sprintService: SprintService, private messageService: MessageService) { }

  formData: Sprint = {
    name: '',
    startDate: '',
    endDate: '',
    projectId: '',
    tenantID: ''
  };

  ngOnInit() {
    const token = localStorage.getItem('token');
    const email = this.commonService.getEmailFromToken(token);

    if (email) {
      this.userService.getTenantByEmail(email).subscribe(tenant => {
        this.formData.tenantID = tenant.id;
        this.loadSprints();
      });
    }
  }

  loadSprints() {
    this.sprintService.getAll().subscribe(sprints => {
      this.sprint = sprints;
    });
  }




  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
}
