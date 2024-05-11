import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  //selectedFile: File;

  constructor(
  private authService: AuthService,
  private router: Router
  ) { }

  ngOnInit() {
  }

  async register() {
    try {

      if (this.password !== this.repeatPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }

      const credential = await this.authService.signUp(this.name, this.email, this.password);
      console.log('Usuario creado exitosamente:', credential);
      this.router.navigate(['/animals']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }

    //console.log('Archivo seleccionado:', this.selectedFile ? this.selectedFile.name : 'Ninguno');
  }


  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  /*onFileSelected(event) {
    // Manejar la selección de archivo
    this.selectedFile = event.target.files[0];
  }
*/
}
