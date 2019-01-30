import { async, TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { Role } from "./role.model";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./user.model";

describe("UserService", () => {
  let UserService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        UserService
      ]
    });

    UserService = TestBed.get(UserService);
  });

  // it("should delete role from user", () => {
  //   let role1 = new Role({
  //     id: 1,
  //     name: "role1"
  //   });
  //   let role2 = new Role({
  //     id: 2,
  //     name: "role2"
  //   });

  //   let user1 = new User({ id: 1, name: "role1", roles: new Array(role2, role1)});
  //   user1 = UserService.deleteRoleFromUserObject(user1, role1);
  //   let user2 = new User({ id: 1, name: "role1", roles: new Array(role2)});
  //   debugger
  //   expect(user1).toBe(user2);
  // });
});
