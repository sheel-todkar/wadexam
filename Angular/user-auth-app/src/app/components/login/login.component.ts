import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(form: any) {
    const success = this.userService.login(form.email, form.password);
    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMsg = 'Invalid credentials!';
    }
  }
}
