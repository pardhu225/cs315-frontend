import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserStatusService } from '../services/user-status.service';

@Injectable()
export class VerifiedUsersGuard implements CanActivate {
  constructor(private uss: UserStatusService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.uss.emailVerified.subscribe(res => {
        if (res === 'true') {
          console.log('[verified-users-guard] Resolved to true');
          resolve(true);
        } else if (res === 'false') {
          console.log('[verified-users-guard] Resolved to false');
          this.router.navigate(['dashboard']);
          resolve(false);
        }
      });
    });
  }
}
