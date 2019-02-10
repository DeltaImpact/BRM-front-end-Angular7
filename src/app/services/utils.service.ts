import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";

import { ErrorGroup } from "../models";

export function processErrorResponse(error: HttpErrorResponse) {
  let err = [];
  if (error.status === 0) {
    err = ["Network Error"];
    return err;
  }

  if (error.error) {
    err = error.error;
  }

  return err;
}
