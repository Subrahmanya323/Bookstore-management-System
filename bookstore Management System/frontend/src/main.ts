import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Import appConfig from app.config.ts
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient
import { provideRouter } from '@angular/router'; // Provide router configuration
import { routes } from './app/app.routes'; // Import routes from app.routes.ts

// Bootstrapping the application with AppComponent and configuration
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Make HttpClient available throughout the app
    provideRouter(routes), // Configure routing for the app
    ...appConfig.providers // Merge other app-specific providers from appConfig
  ]
})
  .catch((err) => console.error(err)); // Catch any errors during app bootstrapping
