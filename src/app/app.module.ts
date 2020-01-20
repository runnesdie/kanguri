import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AuthModule} from './apps/auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CookieService} from 'ngx-cookie-service';
import {ErrorHandler} from './common/error.handler';
import {MatDialogModule} from '@angular/material/dialog';
import {ServiceInterceptor} from 'src/app/_interceptor/service.interceptor';
import {HeaderComponent} from './layout/header/header.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		RouterModule,
		HttpClientModule,
		MatDialogModule,
		ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
		EffectsModule.forRoot([]),
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true
			}
		}),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

		// apps
		AuthModule,
		MatButtonModule,

	],
	providers: [
		CookieService,
		ErrorHandler,
		{provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true}, // interceptor
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
