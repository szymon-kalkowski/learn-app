import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const apiReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(apiReq);
  }
  return next(req);
};
