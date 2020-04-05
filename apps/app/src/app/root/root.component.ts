import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'queue-system-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  scan = false;
  allowedFormats = [BarcodeFormat.QR_CODE];

  private scanFormat = /^https:\/\/(.+)\/(site|queue)\/(.+)$/;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  scanSuccess(scan: string) {
    const result = scan.match(this.scanFormat);

    const [url, host, type, id] = result;

    if(!result) {
      return;
    }
    if(host !== location.host) {
      location.href = url;
    }

    this.router.navigate(['/' + type, id])
  }
}
