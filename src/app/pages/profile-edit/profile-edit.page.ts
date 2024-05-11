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

  constructor(
    private userMagement: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const userId = sessionStorage.getItem('uid');
    this.userMagement.getUser(userId).subscribe(users => {
      this.userEmail = users[0].email;
      this.userName = users[0].name;
      this.imageUrl = users[0].imageUrl;
      this.birthdate = users[0].birthdate;
      this.gender = users[0].gender;
    });
  }

  guardarCambios() {
    this.router.navigate(['/profile']);
  }


  onFileSelected(event: any) {
    // Manejar la selección de archivo
    const file: File = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

}
