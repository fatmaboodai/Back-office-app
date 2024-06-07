import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Authservices/auth.service';
import { Manager } from '../../interfaces/users';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css'], // corrected styleUrls instead of styleUrl
})
export class ManagerLoginComponent {
  LoginForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }
  isEmailEmpty(): boolean {
    return (
      this.LoginForm?.get('Email')?.value.trim() === '' ||
      !this.LoginForm.get('Email')
    );
  }

  isPasswordEmpty(): boolean {
    return (
      this.LoginForm?.get('Password')?.value.trim() === '' ||
      !this.LoginForm.get('Password')
    );
  }

  emailValidator(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
  }

  passwordValidator(value: string): boolean {
    const minLength = 6; // Change the minimum length as needed
    return typeof value === 'string' && value.length >= minLength;
  }

  
  submitForm() :void{
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    console.log(this.LoginForm.value);
    // Call your authentication service method here
    this.authService.login(this.LoginForm.value.Email,this.LoginForm.value.Password).subscribe()
  }
}
