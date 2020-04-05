import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteQueueDetailComponent } from './site-queue-detail/site-queue-detail.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { EnterComponent } from './enter/enter.component';
import { TicketComponent } from './ticket/ticket.component';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SiteComponent } from './site/site.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from './services/site.service';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxKjuaModule } from 'ngx-kjua';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AppComponent, SiteQueueDetailComponent, SiteDetailComponent,
    QueueDetailComponent, EnterComponent, TicketComponent, RootComponent, SiteComponent
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
    FlexLayoutModule, MatInputModule, FormsModule, ReactiveFormsModule, MatListModule, MatGridListModule,
    ZXingScannerModule, NgxKjuaModule, MatExpansionModule],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
