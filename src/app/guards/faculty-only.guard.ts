import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserStatusService } from '../services/user-status.service';

@Injectable()
export class FacultyOnlyGuard implements CanActivate {
    constructor(private uss: UserStatusService, public router: Router) { }
    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.uss.user.subscribe(res => {
                if (res) {
                    if (res.usertype === 'faculty') {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
