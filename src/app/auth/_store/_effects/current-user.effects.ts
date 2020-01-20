import {Injectable}                             from '@angular/core';
import {Actions, createEffect, ofType}          from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of}                                     from 'rxjs';

import * as CurrentUserActions from '../_actions/current-user.actions';
import {CurrentUserService}    from '../_services/current-user.service';
import {JwtModel}              from '../../../common/const';
import {UserModel}             from '../_models/user.model';


@Injectable()
export class CurrentUserEffects {

	createUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CurrentUserActions.createUser),
			exhaustMap(({userData}) => this.currentUserService.createUser(userData).pipe(
				map(response => {
					this.currentUserService.loginAfterSignUp(userData.email, userData.password);
					return CurrentUserActions.createUserSuccess({userData: response});
				}),
				catchError(err => of(CurrentUserActions.createUserFailure({error: err.error})))
			))
		);
	});

	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CurrentUserActions.login),
			exhaustMap(({email, password}) => this.currentUserService.login(email, password).pipe(
				map((jwt: JwtModel) => {
					this.currentUserService.setJwtToCookies(jwt);
					return CurrentUserActions.loginSuccess({jwt});
				}),
				catchError(({error}) => of(CurrentUserActions.loginFailure({error})))
			))
		);
	});


	getCurrentUserDetails$ = createEffect(() => this.actions$.pipe(
		ofType(CurrentUserActions.getCurrentUserDetails),
		switchMap(() => this.currentUserService.currentUserData().pipe(
			map((user: UserModel) => CurrentUserActions.getCurrentUserDetailsSuccess({user})),
			catchError(error => of(CurrentUserActions.getCurrentUserDetailsFailure({error})))
		))
	));


	constructor(private actions$: Actions, private currentUserService: CurrentUserService) {
	}

}
