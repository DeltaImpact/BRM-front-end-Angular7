import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Role } from "../models";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  showNetworkSnackBar(name): void {
    this.translateService
      .get(
        [
          String(_("networkError")),
        ],
      )
      .subscribe(texts => {
        const config: any = new MatSnackBarConfig();
        config.duration = AppConfig.snackBarDuration;
        this.snackBar.open(texts[name], "OK", config);
      });
  }

  showRoleSnackBar(name): void {
    this.translateService
      .get(
        [
          String(_("RoleAlreadyExist")),
          String(_("chooseUser")),
          String(_("chooseUserError")),
          String(_("userAlreadyHaveRole")),
          String(_("userAlreadyHavePermission")),
          String(_("UserAlreadyExist")),
          String(_("PermissionAlreadyExist")),
          String(_("saved"))
        ],
      )
      .subscribe(texts => {
        const config: any = new MatSnackBarConfig();
        config.duration = AppConfig.snackBarDuration;
        this.snackBar.open(texts[name], "OK", config);
      });
  }
}
