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

export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressBarService.increase();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.progressBarService.decrease();
        }
      }),
      catchError(err => {
        this.progressBarService.decrease();
        // debugger
        // console.log("Caught error", err);
        return throwError(processErrorResponse(err));
      })
    );
  }
}
