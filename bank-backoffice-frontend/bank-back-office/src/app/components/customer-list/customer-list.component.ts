import { Customer } from './../../interfaces/users';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CustomerService } from '../../services/CustomerServices/customer.service';
import { CustomerComponent } from '../customer/customer.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for mat-icon
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgIf,
     CustomerComponent,
     MatSlideToggleModule,
     MatInputModule,
     MatButtonModule,
     MatFormFieldModule,
     MatCardModule,
     MatIconModule,
     DatePipe,
     NgFor,
     MatTableModule

  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  displayedColumns: string[] = ['customerNumber', 'name', 'dateOfBirth', 'gender', 'managerId', 'actions'];

  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }
  deleteCustomer(customer: Customer): void {
    const customerNumber: Pick<Customer, 'CustomerNumber'> = { CustomerNumber: customer.CustomerNumber };
    this.customerService.DeleteCustomer(customerNumber).subscribe(() => {
      // Filter out the deleted customer
      this.customers = this.customers.filter((c) => c.CustomerNumber !== customer.CustomerNumber);
    });
  }
  
  UpdateClick(Customer:Customer):void{
    alert(`hi ${Customer.CustomerName}`)
  }
}
