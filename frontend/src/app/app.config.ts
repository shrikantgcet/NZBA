import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MsalService, MsalGuard, MsalBroadcastService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalInterceptor, type MsalInterceptorConfiguration, type MsalGuardConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, type IPublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authConfig, authority } from './auth.config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
      {
        provide: MSAL_INSTANCE,
        useFactory: (): IPublicClientApplication => new PublicClientApplication({
          auth: { clientId: authConfig.clientId, authority, redirectUri: authConfig.redirectUri },
          cache: { cacheLocation: 'localStorage'}
        })
      },
      {
        provide: MSAL_GUARD_CONFIG,
        useFactory: (): MsalGuardConfiguration => ({ interactionType: InteractionType.Redirect })
      },
      {
        provide: MSAL_INTERCEPTOR_CONFIG,
        useFactory: (): MsalInterceptorConfiguration => ({
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map<string, Array<string>>([[ authConfig.api.baseUrl + '/*', authConfig.api.scopes ]])
        })
      },
      { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
      MsalService, MsalGuard, MsalBroadcastService,
      provideHttpClient(withInterceptorsFromDi())]
};
