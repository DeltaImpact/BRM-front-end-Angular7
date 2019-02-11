import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RolesStoreModule } from "./roles-store/roles.store.module";
import { PermissionsStoreModule } from "./permission-store/permissions.store.module";
import { UsersStoreModule } from "./user-store/users.store.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  imports: [
    CommonModule,
    RolesStoreModule,
    PermissionsStoreModule,
    UsersStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 
    })
    // StoreModule.forRoot({}, { metaReducers }),
    // EffectsModule.forRoot([])
  ],
  declarations: []
})
export class RootStoreModule {}
