import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs/observable";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private FlashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    });
  }

  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.FlashMessage.show("You Are Logedin", {
          cssClass: "alert-success",
          timeout: 4000
        });

        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.FlashMessage.show(err.message, {
          cssClass: "alert-danger",
          timeout: 4000
        });
      });
  }
}