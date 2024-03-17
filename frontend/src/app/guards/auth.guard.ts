import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (_route, _state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated());
  !isAuthenticated && router.navigate(['/login']);
  return isAuthenticated;
};
