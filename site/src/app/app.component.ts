import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  fbImage = "https://mascotasvirtuales.com.mx/assets/images/mascotas-virtuales.jpg";

  constructor(
      private primengConfig: PrimeNGConfig,
      private metaService: Meta
      ) {


    this.metaService.updateTag({ property: 'og:url', content: 'https://mascotasvirtuales.com.mx' });
      this.metaService.updateTag({ property: 'og:title', content: 'Mascotas Virtuales'});
      this.metaService.updateTag({ property: 'og:description', content: 'Mascotas Virtuales todo sobre mascotas'});
      this.metaService.updateTag({ property: 'og:image', content: this.fbImage});
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
