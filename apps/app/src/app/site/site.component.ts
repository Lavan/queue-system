import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'queue-system-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  description: string;

  constructor(private readonly router: Router, private readonly siteService: SiteService) {
    if (this.siteService.currentSite) {
      this.router.navigate(['/site', this.siteService.currentSite]);
    }
  }

  ngOnInit(): void {
  }

  async create() {
    const site = await this.siteService.createSite({ description: this.description }).toPromise();
    this.goToSite(site.id);
  }

  async goToSite(siteId: string) {
    this.router.navigate(['/site', siteId]);
  }
}
