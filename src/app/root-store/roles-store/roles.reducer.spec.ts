import { Role, Permission } from "../../models";
import * as Actions from "./roles.actions";
import { ActionTypes } from "./roles.actions";
import { roleReducer } from "./roles.reducer";
import { initialState } from "./roles.state";

describe("Role reducer", () => {
  const tomato: Role = {
    id: 1,
    name: "tomato"
  };

  const potato: Role = {
    id: 2,
    name: "potato"
  };

  describe("[Roles] Load roles request", () => {
    it("should toggle loading roles state", () => {
      const action = new Actions.LoadRolesRequest();
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loadingRoles: true,
        errorLoadRoles: null
      });
    });
  });

  describe("[Roles] Load roles success", () => {
    it("should add all roles to state", () => {
      const action = new Actions.LoadRolesSuccess([tomato, potato]);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        roles: [tomato, potato],
        loadingRoles: false
      });
    });
  });

  describe("[Roles] Load roles failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.LoadRolesFailure(error);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorLoadRoles: error,
        loadingRoles: false
      });
    });
  });

  describe("[Roles] Add role request", () => {
    it("should clean add role error state", () => {
      const action = new Actions.AddRoleRequest(tomato.name);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddRole: null
      });
    });
  });

  describe("[Roles] Add role success", () => {
    it("should add a role to state", () => {
      const action = new Actions.AddRoleSuccess(tomato);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        roles: [...initialState.roles, tomato]
      });
    });
  });

  describe("[Roles] Add role failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.AddRoleFailure(error);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddRole: error
      });
    });
  });

  describe("[Roles] Delete role request", () => {
    it("should clean remove role error state", () => {
      const action = new Actions.RemoveRoleRequest(1);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemoveRole: null
      });
    });
  });

  describe("[Roles] Delete role success", () => {
    it("should remove role from state", () => {
      const originalRoles = [tomato, potato];
      const originalState = {
        ...initialState,
        roles: originalRoles
      };
      const updatedRoles = [potato];

      const action = new Actions.RemoveRoleSuccess(tomato);
      const result = roleReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        roles: updatedRoles
      });
    });
  });

  describe("[Roles] Delete role failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.RemoveRoleFailure(error);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemoveRole: error
      });
    });
  });

  describe("[Roles] Update role request", () => {
    it("should clean update role error state", () => {
      const action = new Actions.UpdateRoleRequest(tomato);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdateRole: null
      });
    });
  });

  describe("[Roles] Update role success", () => {
    it("should update role to state", () => {
      const originalState = {
        ...initialState,
        roles: [tomato, potato]
      };
      const updatedTomato = <Role>{
        id: tomato.id,
        name: "DarthTomato"
      };

      const action = new Actions.UpdateRoleSuccess(updatedTomato);
      const result = roleReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        roles: [updatedTomato, potato]
      });
    });
  });

  describe("[Roles] Update role failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.UpdateRoleFailure(error);
      const result = roleReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdateRole: error
      });
    });
  });
});
