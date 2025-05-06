import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <label>Email:</label>
      <input type="email" [(ngModel)]="email" name="email" required /><br />

      <label>Password:</label>
      <input type="password" [(ngModel)]="password" name="password" required /><br />

      <button type="submit">Login</button>
    </form>
    <p *ngIf="loginError" style="color:red;">{{ loginError }}</p>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.auth.login(this.email, this.password)) {
      this.loginError = '';
      this.router.navigate(['/profile']);
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
