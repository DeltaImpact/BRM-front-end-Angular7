import { createSelector, MemoizedSelector } from "@ngrx/store";
import { RolesSelectors } from "./roles-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  //     RolesSelectors.selectRolesState,
  //     RolesPermission.selectMyOtherFeatureError,
  //   (myFeatureError: string, myOtherFeatureError: string) => {
  //     return myFeature || myOtherFeature;
  //   }
  RolesSelectors.selectRolesState,
  (error: any) => error
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  //   MyFeatureStoreSelectors.selectMyFeatureIsLoading,
  //   MyOtherFeatureStoreSelectors.selectMyOtherFeatureIsLoading,
  //   (myFeature: boolean, myOtherFeature: boolean) => {
  //     return myFeature || myOtherFeature;
  //   }
  RolesSelectors.selectRolesIsLoading,
  (isLoading: boolean) => isLoading
);
