import { Component, OnInit, ViewChild } from '@angular/core';
// import { TaskService, TaskItem, TaskStatus } from './task.service';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DragDropModule, Droppable } from 'primeng/dragdrop'; // ✅ For drag & drop support
import { MessageService } from 'primeng/api';
import { TaskService,Task, TaskStatus } from '../../services/DashboardServices/task.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  imports: [
    ToastModule,
    MessagesModule,
    MessageModule,
    DragDropModule,
    CommonModule,
    SidebarComponent,
    HeaderComponent
],
  providers: [MessageService]
})
export class KanbanBoardComponent implements OnInit {
  projectId = 'B007B9A2-7CC7-4D27-911A-54776AE43DEE'; // Replace with dynamic project ID
  columns: any[] = [];
   draggedTask: Task | null = null;
  tasks: Task[] = [];
  isSidebarActive: any;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  constructor(private taskService: TaskService, private msg: MessageService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

   closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
  loadTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.setupColumns();
      },
      error: () => this.msg.add({ severity: 'error', summary: 'Failed to load tasks' })
    });
  }

   onDragStart(event: DragEvent, task: Task) {
    this.draggedTask = task;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  setupColumns() {
    this.columns = [
      {
        header: 'To Do',
        status: TaskStatus.ToDo,
        tasks: this.tasks.filter(t => t.status === TaskStatus.ToDo)
      },
      {
        header: 'In Progress',
        status: TaskStatus.InProgress,
        tasks: this.tasks.filter(t => t.status === TaskStatus.InProgress)
      },
      {
        header: 'Done',
        status: TaskStatus.Done,
        tasks: this.tasks.filter(t => t.status === TaskStatus.Done)
      }
    ];
  }

  onDrop(event: DragEvent, newStatus: TaskStatus) {
    event.preventDefault();
    if (!this.draggedTask || this.draggedTask.status === newStatus) return;

    const taskToUpdate = this.draggedTask;
    this.draggedTask = null;

    this.taskService.updateTaskStatus(taskToUpdate.id, newStatus).subscribe({
      next: () => {
        taskToUpdate.status = newStatus;
        this.setupColumns();
        this.msg.add({ severity: 'success', summary: 'Task status updated' });
      },
      error: () => this.msg.add({ severity: 'error', summary: 'Failed to update task' })
    });
  }
  onTaskDrop(event: any, newStatus: TaskStatus) {
    const task: Task = event.dragData;

    if (task.status === newStatus) return;

    this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
      next: () => {
        task.status = newStatus;
        this.setupColumns();
        this.msg.add({ severity: 'success', summary: 'Status updated' });
      },
      error: () => this.msg.add({ severity: 'error', summary: 'Failed to update task' })
    });
  }
}
