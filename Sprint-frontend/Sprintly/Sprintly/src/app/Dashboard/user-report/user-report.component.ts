import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../common/Sidebar/sidebar/sidebar.component';
import { HeaderComponent } from '../../common/Header/header/header.component';
import { UserService } from '../../services/DashboardServices/user.service';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
// import { ReportService } from 'src/app/services/report.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [  HeaderComponent,
  SidebarComponent,
  CommonModule,
  FormsModule,
  TableModule,
  DropdownModule,
  CardModule,
  BadgeModule,
  ChartModule],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent implements OnInit {
  isSidebarActive = false;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  globalFilterValue = '';
  users: any[] = [];
  selectedUserId: string = '';
  userReport: any;
  tasksByPriorityArray: { key: string, value: number }[] = [];
globalTaskFilter: any;

  constructor(private userService: UserService, private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadUserReport() {
  if (!this.selectedUserId) return;

  this.reportService.getUserReport(this.selectedUserId).subscribe(report => {
    this.userReport = report;

    // Create priority map
    const priorityMap: { [key: string]: number } = {};
    report.tasks.forEach((task: any) => {
      const key = `Priority ${task.priority}`;
      priorityMap[key] = (priorityMap[key] || 0) + 1;
    });

    this.tasksByPriorityArray = Object.entries(priorityMap).map(([key, value]) => ({ key, value }));
  });
}
getStatusText(status: number): string {
  switch (status) {
    case 0: return 'To Do';
    case 2: return 'In Progress';
    case 4: return 'Done';
    default: return 'Unknown';
  }
}


}
