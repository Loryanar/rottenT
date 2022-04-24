import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  goToMenu() {
    this.router.navigate(['menu']);
  }

  username: string;
  password: string;
  error: string;
  loading = false;

  async register() {
    this.loading = true;
    const registered = await this.auth.register({
      username: this.username,
      password: this.password,
    });
    if (registered) {
      this.goToMenu();
    } else {
      this.error = 'User already exists';
    }
    this.loading = false;
  }

  ngOnInit() {
    this.cd.detectChanges();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
