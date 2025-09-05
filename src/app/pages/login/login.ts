import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit{

  username = ''; password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(){
    if (location.pathname === '/logout') {
      this.auth.logout();
      this.router.navigate(['/']);
    }
  }

  submit(){
    if(this.auth.login(this.username, this.password)){
      this.router.navigate(['/']);
    }
    else {
      this.error = 'Nieprawidłowy login lub hasło';
    }
  }
}
