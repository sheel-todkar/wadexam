import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <h2>User Profile</h2>
    <p *ngIf="user">Welcome, {{ user.name }}</p>
    <p>Email: {{ user?.email }}</p>
  `
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getUserData();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }
}
