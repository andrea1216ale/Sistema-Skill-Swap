import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  correo = '';
  password = '';
  edad: number | null = null;
  nivel = '';

  constructor(private backend: BackendService) {}

  submit() {
    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      edad: this.edad,
      nivel: this.nivel
    };

    this.backend.register(usuario).subscribe((res: any) => {
      alert(res.mensaje || 'Registro completado');
      this.nombre = this.correo = this.password = '';
      this.edad = null;
      this.nivel = '';
    });
  }
}
