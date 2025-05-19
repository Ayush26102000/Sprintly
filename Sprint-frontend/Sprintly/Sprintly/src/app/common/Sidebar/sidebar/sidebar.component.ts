import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import { RouterLink } from '@angular/router';

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
  isActive = false;
  roleId: number = 0;
  filteredMenu: MenuItem[] = [];

  menuItems: MenuItem[] = [
    { name: 'Dashboard', route: '/dashboard', roles: [1, 2, 3] },
    { name: 'User', route: '/user', roles: [1] },
    { name: 'Messages', route: '/messages', roles: [1, 2] },
    { name: 'Analytics', route: '/analytics', roles: [2] },
    { name: 'Files Manager', route: '/files', roles: [1, 3] },
    { name: 'Order', route: '/order', roles: [1, 2, 3] },
    { name: 'Saved', route: '/saved', roles: [2] },
    { name: 'Settings', route: '/settings', roles: [1, 2, 3] }
  ];

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.roleId = decoded?.roleId; // make sure your payload includes roleId
      this.filteredMenu = this.menuItems.filter(item => item.roles.includes(this.roleId));
    }
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}