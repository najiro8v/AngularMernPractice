import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl("", [Validators.required, Validators.minLength(5)]),
      pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confPass: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  saveData() {
    console.log(this.form.controls);
  }
}
