import {
  async,
  fakeAsync,
  TestBed,
  tick,
  ComponentFixture
} from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestsModule } from "../../modules/tests.module";
import { HomePageComponent } from "./home-page.component";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { Observable, Subject } from "rxjs";
import {
  RootStoreState,
  RolesActions,
  RolesSelectors,
  PermissionsActions,
  PermissionsSelectors,
  UsersActions,
  UsersSelectors
} from "../../../root-store";
import { Store, StoreModule, combineReducers } from "@ngrx/store";
import { permissionReducer } from "../../../root-store/permission-store/permissions.reducer";
import { roleReducer } from "../../../root-store/roles-store/roles.reducer";
import { userReducer } from "../../../root-store/user-store/users.reducer";
import * as usersState from "../../../root-store/user-store/users.state";
import *  as rolesState from "../../../root-store/roles-store/roles.state";
import *  as permissionsState from "../../../root-store/permission-store/permissions.state";

describe("HomePage", () => {
  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;
  let store: Store<RootStoreState.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...permissionReducer,
          roleReducer,
          userReducer,
          feature: combineReducers({
            permissionReducer,
            roleReducer,
            userReducer
          })
        }),
        TestsModule,
        TranslateModule.forRoot()
      ],
      declarations: [HomePageComponent],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        {
          provide: Store,
          useValue: {
            // dispatch: jest.fn(),
            roles: rolesState.initialState,
            permissions: permissionsState.initialState,
            users: usersState.initialState
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    // spyOn(store, "dispatch").and.callThrough();
    // fixture = TestBed.createComponent(HomePageComponent);
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // describe("ngOnInit()", () => {
  //   it("should dispatch an the LoadRolesRequest action in ngOnInit lifecycle", () => {
  //     const action1 = new RolesActions.LoadRolesRequest();
  //     const action2 = new PermissionsActions.LoadPermissionsRequest();
  //     const action3 = new UsersActions.LoadUsersRequest();
  //     expect(store.dispatch).toHaveBeenCalledWith(action1);
  //   });
  // });

  // describe("ngOnInit()", () => {
  //   it("should dispatch an the LoadPermissionsRequest action in ngOnInit lifecycle", () => {
  //     const action2 = new PermissionsActions.LoadPermissionsRequest();
  //     expect(store.dispatch).toHaveBeenCalledWith(action2);
  //   });
  // });

  // describe("ngOnInit()", () => {
  //   it("should dispatch an the LoadUsersRequest action in ngOnInit lifecycle", () => {
  //     const action3 = new UsersActions.LoadUsersRequest();
  //     expect(store.dispatch).toHaveBeenCalledWith(action3);
  //   });
  // });
});
