import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected title = 'beach-rental';
  constructor(private router: Router) {}
  ngOnInit(){
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        localStorage.setItem('br_last_url', e.urlAfterRedirects);
      }
    });
    const last = localStorage.getItem('br_last_url');
    if (last && location.pathname === '/') {
      this.router.navigateByUrl(last);
    }
  }

}
