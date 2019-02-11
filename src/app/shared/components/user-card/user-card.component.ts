import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { Role, User } from "../../../models";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isChosen: Boolean;
  @Output() chooseFunction = new EventEmitter();
  @Output() removeFunction = new EventEmitter();
  @Output() deleteFunction = new EventEmitter();
  @Output() updateFunction = new EventEmitter();
  isEditMode: boolean = false;
  editItemForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editItemForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {}

  // ngOnChanges(changes: SimpleChanges) {
  //   debugger
  //   // changes.prop contains the old and the new value...
  // }

  RemoveFromUser(role: Role, user: User, typeOfItem: string) {
    this.removeFunction.emit({
      role: role,
      user: user,
      typeOfItem: typeOfItem
    });
  }

  chooseUser() {
    this.chooseFunction.emit(this.user);
  }

  deleteItem() {
    this.deleteFunction.emit(this.user);
  }

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  changeItem(name: User) {
    // this.user.userName = name.name;
    this.user.name = name.name; 
    this.updateFunction.emit(this.user);
  }
}
