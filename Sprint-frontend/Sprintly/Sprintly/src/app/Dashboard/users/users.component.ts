import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-users',
  imports: [SidebarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
isSidebarActive = false;
}
