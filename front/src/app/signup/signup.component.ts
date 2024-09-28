import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MustMatchDirective } from '../_helpers/auth.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule, MustMatchDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  myForm: any = {
    name: null,
    telNumber: null,
    email: null,
    password: null,
    confirmPassword: null,
    roles: null
  };

  isSuccessful = false;
  isSignFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService){}

  onSubmit(): void {
    const { name, telNumber, email, password, confirmPassword } = this.myForm;
    let roles = ['user']
    if(this.myForm.roles && this.myForm.roles === 'admin'){
       roles.push('admin');
       roles.push('manager');
    }else if(this.myForm.roles && this.myForm.roles === 'manager'){
      roles.push('manager');
    }

    this.authService.signup(name, telNumber, email, password, roles).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignFailed = true;
      }
    });
  }

}
