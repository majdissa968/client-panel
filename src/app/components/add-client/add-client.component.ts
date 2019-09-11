import { ClientService } from "./../../services/client.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Client } from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnAdd: boolean;
  @ViewChild("clientForm", { static: true }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
    ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }




  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // show Error
      this.flashMessage.show("Please fill out the Form Currectly", {
        cssClass: "alert-danger",
        timeot: 4000
      });
    } else {
      //Add New Client
      this.clientService.newClient(value);

      // Show message
      this.flashMessage.show("New Client Added", {
        cssClass: "alert-success",
        timeout: 4000
      });

      // Redirect to Dash
      this.router.navigate(['/']);
    }
  }
}
