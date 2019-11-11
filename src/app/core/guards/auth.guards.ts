import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { HeaderService } from 'src/app/services/header.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public HeaderService: HeaderService, public router: Router) { }

    canActivate(): boolean {
        if(!this.HeaderService.getLocal('token')) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}