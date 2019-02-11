import { Action } from "@ngrx/store";
import * as roleAction from "./roles.actions";
import { ActionTypes } from "./roles.actions";

import { Role } from "../../models";

import { EventEmitter, Injectable } from "@angular/core";
import { featureAdapter, initialState, RolesState } from "./roles.state";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { NullTemplateVisitor } from "@angular/compiler";

export function roleReducer(state = initialState, action: roleAction.Action) {
  switch (action.type) {
    case ActionTypes.SELECT_ROLE: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      };
    }
    case ActionTypes.LOAD_ROLES_REQUEST: {
      return {
        ...state,
        loadingRoles: true,
        errorLoadRoles: null
      };
    }
    case ActionTypes.LOAD_ROLES_SUCCESS: {
      const receivedRoles: Role[] = action.payload;

      return {
        ...state,
        roles: receivedRoles,
        loadingRoles: false
      };
    }
    case ActionTypes.LOAD_ROLES_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        loadingRoles: false,
        errorLoadRoles: error
      };
    }
    case ActionTypes.ADD_ROLE_REQUEST: {
      const newRole: string = action.payload;
      return {
        ...state,
        errorAddRole: null
      };
    }
    case ActionTypes.ADD_ROLE_SUCCESS: {
      const newRole: Role = action.payload;
      return {
        ...state,
        roles: [...state.roles, newRole]
      };
    }
    case ActionTypes.ADD_ROLE_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorAddRole: error
      };
    }

    case ActionTypes.REMOVE_ROLE_REQUEST: {
      const newRole: number = action.payload;
      return {
        ...state,
        errorRemoveRole: null
      };
    }
    case ActionTypes.REMOVE_ROLE_SUCCESS: {
      const role: Role = action.payload;
      return {
        ...state,
        roles: state.roles.filter(curRole => {
          return curRole.id !== role.id;
        })
      };
    }

    case ActionTypes.REMOVE_ROLE_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemoveRole: error
      };
    }

    case ActionTypes.UPDATE_ROLE_REQUEST: {
      // const newRole: number = action.payload;
      return {
        ...state,
        errorRemoveRole: null
      };
    }
    case ActionTypes.UPDATE_ROLE_SUCCESS: {
      const receivedRole: Role = action.payload;
      return {
        ...state,
        roles: state.roles.map(function(item) {
          if (item.id == receivedRole.id) item.name = receivedRole.name;
          return item;
        })
      };
    }

    case ActionTypes.UPDATE_ROLE_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemoveRole: error
      };
    }

    default:
      return state;
  }
}

function sortBySeqId(e1: Role, e2: Role) {
  return e1.id - e2.id;
}
