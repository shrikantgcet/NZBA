import { AuthResponseDto } from '../_interfaces/response/authResponseDto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private authChangeSub = new Subject<boolean>()
    public authChanged = this.authChangeSub.asObservable();

constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
