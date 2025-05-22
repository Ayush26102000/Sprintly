import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';

interface MenuItem {
  name: string;
  route: string;
  roles: number[]; // roles allowed to see this item
}

@Component({
  selector: 'app-sidebar',
  standalone : true,
  imports:[RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  @Output() toggleSidebar = new EventEmitter<boolean>();
  constructor(private authService : AuthService){}
  isActive = false;
  roleId: number = 0;
  filteredMenu: MenuItem[] = [];



  menuItems: MenuItem[] = [
    { name: 'Dashboard', route: '/dashboard', roles: [1, 2, 3] },
    { name: 'Profile', route: '/profile', roles: [1, 2, 3] },
    { name: 'Users', route: '/user', roles: [1 ,2] },
    { name: 'Task', route: '/task', roles: [1, 2 ,3] },
    { name: 'Sprint', route: '/sprint', roles: [1, 2 ] },
    { name: 'Reports', route: '/reports', roles: [1, 2] },
    { name: 'Projects', route: '/projects', roles: [1, 2 ] }
  ];

  ngOnInit() {


    const token = localStorage.getItem('token');
    if (token) { 
      const decoded: any = jwtDecode(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roleId = +payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.filteredMenu = this.menuItems.filter(item => item.roles.includes(roleId));
    }else{
      this.authService.logout();
    }
  }

  toggleSidebarState() {
      this.isActive = !this.isActive;
    this.toggleSidebar.emit(this.isActive);
    }

    logout(){
      this.authService.logout();
    }

    closeSidebar() {
     this.isActive = false;
    this.toggleSidebar.emit(false);
  
}

}