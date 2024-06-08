import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Log the token to ensure it is being retrieved

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set("authorization", token),
      });
      console.log("Cloned Request Headers:", clonedRequest.headers); // Log the cloned request headers
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
