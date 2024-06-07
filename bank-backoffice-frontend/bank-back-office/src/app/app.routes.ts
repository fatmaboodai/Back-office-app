import { Routes } from '@angular/router';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';

const routes: Routes = [
    { path: 'login', component: ManagerLoginComponent },
    { path: 'register', component: ManagerRegisterComponent },
    // list of customers by manager id 
    // { path: 'customers/:id', component: CustomerListComponent },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/add', component: CustomerFormComponent },
    { path: 'customers/edit/:id', component: CustomerFormComponent },
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '' },

  ];


  export { routes };

