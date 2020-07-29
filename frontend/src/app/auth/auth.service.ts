import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data';
import {Subject} from 'rxjs';
import {falseIfMissing} from 'protractor/built/util';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post('http://localhost:4201/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string}>('http://localhost:4201/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          this.authStatusListener.next(true);  // notify listeners that token is valid
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}
