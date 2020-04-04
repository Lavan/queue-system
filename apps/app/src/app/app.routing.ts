import { Routes } from '@angular/router';
import { SiteQueueDetailComponent } from './site-queue-detail/site-queue-detail.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { TicketComponent } from './ticket/ticket.component';
import { RootComponent } from './root/root.component';
import { SiteComponent } from './site/site.component';

export const appRoutes: Routes = [
  { path: 'site/:siteId/:queueId', component: SiteQueueDetailComponent },
  { path: 'site/:siteId', component: SiteDetailComponent },
  { path: 'site', component: SiteComponent },
  { path: 'queue/:queueId', component: QueueDetailComponent },
  { path: 'queue/:queueId/:ticketId', component: TicketComponent },
  { path: '', component: RootComponent },
  { path: '**', redirectTo: '' }
];
