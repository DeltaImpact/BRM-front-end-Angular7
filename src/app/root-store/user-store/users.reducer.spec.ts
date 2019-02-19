import { User, Role, Permission } from "../../models";
import * as Actions from "./users.actions";
import { ActionTypes } from "./users.actions";
import { userReducer } from "./users.reducer";
import { initialState } from "./users.state";

describe("User reducer", () => {
  const anakin: User = {
    id: 1,
    name: "AnakinSkywalker",
    permissions: [],
    roles: []
  };

  const kenobi: User = {
    id: 2,
    name: "GeneralKenobi",
    permissions: [],
    roles: []
  };

  describe("[Users] Load users request", () => {
    it("should toggle loading users state", () => {
      const action = new Actions.LoadUsersRequest();
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loadingUsers: true,
        errorLoadUsers: null
      });
    });
  });

  describe("[Users] Load users success", () => {
    it("should add all users to state", () => {
      const action = new Actions.LoadUsersSuccess([anakin, kenobi]);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        users: [anakin, kenobi],
        loadingUsers: false
      });
    });
  });

  describe("[Users] Load users failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.LoadUsersFailure(error);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorLoadUsers: error,
        loadingUsers: false
      });
    });
  });

  describe("[Users] Add user request", () => {
    it("should clean add user error state", () => {
      const action = new Actions.AddUserRequest(anakin);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddUser: null
      });
    });
  });

  describe("[Users] Add user success", () => {
    it("should add a user to state", () => {
      const action = new Actions.AddUserSuccess(anakin);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        users: [...initialState.users, anakin]
      });
    });
  });

  describe("[Users] Add user failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.AddUserFailure(error);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorAddUser: error
      });
    });
  });

  describe("[Users] Delete user request", () => {
    it("should clean remove user error state", () => {
      const action = new Actions.RemoveUserRequest(1);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemoveUser: null
      });
    });
  });

  describe("[Users] Delete user success", () => {
    it("should remove user from state", () => {
      const originalUsers = [anakin, kenobi];
      const originalState = {
        ...initialState,
        users: originalUsers
      };
      const updatedUsers = [kenobi];
      const updatedState = {
        ...initialState,
        users: updatedUsers
      };

      const action = new Actions.RemoveUserSuccess(1);
      const result = userReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        users: updatedUsers
      });
    });
  });

  describe("[Users] Delete user failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.RemoveUserFailure(error);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorRemoveUser: error
      });
    });
  });

  describe("[Users] Update user request", () => {
    it("should clean update user error state", () => {
      const action = new Actions.UpdateUserRequest(anakin);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdateUser: null
      });
    });
  });

  describe("[Users] Update user success", () => {
    it("should update user to state", () => {
      const originalState = {
        ...initialState,
        users: [anakin, kenobi]
      };
      const updatedAnakin = <User>{
        id: anakin.id,
        name: "DarthVader",
        permissions: anakin.permissions,
        roles: anakin.roles
      };

      const action = new Actions.UpdateUserSuccess(updatedAnakin);
      const result = userReducer(originalState, action);
      expect(result).toEqual({
        ...initialState,
        users: [updatedAnakin, kenobi]
      });
    });
  });

  describe("[Users] Update user failure", () => {
    it("should update error in state", () => {
      const error = new Error();
      const action = new Actions.UpdateUserFailure(error);
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        errorUpdateUser: error
      });
    });
  });
});
