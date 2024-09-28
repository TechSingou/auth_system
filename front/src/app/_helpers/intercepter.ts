// auth.interceptor.ts (or define directly in main.ts)
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Clone the request to add the Authorization header
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer your-token-here')
  });

  // Pass the cloned request to the next handler
  return next(authReq);
};
