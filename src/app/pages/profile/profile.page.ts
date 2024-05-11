import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string;
  userEmail: string;
  userImage: string;

  constructor(
  private userMagement: UserService,
  private authService: AuthService,
  private router: Router) { }


  ngOnInit() {
    this.getUserData();
  }

 

  async getUserData() {


    const userId = sessionStorage.getItem('uid');
    this.userMagement.getUser(userId).subscribe(users => {
      this.userEmail = users[0].email;
      this.userName = users[0].name;
      this.userImage = users[0].imagen;
    });

  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

}
