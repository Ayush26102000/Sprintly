import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";
import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService, Task } from '../../services/DashboardServices/task.service';
import { FormsModule } from '@angular/forms';
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

export interface Project {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  tenantName: string;
}




@Component({
  selector: 'app-task',
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
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})



export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  formData: Task = {
    title: '',
    description: '',
    priority: 'Low',
    projectId: '',
    sprintId: null,
      assignedUserId: '',
      status: 0 
  };
  priorities = [
    { label: 'Low', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'High', value: 2 },
    { label: 'Critical', value: 3 }
  ];

  statuses = [
  { label: 'Backlog', value: 0 },
  { label: 'To Do', value: 1 },
  { label: 'In Progress', value: 2 },
  { label: 'Review', value: 3 },
  { label: 'Done', value: 4 }
];
statusLabels = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'];

  isSidebarActive = false;
  isModalOpen = false;
  modalTitle = 'Add Task';
  editingIndex: number | null = null;
  globalFilterValue = '';
users: any[] = [];

priorityLabels = ['Low', 'Medium', 'High', 'Critical'];


  @ViewChild('dt') dt!: Table;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  projects: any[] | undefined;

  constructor(private taskService: TaskService, private messageService: MessageService, private userService : UserService) { }

  ngOnInit() {
    this.loadTasks();
    this.loadProjects();
      this.loadUsers();
  }

  loadUsers() {
  this.userService.getAllUsers().subscribe(users => {
    this.users = users;
  });
}

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

    getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'InProgress': return 'status-in-progress';
      case 'Completed': return 'status-completed';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  openModal(index?: number) {
    this.isModalOpen = true;
    if (index !== undefined) {
      this.modalTitle = 'Update Task';
      this.editingIndex = index;
      this.formData = { ...this.tasks[index] };
    } else {
      this.modalTitle = 'Add Task';
      this.editingIndex = null;
      this.formData = {
        title: '',
        description: '',
        priority: 'Low',
        projectId: '',
        sprintId: null,
        assignedUserId: '',
        status: 0 
      };
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = null;
    this.formData = {
      title: '',
      description: '',
      priority: 'Low',
      projectId: '',
      sprintId: null,
      assignedUserId:'',
      status: 0 
    };
  }

  getUserName(userId: string): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.name : 'Unassigned';
}
onUserFilter(event: Event, dt: any) {
  const input = event.target as HTMLInputElement;
  dt.filter(input.value, 'assignedUserId', 'contains');
}



  loadProjects() {
    this.taskService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  saveTask() {
    if (this.editingIndex === null) {
      this.taskService.createTask(this.formData).subscribe(() => {
        this.loadTasks();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task' });
      });
    } else {
      const id = this.tasks[this.editingIndex].id!;
      this.taskService.updateTask(id, this.formData).subscribe(() => {
        this.loadTasks();
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task' });
      });
    }
  }

  deleteTask(index: number) {
    const task = this.tasks[index];
    if (task.id && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
        this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'Task deleted successfully' });
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task' });
      });
    }
  }
}
