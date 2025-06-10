import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/DashboardServices/project.service';

interface Project {
  id?: string;
  name: string;
  description: string;
  tenantId: string;
}

@Component({
  selector: 'app-reports',
  imports: [SidebarComponent, HeaderComponent,ChartModule,DropdownModule,FormsModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
isSidebarActive = false;
  projects: Project[] = [];
 report: any;
  projectId!: string;
  selectedProjectId: string | null = null;
  pieData: any;
  barData: any;

  pieOptions: any;
  barOptions: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private projectService :ProjectService) {}

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
 ngOnInit(): void {
    this.loadProjects();
    this.setupChartOptions();
  }

  loadProjects() {
    this.projectService.getAll().subscribe(projects => {
      console.log(projects);
      this.projects = projects;
    });
  }

  onProjectSelect() {
    if (!this.selectedProjectId) return;

    this.http.get(`http://localhost:5001/api/project/${this.selectedProjectId}/report`).subscribe((data: any) => {
      this.report = data;
      this.setupCharts(data);
    });
  }

  setupChartOptions() {
    this.pieOptions = {
      plugins: {
        legend: {
          labels: { color: 'white' }
        }
      }
    };

    this.barOptions = {
      scales: {
        x: { ticks: { color: 'white' }, grid: { color: '#555' } },
        y: { ticks: { color: 'white' }, grid: { color: '#555' } }
      },
      plugins: {
        legend: { labels: { color: 'white' } }
      }
    };
  }

  setupCharts(data: any) {
    this.pieData = {
      labels: ['To Do', 'In Progress', 'Done'],
      datasets: [{
        data: [data.todoTasks, data.inProgressTasks, data.doneTasks],
        backgroundColor: ['#f39c12', '#3498db', '#2ecc71']
      }]
    };

    const priorities = Object.keys(data.tasksByPriority);
    const counts = Object.values(data.tasksByPriority);

    this.barData = {
      labels: priorities,
      datasets: [{
        label: 'Tasks by Priority',
        backgroundColor: '#9b59b6',
        data: counts
      }]
    };
  }
}

