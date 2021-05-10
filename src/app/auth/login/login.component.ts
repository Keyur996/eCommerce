import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  logIn = () => {
    this._authService.logIn();
    // this.router.navigate(['/shopping-cart'], { relativeTo: this.route });
  };
}
