import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../common/Sidebar/sidebar/sidebar.component';
import { HeaderComponent } from "../../common/Header/header/header.component";

@Component({
  selector: 'app-company',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
   isSidebarActive = false;

      
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
}
