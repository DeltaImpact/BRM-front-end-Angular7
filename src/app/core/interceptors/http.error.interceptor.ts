import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { ProgressBarService } from "../services/progress-bar.service";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { processErrorResponse } from "../../services/utils.service";
import { Observable, of, throwError } from "rxjs";
import { SnackBarService } from "../../services/snackBar.service";

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 0) {
          this.snackBarService.showNetworkSnackBar("networkError");
        }
        return throwError(processErrorResponse(err));
      })
    );
  }
}
