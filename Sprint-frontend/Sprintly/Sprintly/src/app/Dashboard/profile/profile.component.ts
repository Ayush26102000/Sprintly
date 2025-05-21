import { Component } from '@angular/core';
import { SidebarComponent } from "../../common/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-profile',
  imports: [SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
isSidebarActive = false;
}
