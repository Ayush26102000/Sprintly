import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-projects',
  imports: [SidebarComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
isSidebarActive = false;
}
