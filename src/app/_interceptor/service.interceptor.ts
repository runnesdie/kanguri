import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserService} from '../auth/_store/_services/current-user.service';
import {Observable} from 'rxjs';
import {noCredentialsUrls} from '../common/const';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(private userService: CurrentUserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (noCredentialsUrls.includes(request.url)) {
            // Some url's like jwt/create, refresh or verify does not require headers to be set
            return next.handle(request);
        }

        const {access, refresh} = this.userService.getJwtFromCookies();
        if (access) {
            // If there is an access token then it has not expired yet
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${access}`}
            });
            return next.handle(request);
        }

        if (refresh) {
            // If there is no access but refresh, we use that refresh to get a new access token.
            this.userService.refreshAccessToken().subscribe(
                response => {
                    if (response) {
                        request = request.clone({
                            setHeaders: {Authorization: `Bearer ${response.access}`}
                        });
                        return next.handle(request);
                    }
                },
                () => this.userService.logout());
        }

        // If there are neither access nor refresh we must log the user out!
        this.userService.logout();
    }
}