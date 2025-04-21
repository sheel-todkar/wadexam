import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
