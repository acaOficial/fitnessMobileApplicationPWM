import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  userName: string;
  userEmail: string;
  imageUrl: string;
  birthdate: string;
  gender: string;
  profileImage: File;
  selectedFile: File;

  constructor(
    private userMagement: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const userId = sessionStorage.getItem('uid');
    this.userMagement.getUser(userId).subscribe(users => {
      this.userName = users[0].name;
      this.imageUrl = users[0].imageUrl;
      this.gender = users[0].gender;
    });
  }

  guardarCambios() {
    this.userMagement.updateUser(sessionStorage.getItem('uid'), this.userName, this.imageUrl, this.gender);
    this.router.navigate(['/profile']);
  }


  onFileSelected(event: any) {
    // Manejar la selección de archivo
    this.selectedFile = event.target.files[0];

    // Convertir el archivo a una URL
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
