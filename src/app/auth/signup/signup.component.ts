import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  private form!: FormGroup;
  isLoading: boolean = false;
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl("", [Validators.required, Validators.minLength(5)]),
      pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  saveData() {
    this.authService.createUser(
      this.form.controls.user.value,
      this.form.controls.pass.value
    );
  }
}
