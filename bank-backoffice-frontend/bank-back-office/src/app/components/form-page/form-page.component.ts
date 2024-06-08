import { Component } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../../services/CustomerServices/customer.service';
import { AuthService } from '../../services/Authservices/auth.service';
import { Manager } from '../../interfaces/users';
import { Customer } from '../../interfaces/users';
import { Observable, async } from 'rxjs';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [CustomerFormComponent,MatCard,NgFor
  ],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.css',
})
export class FormPageComponent {
 
  onFormSubmitted(): void {
console.log("recivied")
  }

}
