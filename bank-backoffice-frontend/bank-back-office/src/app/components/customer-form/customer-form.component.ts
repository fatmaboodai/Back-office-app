// import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
// import { ActivatedRoute, RouterOutlet } from '@angular/router';
// import { NgFor, NgIf, CommonModule } from '@angular/common';

// import {
//   FormBuilder,
//   FormGroup,
//   NgForm,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCardModule } from '@angular/material/card';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { Customer, Manager } from '../../interfaces/users';
// import { CustomerService } from '../../services/CustomerServices/customer.service';
// @Component({
//   selector: 'app-customer-form',
//   standalone: true,
//   imports: [
//     RouterOutlet,
//     CommonModule,
//     NgFor,
//     NgIf,
//     ReactiveFormsModule,
//     MatInputModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatCardModule,
//     MatDatepickerModule,
//     MatNativeDateModule
//   ],
//   templateUrl: './customer-form.component.html',
//   styleUrls: ['./customer-form.component.css'],
// })
// export class CustomerFormComponent {
//   @ViewChild('formDirective') formDirective!: NgForm;

//   @Output() formSubmitted:EventEmitter<any> = new EventEmitter();
//   Genders: string[] = ['M', 'F'];
//   managers: Manager[] = []; // Array to store managers
//   customerNumber!: string 

//   CustomerForm: FormGroup;
//   constructor(private formbuilder: FormBuilder, 
//        private customerService: CustomerService ,// Inject CustomerService,
//        private route: ActivatedRoute

//   ) {
//     this.CustomerForm = this.formbuilder.group({
//       CustomerName: [
//         '',
//         [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
//       ],
//       DateOfBirth: ['', Validators.required],
//       Gender: ['', Validators.required],
//       ManagerID: [null, Validators.required],
//     });
//     this.fetchManagers();

//   }
//   ngOnInit(): void {
//     // Subscribe to route parameter changes
//     this.route.params.subscribe(params => {
//       // Retrieve the customerNumber parameter from the route parameters
//       this.customerNumber = params['id'];
//       console.log('Customer Number:', this.customerNumber);
//     });
//   }
//   fetchManagers() {
//     this.customerService.getManagers().subscribe(
//       (managers) => {
//         this.managers = managers;
//       },
//       (error) => {
//         console.error('Error fetching managers:', error);
//       }
//     );
//   }
//   submitForm(formData:Omit<Customer,'CustomerNumber'>):void {
//     console.log(formData)
//     if (this.CustomerForm.valid) {
//       // Call the CustomerService method to add customer
//       this.customerService
//         .AddCustomer(formData)
//         .subscribe((response) => {
//           // Emit the form data to the parent component
//           this.formSubmitted.emit(response);
//           // Reset the form after submission
//           this.CustomerForm.reset();
//           this.formDirective.resetForm();
//         });
//     }
//   }
  
 

// }


import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet ,Router} from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Customer, Manager } from '../../interfaces/users';
import { CustomerService } from '../../services/CustomerServices/customer.service';
@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  showUpdateButton: boolean = false;

  Genders: string[] = ['M', 'F'];
  managers: Manager[] = [];
  customerNumber!: string;
  customer: any = {
    CustomerNumber: 0, // Initialize with empty string
    CustomerName: '',
    DateOfBirth: '', // Initialize with current date
    Gender: '',
    ManagerID: 0, // Initialize with null
  };
  

  CustomerForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.CustomerForm = this.formbuilder.group({
      CustomerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      DateOfBirth: ['', Validators.required],
      Gender: ['', Validators.required],
      ManagerID: [null, Validators.required],
    });
    this.fetchManagers();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.customerNumber = params['id'];
      console.log('Customer Number:', this.customerNumber);
  
      if (this.customerNumber) {
        // Fetch customer detail using customerNumber
        this.showUpdateButton = true; // This line is not necessary as showUpdateButton is already initialized as false by default
        this.customerService.getCustomerById(this.customerNumber).subscribe((customer) => {
          this.customer = customer;
          console.log(typeof(this.customer))
          console.log(this.customer)
          // Patch the form with customer details
          this.CustomerForm.patchValue({
            CustomerName: this.customer['CustomerName'],
            DateOfBirth: this.customer['DateOfBirth'],
            Gender: this.customer['Gender'],
            ManagerID: this.customer['ManagerID'],
          });
        });
      }
    });
  }

  fetchManagers() {
    this.customerService.getManagers().subscribe(
      (managers) => {
        this.managers = managers;
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }
  updateCustomer(): void {
    const formData = this.CustomerForm.value;
    if (this.CustomerForm.valid) {
      this.customerService.updateCustomer(this.customerNumber, formData).subscribe((response) => {
        this.formSubmitted.emit(response);
        this.CustomerForm.reset();
        this.formDirective.resetForm();
      });
    }
    this.router.navigate(["customers"]);
  }
  
  submitForm(formData: Omit<Customer, 'CustomerNumber'>): void {
    console.log(formData);
    if (this.CustomerForm.valid) {
      // Call the CustomerService method to update customer
      this.customerService.AddCustomer(formData).subscribe((response) => {
        // Emit the form data to the parent component
        this.formSubmitted.emit(response);
        // Reset the form after submission
        this.CustomerForm.reset();
        this.formDirective.resetForm();
      });
    }
  }
}
