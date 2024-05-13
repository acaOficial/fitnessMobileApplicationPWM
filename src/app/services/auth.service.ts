import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from '@firebase/auth-types';
import { UserService } from './user.service';
import {Device} from "@capacitor/device";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userMagement: UserService) { }

  async signUp(name:string, email: string, password: string, imageUrl: string, birthdate: string, gender: string): Promise<UserCredential> {
    try {

      // Crear un usuario con email y contraseña
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      // Insertar el usuario en la colección "usuariosIonic"
      await this.userMagement.insertUser(credential.user.uid, name, email, imageUrl, birthdate, gender);

      // Almacenar el ID de usuario en sessionStorage
      sessionStorage.setItem('uid', credential.user.uid);

      return credential;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {

      // Iniciar sesión con email y contraseña
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);

      // Almacenar el ID de usuario en sessionStorage
      sessionStorage.setItem('uid', credential.user.uid);
      return credential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();

      sessionStorage.clear();

      const info = await Device.getInfo();
      
      if (info.platform === 'web'){
        window.location.href = window.location.href + '?nocache=' + new Date().getTime();
      }      

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
