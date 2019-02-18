import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UserCardComponent } from "./user-card.component";
import { APP_CONFIG, AppConfig } from "../../../configs/app.config";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { TestsModule } from "../../modules/tests.module";
import { TranslateModule } from "@ngx-translate/core";
import { MergeByIdPipe } from "../../../pipes/merge-by-id.pipe";
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
import * as rolesState from "../../../root-store/roles-store/roles.state";
import * as permissionsState from "../../../root-store/permission-store/permissions.state";
import { Observable, of, throwError, empty } from "rxjs";

describe("UserCardComponent", () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
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
      declarations: [UserCardComponent, MergeByIdPipe],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: APP_BASE_HREF, useValue: "/" },
        {
          provide: Store,
          useValue: {
            select: e => {
              return of({});
            },
            roles: rolesState.initialState,
            permissions: permissionsState.initialState,
            users: usersState.initialState
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
