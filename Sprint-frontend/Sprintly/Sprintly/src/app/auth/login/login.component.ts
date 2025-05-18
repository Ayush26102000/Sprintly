import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service/auth.service'; // adjust path as needed
// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class LoginComponent {

form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private authservice : AuthService
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  goToRegister(): void {
  this.router.navigate(['/register']);
}

  login() {
    if (this.form.valid) {
         this.authservice.login(this.form.value).subscribe({
        next: (res) => {
          this.authservice.setToken(res.token);
          alert("login");
          this.messageService.add({ severity: 'success', summary: 'Login', detail: 'Success' });
          //this.router.navigate(['/dashboard']); // Update as needed
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials' });
        }
      });
    }
  }
}
