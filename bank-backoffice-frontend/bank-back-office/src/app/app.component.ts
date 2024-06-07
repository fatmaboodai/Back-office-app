import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
//  my components
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ManagerLoginComponent,
    NavigationComponent,
    ManagerRegisterComponent,
    CustomerListComponent,
    CustomerFormComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bank-back-office';
}
