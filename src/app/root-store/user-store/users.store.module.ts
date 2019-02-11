import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UsersEffects } from "./users.effects";
import { userReducer } from "./users.reducer";
import { metaReducers } from "../meta.reducers";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("users", userReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UsersEffects]
})
export class UsersStoreModule {}
