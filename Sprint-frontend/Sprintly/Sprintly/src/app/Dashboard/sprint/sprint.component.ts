import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "../../common/Header/header/header.component";

@Component({
  selector: 'app-sprint',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
isSidebarActive = false;
}
