
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";

import { Component, ViewChild } from '@angular/core';
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


interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
  tenantId: string;
}


@Component({
  selector: 'app-users',
  imports: [SidebarComponent, HeaderComponent
    , FormsModule,
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    ButtonModule,
    DialogModule
  ],
  providers: [MessageService]
  ,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  isSidebarActive = false;
  users: User[] = [];
  isModalOpen = false;
  modalTitle = 'Add User';
  globalFilterValue = '';
  editingIndex: number | null = null;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild('dt') dt!: Table;

  constructor(private userService: UserService, private messageService: MessageService) { }

  formData: User = {
    name: '',
    email: '',
    password: '',
    roleId: 1,
    tenantId: ''
  };

  roles = [
    { label: 'Admin', value: 1 },
    { label: 'Project Manager', value: 2 },
    { label: 'Developer', value: 3 },
    { label: 'Viewer', value: 4 }
  ];

  ngOnInit() {
       const token = localStorage.getItem('token');
    const email = this.getEmailFromToken(token);

    if (email) {
      this.userService.getTenantByEmail(email).subscribe(tenant => {
        this.formData.tenantId = tenant.id;
        this.loadUsers();
      });
    }
  }

  loadUsers() {
  this.userService.getAllUsers().subscribe(users => {
    this.users = users;
  });
}

  getEmailFromToken(token: string | null): string | null {
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    return email ?? null;
  }


  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
  getRoleLabel(roleId: number): string {
    return this.roles.find(r => r.value === roleId)?.label ?? 'Unknown';
  }

  openModal(index?: number) {
    this.isModalOpen = true;
    if (index !== undefined) {
      this.modalTitle = 'Update User';
      this.editingIndex = index;
      this.formData = { ...this.users[index] };
    } else {
      this.modalTitle = 'Add User';
      this.editingIndex = null;
      this.formData = {
        name: '',
        email: '',
        password: '',
        roleId: 1,
        tenantId: this.formData.tenantId
      };
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = null;
    this.formData = {
      name: '',
      email: '',
      password: '',
      roleId: 1,
      tenantId: this.formData.tenantId
    };
  }

  saveUser() {
    if (this.editingIndex === null) {

const payload = {
  ...this.formData,
  role: this.formData.roleId // now it's already a number
};

      this.userService.createUser(payload).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user' });
      });
    } else {
      const id = this.users[this.editingIndex].id!;
      this.userService.updateUser(id, this.formData).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user' });
      });
    }
  }

  deleteUser(index: number) {
    const user = this.users[index];
    if (user.id && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
        this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'User deleted successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
      });
    }
  }


}
