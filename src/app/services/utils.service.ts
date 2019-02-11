import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";

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
