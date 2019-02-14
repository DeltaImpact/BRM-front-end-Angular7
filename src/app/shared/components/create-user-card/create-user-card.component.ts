import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { AppConfig } from "../../../configs/app.config";
import { Role, User, Permission } from "../../../models";
import { UserService } from "../../../services";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-create-user-card",
  templateUrl: "./create-user-card.component.html",
  styleUrls: ["./create-user-card.component.scss"]
})
export class CreateUserCardComponent implements OnInit {
  newUserForm: FormGroup;
  @ViewChild("userForm") userForm;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.user = { id: 0, name: "", roles: [], permissions: [] };

    this.newUserForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.newUserForm.valueChanges.subscribe(changes => {
      if (changes.name) {
        this.user.name = changes.name;
      }
    });
  }

  createNewUser(newUser: any) {
    if (this.newUserForm.valid) {
      let obj = newUser as User;
      debugger;

      // this.UserService.changeNicknameOfNewUser(obj.name);
      this.createFunction.emit(obj.name);
      this.userForm.resetForm();
    }
  }

  }
}
