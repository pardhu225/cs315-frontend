import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserStatusService } from '../services/user-status.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private uss: UserStatusService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.uss.loggedIn.subscribe(res => {
        if (res === 'true') {
          console.log('[auth-guard] Resolved to true');
          resolve(true);
        } else if (res === 'false') {
          console.log('[auth-guard] Resolved to false');
          this.router.navigate(['login']);
          reject(false);
        }
      });
    });
  }
}
