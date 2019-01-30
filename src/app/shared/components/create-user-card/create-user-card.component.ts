import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { User } from "../../../modules/services/shared/user.model";
import { Role } from "../../../modules/services/shared/role.model";
import { UserService } from "../../../modules/services/shared/user.service";
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
  user: User = null;

  @Input() isChosen: Boolean;
  @Input() addItemToCreateNewUserForm: any;
  @Output() chooseFunction = new EventEmitter();
  @Output() createFunction = new EventEmitter();
  isEditMode: boolean = false;
  newUserForm: FormGroup;
  @ViewChild("userForm") userForm;
  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService
  ) {
    this.newUserForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.user = this.UserService.newUser;
    this.UserService.newUserChanged.subscribe(data => {
      this.user = data;
    });

    this.newUserForm.valueChanges.subscribe(changes => {
      if (changes.name) {
        this.UserService.changeNicknameOfNewUser(changes.name);
      }
    });
  }

  RemoveFromUser(role: Role, user: User, typeOfItem: string) {
    if (typeOfItem == "role") {
      this.user = this.UserService.deleteRoleFromUserObject(user, role);
    }
    if (typeOfItem == "permission") {
      this.user = this.UserService.deletePermissionFromUserObject(user, role);
    }
  }

  createNewUser(newUser: any) {
    if (this.newUserForm.valid) {
      let obj = newUser as User;
      this.UserService.changeNicknameOfNewUser(obj.name);
      this.createFunction.emit(obj.name);
      this.userForm.resetForm();
    }
  }

  chooseUser() {
    this.chooseFunction.emit(-1);
  }
}
