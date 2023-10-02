import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeadersInterceptor } from './interceptors/headers.interceptor'; 

export function createTranslateLoader( http: HttpClient ) 
{
  return new TranslateHttpLoader ( http,'assets/i18n/', '.json' )
}

@NgModule({
  declarations: [AppComponent],
  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot( {mode: 'md'} ), //mode material designe (*android)
    AppRoutingModule,
    TranslateModule.forRoot({ //se importa el translatemodule
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }

    }),
    HttpClientModule //nos permite consumir la API One Piece
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
