import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PermissionsEffects } from "./permissions.effects";
import { permissionReducer } from "./permissions.reducer";
import { metaReducers } from "../meta.reducers";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("permissions", permissionReducer),
    EffectsModule.forFeature([PermissionsEffects])
  ],
  providers: [PermissionsEffects]
})
export class PermissionsStoreModule {}
