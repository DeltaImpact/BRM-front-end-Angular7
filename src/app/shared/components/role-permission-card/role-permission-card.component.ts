import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UserService } from "../../../services/user.service";
import { Role, User, Permission } from "../../../models";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-role-permission-card",
  templateUrl: "./role-permission-card.component.html",
  styleUrls: ["./role-permission-card.component.scss"]
})
export class RoleAndPermissionCardComponent implements OnInit {
  @Input() item: Role;
  @Input() typeOfItem: String;
  @Output() addFunction = new EventEmitter();
  @Output() deleteFunction = new EventEmitter();
  @Output() updateFunction = new EventEmitter();
  isEditMode: boolean = false;
  editItemForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editItemForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {}

  addToUser() {
    this.addFunction.emit({ typeOfItem: this.typeOfItem, item: this.item });
  }

  deleteItem() {
    this.deleteFunction.emit({ typeOfItem: this.typeOfItem, item: this.item });
  }

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  changeItem(item: Role) {
    this.item.name = item.name;
    this.updateFunction.emit({ typeOfItem: this.typeOfItem, item: this.item });
  }
}
