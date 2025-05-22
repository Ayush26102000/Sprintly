import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authservice : AuthService){}
  logout(){
    this.authservice.logout();
  }

}
