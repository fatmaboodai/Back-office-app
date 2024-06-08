import { Routes } from '@angular/router';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: ManagerLoginComponent },
    { path: 'register', component: ManagerRegisterComponent },
    // list of customers by manager id 
    // { path: 'customers/:id', component: CustomerListComponent },
    { path: 'customers', component: CustomerListComponent, canActivate:[AuthGuard] },
    { path: 'customers/add', component: FormPageComponent ,canActivate:[AuthGuard]},
    { path: 'customers/:id', component: FormPageComponent,canActivate:[AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '' },

  ];


  export { routes };

