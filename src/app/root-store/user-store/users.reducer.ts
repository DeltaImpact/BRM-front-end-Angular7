import { Action } from "@ngrx/store";
import * as usersAction from "./users.actions";
import { ActionTypes } from "./users.actions";

import { User } from "../../models";

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
    case ActionTypes.SELECT_PERMISSION: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_REQUEST: {
      return {
        ...state,
        loadingUsers: true,
        errorLoadUsers: null
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_SUCCESS: {
      const receivedUsers: User[] = action.payload;

      return {
        ...state,
        users: receivedUsers,
        loadingUsers: false
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        loadingUsers: false,
        errorLoadUsers: error
      };
    }
    case ActionTypes.ADD_PERMISSION_REQUEST: {
      // const newUser: User = action.payload;
      return {
        ...state,
        errorAddUser: null
      };
    }
    case ActionTypes.ADD_PERMISSION_SUCCESS: {
      const newUser: User = action.payload;
      return {
        ...state,
        users: [...state.users, newUser]
      };
    }
    case ActionTypes.ADD_PERMISSION_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorAddUser: error
      };
    }

    case ActionTypes.REMOVE_PERMISSION_REQUEST: {
      const newUser: number = action.payload;
      return {
        ...state,
        errorRemoveUser: null
      };
    }
    case ActionTypes.REMOVE_PERMISSION_SUCCESS: {
      const user: User = action.payload;
      return {
        ...state,
        users: state.users.filter(curUser => {
          return curUser.id !== user.id;
        })
      };
    }

    case ActionTypes.REMOVE_PERMISSION_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemoveUser: error
      };
    }

    case ActionTypes.UPDATE_PERMISSION_REQUEST: {
      // const newUser: number = action.payload;
      return {
        ...state,
        errorRemoveUser: null
      };
    }
    case ActionTypes.UPDATE_PERMISSION_SUCCESS: {
      const receivedUser: User = action.payload;
      return {
        ...state,
        users: state.users.map(function(item) {
          if (item.id == receivedUser.id) item.name = receivedUser.name;
          return item;
        })
      };
    }

    case ActionTypes.UPDATE_PERMISSION_FAILURE: {
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

function sortBySeqId(e1: User, e2: User) {
  return e1.id - e2.id;
}
