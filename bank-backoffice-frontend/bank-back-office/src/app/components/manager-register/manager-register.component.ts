import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Authservices/auth.service';
import { Manager } from '../../interfaces/users';

@Component({
  selector: 'app-manager-register',
  standalone: true,
  imports: [RouterOutlet, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './manager-register.component.html',
  styleUrl: './manager-register.component.css'
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

  managerNameValidator(control: any): { [key: string]: boolean } | null {
    const nameRegex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
    if (control.value && !nameRegex.test(control.value)) {
      return { 'invalidManagerName': true };
    }
    return null;
  }

  isEmailEmpty(): boolean {
    return this.registrationForm?.get('Email')?.value.trim() === '' || !this.registrationForm.get('Email');
  }
  isNameEmpty(): boolean {
    return this.registrationForm?.get('ManagerName')?.value.trim() === '' || !this.registrationForm.get('ManagerName');
  }

  isPasswordEmpty(): boolean {
    return this.registrationForm?.get('Password')?.value.trim() === '' || !this.registrationForm.get('Password');
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
      password: this.registrationForm.get('Password')?.value // Add a default value to avoid null or undefined
    };

  }
  
}

