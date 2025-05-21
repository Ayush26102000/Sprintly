import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-reports',
  imports: [SidebarComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
isSidebarActive = false;
}
