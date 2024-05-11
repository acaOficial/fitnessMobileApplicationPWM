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

  async insertUser(id: string, name: string, email: string, imageUrl: string, birthdate: string, gender: string): Promise<void> {
    try {
      // Crear un objeto de usuario 
      const user = { id, name, email, imageUrl, birthdate, gender};

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

  
  updateUser(userId: string, name: string, imageUrl: string, gender: string): Promise<void> {
    const user = { name, imageUrl, gender };
    
    // Realizar una consulta para encontrar el documento que contiene el usuario con la ID especificada
    return this.firestore.collection('usuariosIonic', ref => ref.where('id', '==', userId))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot.size === 1) {
          // Obtener el ID del documento que contiene el usuario
          const docId = querySnapshot.docs[0].id;
          
          // Actualizar los campos del usuario dentro del documento
          return this.firestore.collection('usuariosIonic').doc(docId).update(user);
        } else {
          throw new Error('No se encontró un usuario con la ID especificada.');
        }
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
        throw error;
      });
  }
  
}
