import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../interfaces/users';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ 
    DatePipe
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  @Input() customer!: Customer;
  @Output() deleteClicked: EventEmitter<Customer> = new EventEmitter();
  @Output() updateClicked: EventEmitter<Customer> = new EventEmitter();

  onDeleteClick() {
    this.deleteClicked.emit(this.customer);
  }

  onUpdateClick() {
    this.updateClicked.emit(this.customer);
  }
}
