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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manager-register',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    ReactiveFormsModule,
    NgIf,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manager-register.component.html',
  styleUrl: './manager-register.component.css',
})
export class ManagerRegisterComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registrationForm = this.formBuilder.group({
      ManagerName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  isEmailEmpty(): boolean {
    return (
      this.registrationForm?.get('Email')?.value.trim() === '' ||
      !this.registrationForm.get('Email')
    );
  }
  isNameEmpty(): boolean {
    return (
      this.registrationForm?.get('ManagerName')?.value.trim() === '' ||
      !this.registrationForm.get('ManagerName')
    );
  }

  isPasswordEmpty(): boolean {
    return (
      this.registrationForm?.get('Password')?.value.trim() === '' ||
      !this.registrationForm.get('Password')
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

  submitRegistrationForm() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.value);
    // Create a Manager object
    const manager: Manager = {
      ManagerID: 0, // You can set it to any default value or handle it accordingly
      ManagerName: this.registrationForm.get('ManagerName')?.value,
      Email: this.registrationForm.get('Email')?.value,
      Password: this.registrationForm.get('Password')?.value, // Add a default value to avoid null or undefined
    };

    this.authService.register(this.registrationForm.value).subscribe((msg)=>console.log(msg));
  }
}
