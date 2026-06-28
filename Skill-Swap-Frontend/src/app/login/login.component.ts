import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private backend: BackendService) {}

  login() {
    const payload = { correo: this.email, password: this.password };
    this.backend.login(payload).subscribe({
      next: (res: any) => alert(res.mensaje || 'Inicio de sesión correcto'),
      error: () => alert('No se pudo conectar con el backend')
    });
  }
}
