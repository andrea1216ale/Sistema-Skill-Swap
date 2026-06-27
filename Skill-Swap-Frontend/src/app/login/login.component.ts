import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  login() {
    // Implement login call to backend if needed
    alert('Login intent: ' + this.email);
  }
}
