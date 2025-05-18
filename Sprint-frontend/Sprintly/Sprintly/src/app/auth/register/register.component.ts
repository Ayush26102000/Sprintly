import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

    ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

goToLogin(){
  this.router.navigate(['/login']);
}


  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
           alert("login");
          this.messageService.add({ severity: 'success', summary: 'Registered', detail: 'Account created' });
          this.router.navigate(['/login']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed' });
        }
      });
    }
  }
}

