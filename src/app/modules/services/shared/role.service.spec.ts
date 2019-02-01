import { async, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./user.model";
import { TranslateService } from "@ngx-translate/core";
import { Role } from "./role.model";
import { RoleService } from "./role.service";

describe("RoleService", () => {
  let roleService: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        RoleService
      ]
    });

    roleService = TestBed.get(RoleService);
  });

  it("should delete role from array of roles", () => {
    let role1 = new Role({
      id: 1,
      name: "item1"
    });
    let role2 = new Role({
      id: 2,
      name: "item2"
    });
    let roles: Role[] = new Array(role2, role1);
    let expectedRoles: Role[] = new Array(role2);
    roles = roleService.deleteRoleFromArrayOfRoles(
      roles,
      role1
    );
    expect(roles).toEqual(expectedRoles);
  });
});
