import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../interfaces/users';
import { DatePipe, NgFor } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ 
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    DatePipe,
    NgFor,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  @Input() customer!: Customer;
  @Output() deleteClicked: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() updateClicked: EventEmitter<Customer> = new EventEmitter<Customer>();

  onDeleteClick() {
    this.deleteClicked.emit(this.customer);
  }

  onUpdateClick() {
    this.updateClicked.emit(this.customer);
    console.log('clicked the update button inside the child customer')
  }
}
