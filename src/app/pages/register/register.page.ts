import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  birthdate: string;
  gender: string;
  selectedFile: File;
  fileUrl: string;


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

      const credential = await this.authService.signUp(this.name, this.email, this.password, this.fileUrl, this.birthdate, this.gender);

      console.log('URL del archivo:', this.fileUrl);
      console.log('Usuario creado exitosamente:', credential);
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }

    console.log('Archivo seleccionado:', this.selectedFile ? this.selectedFile.name : 'Ninguno');
  }


  goToLoginPage() {
    this.router.navigate(['/login']);
  }


  onFileSelected(event) {
    // Manejar la selección de archivo
    this.selectedFile = event.target.files[0];

    // Convertir el archivo a una URL
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
