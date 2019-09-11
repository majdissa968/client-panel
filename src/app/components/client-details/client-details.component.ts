import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "./../../services/client.service";
import { Client } from "./../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hastBalance: boolean = false;
  shoeBalanceUpdateInput: boolean = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get Id Form Url
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hastBalance = true;
        }
      }

      this.client = client;
    });
  }

  updateBalance(){
this.clientService.updateClient(this.client);
this.flashMessage.show("Balance Updated", {
  cssClass: "alert-success", timeout: 4000
});
  }


onDeleteClick(){
  if(confirm('Are You Sure')){
    this.clientService.deleteClient(this.client);
    this.flashMessage.show("Client removed", {
      cssClass: "alert-success", timeout: 4000
    });

    this.router.navigate(['/'])
  }
}
}
