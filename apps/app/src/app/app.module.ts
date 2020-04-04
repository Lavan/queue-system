import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteQueueDetailComponent } from './site-queue-detail/site-queue-detail.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { TicketComponent } from './ticket/ticket.component';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SiteComponent } from './site/site.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from './services/site.service';

@NgModule({
  declarations: [AppComponent, SiteQueueDetailComponent, SiteDetailComponent, QueueDetailComponent, TicketComponent, RootComponent, SiteComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule, MatIconModule, MatButtonModule,
    FlexLayoutModule, MatInputModule, FormsModule, ReactiveFormsModule],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
