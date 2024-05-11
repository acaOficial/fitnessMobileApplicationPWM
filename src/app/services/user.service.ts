import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore,) { }

  async insertUser(id: string, name: string, email: string, imageUrl: string): Promise<void> {
    try {
      // Crear un objeto de usuario 
      const user = { id, name, email, imageUrl};

      // Insertar el usuario en la colección "usuariosIonic"
      const docRef = await this.firestore.collection('usuariosIonic').add(user);

    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw error;
    }
  }

  getUser( id: string): Observable<any[]> {
    const user = this.firestore.collection('usuariosIonic', ref => ref.where('id', '==', id)).valueChanges();
    return user;

  }

}
