import { async, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../shared/modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { APP_CONFIG, AppConfig } from "../configs/app.config";
import { HttpErrorResponse } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { Role, User } from "../models";
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
});
