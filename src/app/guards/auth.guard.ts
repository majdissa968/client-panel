import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if(!auth){
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });

  }
}
