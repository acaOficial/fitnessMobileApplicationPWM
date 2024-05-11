import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  async login() {


    try {
      const credential = await this.authService.signIn(this.email, this.password);
      console.log('Usuario iniciado exitosamente:', credential);
      this.router.navigate(['/products']);
    } catch (error) {
      // Maneja el error aquí
      console.error('Error al iniciar sesion de usuario:', error);
    }
  }


  goToRegisterPage() {
    this.router.navigate(['/register']); // Redirige al usuario a la página de inicio de sesión
  }

}
