
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';
import { NgFor,NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterOutlet, NgFor, ReactiveFormsModule,NgIf],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  Genders: string[] = ['M', 'F'];
  Managers = [
    { id: 1, name: 'Manager 1' },
    { id: 2, name: 'Manager 2' },
    { id: 3, name: 'Manager 3' }
  ];
  CustomerForm!:FormGroup
  constructor(private formbuilder : FormBuilder){
    this.CustomerForm = this.formbuilder.group({
      CustomerName:['',[Validators.required,Validators.pattern( /^[a-zA-Z\s]*$/)]],
      DateOfBirth:['',Validators.required],
      Gender:['',Validators.required],
      ManagerID:[0,Validators.required]
    })
  }
  submitForm(){
    if(this.CustomerForm.valid){
      console.log(this.CustomerForm.value)
    }
  }
}
