import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.authService.isLoggedIn$.pipe(map(loggedIn => {
            if(loggedIn) {
                return true;
            } else {
                this.router.navigate(['/login'])
                return false;
            }
        }))
    }
}