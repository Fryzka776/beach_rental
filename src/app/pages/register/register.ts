import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  username = ''; 
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(){
    try {
      this.auth.register(this.username, this.password);
      this.router.navigate(['/login']);
    }
    catch(e:any){
      this.error = e.message || 'Błąd rejestracji';
    }
  }
}
