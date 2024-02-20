import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { ScriptLoaderService } from 'src/app/services/javascript/script-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  product!: any;
  seller!: any;

  constructor(
    private productService: HomeService,
    private scriptLoaderService: ScriptLoaderService
  ) { }

  public ngOnInit() {
    const product = {};
    this.productService.getListProduct(product).subscribe(
      (data) => {
        this.product = data;
        console.log('GetListProduct', data);
      }
    );

    const seller = {};
    this.productService.getBestSeller(seller).subscribe(
      (data) => {
        this.seller = data;
        console.log('GetBestSeller', data);
      }
    );
  }

  ngAfterViewInit(): void {
    const scripts = [
      "https://localhost:7159/files/cdn/js/jquery-3.4.1.min.js",
      "https://localhost:7159/files/cdn/js/popper.min.js",
      "https://localhost:7159/files/cdn/js/bootstrap.min.js",
      "https://localhost:7159/files/cdn/js/owl.carousel.min.js",
      "https://localhost:7159/files/cdn/js/jquery.animateNumber.min.js",
      "https://localhost:7159/files/cdn/js/jquery.waypoints.min.js",
      "https://localhost:7159/files/cdn/js/jquery.fancybox.min.js",
      "https://localhost:7159/files/cdn/js/jquery.sticky.js",
      "https://localhost:7159/files/cdn/js/aos.js",
      "https://localhost:7159/files/cdn/js/custom.js",
    ];
    for (const script of scripts) {
      const javascript = document.createElement('script');
      javascript.src = script;
      document.body.appendChild(javascript);
    }
  }
}
