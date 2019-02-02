import { async, TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./user.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { RoleService } from "./role.service";
import { TranslateService } from "@ngx-translate/core";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        UserService,
        RoleService
      ]
    });

    userService = TestBed.get(UserService);
  });

  it("should delete role from user", () => {
    let role1 = new Role({
      id: 1,
      name: "role1"
    });
    let role2 = new Role({
      id: 2,
      name: "role2"
    });

    let user1 = new User({
      id: 1,
      name: "role1",
      roles: new Array(role2, role1)
    });
    user1 = userService.deleteRoleFromUserObject(user1, role1);
    let user2 = new User({ id: 1, name: "role1", roles: new Array(role2) });
    expect(user1).toEqual(user2);
  });

  it("should delete role from user by id", () => {
    let role1 = new Role({
      id: 1,
      name: "role1"
    });
    let role2 = new Role({
      id: 2,
      name: "role2"
    });

    let user1 = new User({
      id: 1,
      name: "role1",
      roles: new Array(role2, role1)
    });
    user1 = userService.deleteRoleFromUserObjectById(user1, 1);
    let user1expected = new User({ id: 1, name: "role1", roles: new Array(role2) });
    expect(user1).toEqual(user1expected);
  });

  it("should delete permission from user", () => {
    let perm1 = new Permission({
      id: 1,
      name: "item1"
    });
    let perm2 = new Permission({
      id: 2,
      name: "item2"
    });

    let user1 = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm2, perm1)
    });
    let user1expected = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm2)
    });
    user1 = userService.deletePermissionFromUserObject(user1, perm1);
    expect(user1).toEqual(user1expected);
  });

  it("should delete role from array of users", () => {
    let role1 = new Role({
      id: 1,
      name: "item1"
    });
    let role2 = new Role({
      id: 2,
      name: "item2"
    });
    let role3 = new Role({
      id: 3,
      name: "item3"
    });
    let user1 = new User({
      id: 1,
      name: "role1",
      roles: new Array(role2, role1)
    });
    let user1expected = new User({
      id: 1,
      name: "role1",
      roles: new Array(role2)
    });
    let user2 = new User({
      id: 1,
      name: "role1",
      roles: new Array(role2, role3)
    });

    let resultArray = userService.deleteRoleFromArrayOfUsers(new Array(user1, user2), role1);
    expect(resultArray).toEqual(new Array(user1expected, user2));
  });

  it("should delete permission from array of users", () => {
    let perm1 = new Permission({
      id: 1,
      name: "item1"
    });
    let perm2 = new Permission({
      id: 2,
      name: "item2"
    });
    let perm3 = new Permission({
      id: 3,
      name: "item3"
    });
    let user1 = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm2, perm1)
    });
    let user1expected = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm2)
    });
    let user2 = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm2, perm3)
    });

    let resultArray = userService.deletePermissionFromArray(new Array(user1, user2), perm1);
    expect(resultArray).toEqual(new Array(user1expected, user2));
  });


  it("should add role to user", () => {
    let role1 = new Permission({
      id: 1,
      name: "role1"
    });
    let role2 = new Permission({
      id: 2,
      name: "role2"
    });

    let user1 = new User({
      id: 1,
      name: "role1",
      roles: new Array(role1)
    });
    user1 = userService.addRoleToUser(user1, role2);
    let user1expected = new User({ id: 1, name: "role1", roles: new Array(role1, role2) });
    expect(user1).toEqual(user1expected);
  });

  
  it("should add permission to user", () => {
    let perm1 = new Role({
      id: 1,
      name: "role1"
    });
    let perm2 = new Role({
      id: 2,
      name: "role2"
    });

    let user1 = new User({
      id: 1,
      name: "role1",
      permissions: new Array(perm1)
    });
    user1 = userService.addPermissionToUser(user1, perm2);
    let user1expected = new User({ id: 1, name: "role1", permissions: new Array(perm1, perm2) });
    expect(user1).toEqual(user1expected);
  });
});
