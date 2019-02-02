import { async, TestBed } from "@angular/core/testing";
import { PermissionService } from "./permission.service";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { Permission } from "./permission.model";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./user.model";
import { TranslateService } from "@ngx-translate/core";

describe("PermissionService", () => {
  let permissionService: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        PermissionService
      ]
    });

    permissionService = TestBed.get(PermissionService);
  });

  it("should delete permission from array of permissions", () => {
    let permission1 = new Permission({
      id: 1,
      name: "item1"
    });
    let permission2 = new Permission({
      id: 2,
      name: "item2"
    });
    let permissions: Permission[] = new Array(permission2, permission1);
    let expectedPermissions: Permission[] = new Array(permission2);
    permissions = permissionService.deletePermissionFromArray(
      permissions,
      permission1
    );
    expect(permissions).toEqual(expectedPermissions);
  });
});
