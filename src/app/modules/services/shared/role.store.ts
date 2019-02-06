import { Injectable } from "@angular/core";
import { Observable, of, empty } from "rxjs";
import { take, finalize, catchError, map, tap } from "rxjs/operators";
import { Store } from "rxjs-observable-store";
import { RoleState } from "./role.state";
import { Role } from "./role.model";
import { RoleService } from "./role.service";

@Injectable({
  providedIn: "root"
})
export class RoleStore extends Store<RoleState> {
  public roles: Role[];
  public rolesLoading: boolean;

  constructor(private roleService: RoleService) {
    super(new RoleState());
  }

  loadRoles() {
    this.state.rolesLoading = true;
    return this.roleService
      .getRoles()
      .pipe(
        tap(receivedRoles => {
          this.setState({
            ...this.state,
            roles: receivedRoles
          });
        }),
        finalize(() => {
          this.state.rolesLoading = false;
        })
      )
      .subscribe();
  }

  addRole(item: Role) {
    this.state.rolesLoading = true;
    return this.addRoleImp(item);
  }

  addRoleImp(item: Role) {
    this.state.rolesLoading = true;
    return this.roleService.addRole(item).pipe(
      tap(receivedRole => {
        this.setState({
          ...this.state,
          roles: [...this.state.roles, receivedRole]
        });
      }),
      finalize(() => {
        this.state.rolesLoading = false;
      })
    );
  }

  deleteRole(item: number) {
    this.state.rolesLoading = true;
    return this.roleService.deleteRole(item).pipe(
      tap(receivedRole => {
        let role = receivedRole as Role;
        this.setState({
          ...this.state,
          roles: this.state.roles.filter(curRole => {
            return curRole.id !== role.id;
          })
        });
      }),
      finalize(() => {
        this.state.rolesLoading = false;
      })
    );
  }

  updateRole(item: Role) {
    this.state.rolesLoading = true;
    return this.roleService.updateRole(item).pipe(
      tap(receivedRole => {
        this.setState({
          ...this.state,
          roles: this.state.roles.map(function(item) {
            if (item.id == receivedRole.id) item.name = receivedRole.name;
            return item;
          })
        });
      }),
      finalize(() => {
        this.state.rolesLoading = false;
      })
    );
  }

  // addRoleToUser(userId: number, roleId: number) {
  //   this.state.rolesLoading = true;
  //   return this.roleService.addRoleToUser(userId, roleId).pipe(
  //     tap(receivedRole => {
  //       // this.users = this.users.map(function(user) {
  //       //   if (user.id == userId) {
  //       //     this.UserService.addRoleFromUserObject(user, role);
  //       //   } else return user;
  //       // });
  //       this.setState({
  //         ...this.state,
  //         roles: this.state.roles.map(function(item) {
  //           if (item.id == receivedRole.id) item.name = receivedRole.name;
  //           return item;
  //         })
  //       });
  //     }),
  //     finalize(() => {
  //       this.state.rolesLoading = false;
  //     })
  //   );
  // }
}
