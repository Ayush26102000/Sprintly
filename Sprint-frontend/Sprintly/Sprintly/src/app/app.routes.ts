import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';
import { UsersComponent } from './Dashboard/users/users.component';
import { TaskComponent } from './Dashboard/task/task.component';
import { SprintComponent } from './Dashboard/sprint/sprint.component';
import { ReportsComponent } from './Dashboard/reports/reports.component';
import { ProjectsComponent } from './Dashboard/projects/projects.component';
import { CompanyComponent } from './Dashboard/company/company.component';
import { UserReportComponent } from './Dashboard/user-report/user-report.component';

export const routes: Routes = [

     { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UsersComponent },
  { path: 'task', component: TaskComponent },
  { path: 'sprint', component: SprintComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'userreport', component: UserReportComponent },
  { path: '**', redirectTo: 'login' }
];
