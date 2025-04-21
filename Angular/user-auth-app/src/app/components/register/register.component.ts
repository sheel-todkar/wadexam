import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(formData: any) {
    this.userService.register(formData);
    alert('Registration successful!');
    this.router.navigate(['/login']);
  }
}
