import { ErrorHandler, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { WebpackTranslateLoader } from "./webpack-translate-loader";
import { APP_CONFIG, AppConfig } from "./configs/app.config";
import { SharedModule } from "./shared/shared.module";
import { RootStoreModule } from "./root-store/root-store.module";
import { NgxExampleLibraryModule } from "@ismaestro/ngx-example-library";
import { FirebaseModule } from "./shared/modules/firebase.module";

@NgModule({
  imports: [
    FirebaseModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    NgxExampleLibraryModule.forRoot(),
    CoreModule,
    SharedModule,
    RootStoreModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: APP_CONFIG, useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}
