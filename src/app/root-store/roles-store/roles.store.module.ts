import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RolesEffects } from "./roles.effects";
import { roleReducer } from "./roles.reducer";
import { metaReducers } from "../meta.reducers";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("roles", roleReducer),
    EffectsModule.forFeature([RolesEffects])
  ],
  providers: [RolesEffects]
})
export class RolesStoreModule {}
