import { Action } from "@ngrx/store";
import * as permissionsAction from "./permissions.actions";
import { ActionTypes } from "./permissions.actions";

import { Permission } from "../../models";

import { EventEmitter, Injectable } from "@angular/core";
import { featureAdapter, initialState, PermissionsState } from "./permissions.state";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { NullTemplateVisitor } from "@angular/compiler";

export function permissionReducer(state = initialState, action: permissionsAction.Action) {
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
        loadingPermissions: true,
        errorLoadPermissions: null
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_SUCCESS: {
      const receivedPermissions: Permission[] = action.payload;

      return {
        ...state,
        permissions: receivedPermissions,
        loadingPermissions: false
      };
    }
    case ActionTypes.LOAD_PERMISSIONS_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        loadingPermissions: false,
        errorLoadPermissions: error
      };
    }
    case ActionTypes.ADD_PERMISSION_REQUEST: {
      const newPermission: string = action.payload;
      return {
        ...state,
        errorAddPermission: null
      };
    }
    case ActionTypes.ADD_PERMISSION_SUCCESS: {
      const newPermission: Permission = action.payload;
      return {
        ...state,
        permissions: [...state.permissions, newPermission]
      };
    }
    case ActionTypes.ADD_PERMISSION_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorAddPermission: error
      };
    }

    case ActionTypes.REMOVE_PERMISSION_REQUEST: {
      const newPermission: number = action.payload;
      return {
        ...state,
        errorRemovePermission: null
      };
    }
    case ActionTypes.REMOVE_PERMISSION_SUCCESS: {
      const permission: Permission = action.payload;
      return {
        ...state,
        permissions: state.permissions.filter(curPermission => {
          return curPermission.id !== permission.id;
        })
      };
    }

    case ActionTypes.REMOVE_PERMISSION_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemovePermission: error
      };
    }

    case ActionTypes.UPDATE_PERMISSION_REQUEST: {
      // const newPermission: number = action.payload;
      return {
        ...state,
        errorRemovePermission: null
      };
    }
    case ActionTypes.UPDATE_PERMISSION_SUCCESS: {
      const receivedPermission: Permission = action.payload;
      return {
        ...state,
        permissions: state.permissions.map(function(item) {
          if (item.id == receivedPermission.id) item.name = receivedPermission.name;
          return item;
        })
      };
    }

    case ActionTypes.UPDATE_PERMISSION_FAILURE: {
      const error: HttpErrorResponse = action.payload;
      return {
        ...state,
        errorRemovePermission: error
      };
    }

    default:
      return state;
  }
}

function sortBySeqId(e1: Permission, e2: Permission) {
  return e1.id - e2.id;
}
