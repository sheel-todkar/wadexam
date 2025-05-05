import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register</h2>
    <input [(ngModel)]="name" placeholder="Name" />
    <input [(ngModel)]="email" placeholder="Email" />
    <input [(ngModel)]="password" type="password" placeholder="Password" />
    <button (click)="register()">Register</button>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });
    alert('Registered successfully!');
    this.router.navigate(['/login']);
  }
}
