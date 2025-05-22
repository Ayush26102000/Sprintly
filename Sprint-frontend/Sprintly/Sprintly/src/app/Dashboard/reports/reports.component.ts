import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";

@Component({
  selector: 'app-reports',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
isSidebarActive = false;
}
