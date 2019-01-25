import { async, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestsModule } from "../../modules/tests.module";
import { HomePageComponent } from "./home-page.component";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";

describe("HomePage", () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestsModule, TranslateModule.forRoot()],
      declarations: [HomePageComponent],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should create hero top component", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
