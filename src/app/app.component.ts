import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eCommerce-ng-firebase';
  constructor(private __authService: AuthService, private router: Router) {
    __authService.user$?.subscribe((auth) => {
      if (auth) {
        let returnUrl: string | null = localStorage.getItem('returnUrl');
        if (returnUrl !== null) {
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}
