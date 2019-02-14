import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UserCardComponent } from "./user-card.component";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";

describe("UserCardComponent", () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      declarations: [UserCardComponent],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

});
