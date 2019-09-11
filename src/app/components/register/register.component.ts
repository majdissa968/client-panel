import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private FlashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .register(this.email, this.password)
      .then(res => {
        this.FlashMessage.show("You are now registerd and loggedin", {
          cssClass: "alert-success",
          timeout: 4000
        });
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.FlashMessage.show(err.message, {
          cssClass: "alert-success",
          timeout: 4000
        });
      });
  }
}
