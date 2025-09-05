import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment';
import { RentComponent } from './pages/rent/rent';
import { RentConfirmComponent } from './pages/rent-confirm/rent-confirm';
import { ReturnComponent } from './pages/return/return';
import { ContactComponent } from './pages/contact/contact';
import { AuthGuard } from './core/guards/auth-guard';
import { AdminGuard } from './core/guards/admin-guard';
import { HasRentalGuard } from './core/guards/has-rental-guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'add-equipment', component: AddEquipmentComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'rent', component: RentComponent, canActivate: [AuthGuard] },
    { path: 'rent_confirm', component: RentConfirmComponent, canActivate: [AuthGuard] },
    { path: 'return', component: ReturnComponent, canActivate: [AuthGuard, HasRentalGuard] },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule {}