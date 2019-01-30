import { async, TestBed } from "@angular/core/testing";
import { RoleService } from "./role.service";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { Role } from "./role.model";
import { HttpErrorResponse } from "@angular/common/http";

describe("RoleService", () => {
  let RoleService: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        RoleService
      ]
    });

    RoleService = TestBed.get(RoleService);
  });

//   it("should delete role from array of roles", () => {
//     let role1 = new Role({
//       id: 1,
//       name: "role1"
//     });
//     let role2 = new Role({
//       id: 2,
//       name: "role2"
//     });
//     let roles: Role[] = new Array(role2, role1);
//     let expectedArray = new Array(role2);
//     debugger
//     // let resultArray = RoleService.deleteRoleFromArray(roles, role1);
//     // debugger
//     roles = RoleService.deleteRoleFromArrayOfRoles(roles, role1);
//     expect(roles).toBe(new Array(role2));
//   });


});
