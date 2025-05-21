import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-sprint',
  imports: [SidebarComponent],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
isSidebarActive = false;
}
