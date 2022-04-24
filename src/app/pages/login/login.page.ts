import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  ngOnInit() {}

  username: string;
  password: string;

  error: string;

  async login() {
    this.loading = true;
    const canLogin = await this.auth.login({
      username: this.username,
      password: this.password,
    });
    if (canLogin) {
      this.goToMenu();
    } else {
      this.error = 'Incorrect user or password';
    }
    this.loading = false;
  }
}
