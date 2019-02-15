import { Action } from "@ngrx/store";
import * as usersAction from "./users.actions";
import { ActionTypes } from "./users.actions";

import { User, Role, Permission } from "../../models";

import { EventEmitter, Injectable } from "@angular/core";
import { featureAdapter, initialState, UsersState } from "./users.state";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { NullTemplateVisitor } from "@angular/compiler";

export function userReducer(state = initialState, action: usersAction.Action) {
  switch (action.type) {
    case ActionTypes.SELECT_USER: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      };
    }
    case ActionTypes.LOAD_USERS_REQUEST: {
      return {
        ...state,
        loadingUsers: true,
        errorLoadUsers: null
      };
    }
    case ActionTypes.LOAD_USERS_SUCCESS: {
      const receivedUsers: User[] = action.payload;

      return {
        ...state,
        users: receivedUsers,
        loadingUsers: false
      };
    }
    case ActionTypes.LOAD_USERS_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        loadingUsers: false,
        errorLoadUsers: error
      };
    }
    case ActionTypes.ADD_USER_REQUEST: {
      return {
        ...state,
        errorAddUser: null
      };
    }
    case ActionTypes.ADD_USER_SUCCESS: {
      const newUser: User = action.payload;
      return {
        ...state,
        users: [...state.users, newUser]
      };
    }
    case ActionTypes.ADD_USER_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorAddUser: error
      };
    }

    case ActionTypes.REMOVE_USER_REQUEST: {
      const newUser: number = action.payload;
      return {
        ...state,
        errorRemoveUser: null
      };
    }
    case ActionTypes.REMOVE_USER_SUCCESS: {
      const user: number = action.payload;
      return {
        ...state,
        users: state.users.filter(curUser => {
          return curUser.id !== user;
        })
      };
    }

    case ActionTypes.REMOVE_USER_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemoveUser: error
      };
    }

    case ActionTypes.UPDATE_USER_REQUEST: {
      // const newUser: number = action.payload;
      return {
        ...state,
        errorRemoveUser: null
      };
    }
    case ActionTypes.UPDATE_USER_SUCCESS: {
      const receivedUser: User = action.payload;

      // debugger;
      return {
        ...state,
        users: state.users.map(function(item) {
          if (item.id == receivedUser.id) item = receivedUser;
          return item;
        })
      };
    }

    case ActionTypes.UPDATE_USER_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemoveUser: error
      };
    }

    default:
      return state;
  }
}
