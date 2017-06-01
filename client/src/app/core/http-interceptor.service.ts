import {Injectable} from "@angular/core";
import {
  ConnectionBackend,
  Headers,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {TokenService} from "../security/shared/token.service";

@Injectable()
export class HttpInterceptorService extends Http {
  private UAA: string = "uaa";

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
              private slimLoadingBarService: SlimLoadingBarService,
              private tokenService: TokenService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.slimLoadingBarService.start();
    return this.intercept(super.request(url, this.setHeaders(options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.setHeaders(options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (url.indexOf(this.UAA) >= 0) {
      return this.intercept(super.post(url, body, options));
    } else {
      return this.intercept(super.post(url, body, this.setHeaders(options)));
    }
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.setHeaders(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.setHeaders(options)));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.do(() => this.slimLoadingBarService.complete())
      .catch((err: any, caught: Observable<Response>) => {
        this.slimLoadingBarService.complete();
        return Observable.throw(err);
      });
  }

  private setHeaders(options: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions({});
    }

    let token = this.tokenService.getOauthToken();

    if (token && token['access_token']) {

      if (!options.headers) {
        options.headers = new Headers();
      }
      let access_token = token['access_token'];
      options.headers.set('Authorization', 'Bearer ' + access_token);
      options.headers.set('Content-Type', 'application/json');
    }
    return options;
  }
}

export function httpInterceptorServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, slimLoadingBarService: SlimLoadingBarService, tokenService: TokenService) {
  return new HttpInterceptorService(xhrBackend, requestOptions, slimLoadingBarService, tokenService);
}
