import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { SiteQueueDetailComponent } from './site-queue-detail/site-queue-detail.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { TicketComponent } from './ticket/ticket.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [AppComponent, SiteQueueDetailComponent, SiteDetailComponent, QueueDetailComponent, TicketComponent, RootComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

const appRoutes: Routes = [
  { path: 'site/:siteId/:queueId', component: SiteQueueDetailComponent },
  { path: 'site/:siteId', component: SiteDetailComponent },
  { path: ':queueId', component: QueueDetailComponent },
  { path: ':queueId/:ticketId', component: TicketComponent },
  { path: '', component: RootComponent },
  { path: '**', redirectTo: '' }
];
