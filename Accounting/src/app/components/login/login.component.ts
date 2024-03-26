import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseDto } from './../../_interfaces/response/authResponseDto.model';
import { UserForAuthenticationDto } from './../../_interfaces/user/userForAuthenticationDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import { JwtHelperService } from '@auth0/angular-jwt';
//import { SlickCarouselComponent } from 'ngx-slick-carousel';
//import { ToastrService } from 'ngx-toastr';
//import baseUrl from '../../services/helper';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl: string | undefined;

  loginForm!: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;

  // invalidLogin?: boolean;

  // url = baseUrl + '/authentication/';
   hide=true;
  // constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  validateControl = (controlName: string) => {
    return  this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser('api/Authentication/Login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
       localStorage.setItem("token", res.token);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      console.log(err.status);
      this.errorMessage = err.message;
      console.log(this.errorMessage);
      this.showError = true;
    }})
  }
  // public login = (form: NgForm) => {
  //   const credentials = JSON.stringify(form.value);
  //   this.http.post(this.url +"Login", credentials, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json"
  //     })
  //   }).subscribe(response => {

  //     const token = (<any>response).token;
  //     localStorage.setItem("jwt", token);
  //     this.invalidLogin = false;
  //     console.log("Logged in successfully");
  //     //this.toastr.success("Logged In successfully");
  //     this.router.navigate(["/organisation"]);
  //   }, err => {
  //     this.invalidLogin = true;
  //   });
  // }

  // isUserAuthenticated() {
  //   const token = localStorage.getItem("jwt");
  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  image = [
    { img: "../assets/images/1.jpg" },
    { img: "../assets/images/2.jpg" },
    { img: "../assets/images/3.jpg" },
    { img: "../assets/images/5.jpg" },
    { img: "../assets/images/6.jpg" }


  ];

  slideConfig = {
    "slidesToShow": 1,
     "autoplay" : true,
     "autoplaySpeed" : 1000,
    "infinite": true
  };
}
