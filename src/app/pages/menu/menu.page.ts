import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedIndex: number = 0;
  username;

  pages = [
    // index 0
    {
      title: 'Movies',
      url: '/menu/main',
      icon: 'videocam',
    },
    {
      title: 'Favorites',
      url: '/menu/user-top',
      icon: 'star',
    },
  ];

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private route: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  changeSelectedIndex(i) {
    this.selectedIndex = i;
  }

  profile() {
    this.route.navigate(['menu/profile-user/' + this.username]);
  }

  //logout function

  async logout() {
    this.auth.logout();
    this.navCtrl.navigateRoot('login');
  }
}
