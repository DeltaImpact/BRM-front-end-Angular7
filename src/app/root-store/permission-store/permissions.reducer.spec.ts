import { Permission } from "../../models";
import * as Actions from "./permissions.actions";
import { ActionTypes } from "./permissions.actions";
import { permissionReducer } from "./permissions.reducer";
import { initialState } from "./permissions.state";

describe("Permission reducer", () => {
  const tomato: Permission = {
    id: 1,
    name: "tomato"
  };

  const potato: Permission = {
    id: 2,
    name: "potato"
  };

  describe("[Permissions] Load permissions request", () => {
    it("should toggle loading permissions state", () => {
      const action = new Actions.LoadPermissionsRequest();
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loadingPermissions: true,
        errorLoadPermissions: null
      });
    });
  });

  describe("[Permissions] Load permissions success", () => {
    it("should add all permissions to state", () => {
      const action = new Actions.LoadPermissionsSuccess([tomato, potato]);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        permissions: [tomato, potato],
        loadingPermissions: false
      });
    });
  });

  describe("[Permissions] Load permissions failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.LoadPermissionsFailure(error);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorLoadPermissions: error,
        loadingPermissions: false
      });
    });
  });

  describe("[Permissions] Add permission request", () => {
    it("should clean add permission error state", () => {
      const action = new Actions.AddPermissionRequest(tomato.name);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddPermission: null
      });
    });
  });

  describe("[Permissions] Add permission success", () => {
    it("should add a permission to state", () => {
      const action = new Actions.AddPermissionSuccess(tomato);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        permissions: [...initialState.permissions, tomato]
      });
    });
  });

  describe("[Permissions] Add permission failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.AddPermissionFailure(error);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddPermission: error
      });
    });
  });

  describe("[Permissions] Delete permission request", () => {
    it("should clean remove permission error state", () => {
      const action = new Actions.RemovePermissionRequest(1);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemovePermission: null
      });
    });
  });

  describe("[Permissions] Delete permission success", () => {
    it("should remove permission from state", () => {
      const originalPermissions = [tomato, potato];
      const originalState = {
        ...initialState,
        permissions: originalPermissions
      };
      const updatedPermissions = [potato];

      const action = new Actions.RemovePermissionSuccess(tomato);
      const result = permissionReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        permissions: updatedPermissions
      });
    });
  });

  describe("[Permissions] Delete permission failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.RemovePermissionFailure(error);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemovePermission: error
      });
    });
  });

  describe("[Permissions] Update permission request", () => {
    it("should clean update permission error state", () => {
      const action = new Actions.UpdatePermissionRequest(tomato);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdatePermission: null
      });
    });
  });

  describe("[Permissions] Update permission success", () => {
    it("should update permission to state", () => {
      const originalState = {
        ...initialState,
        permissions: [tomato, potato]
      };
      const updatedTomato = <Permission>{
        id: tomato.id,
        name: "DarthTomato"
      };

      const action = new Actions.UpdatePermissionSuccess(updatedTomato);
      const result = permissionReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        permissions: [updatedTomato, potato]
      });
    });
  });

  describe("[Permissions] Update permission failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.UpdatePermissionFailure(error);
      const result = permissionReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdatePermission: error
      });
    });
  });
});
