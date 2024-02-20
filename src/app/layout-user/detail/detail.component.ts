import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptLoaderService } from 'src/app/services/javascript/script-loader.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements AfterViewInit {
  detailProduct: any;
  productId!: string;
  categoryId!: string;
  product: any;
  similarProduct: any;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private scriptLoaderService: ScriptLoaderService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.getProductDetails();
    });
  }
  ngAfterViewInit(): void {
    const scripts = [
      "https://localhost:7159/files/cdn/detail/js/vendor/jquery-3.2.1.min.js",
      "https://localhost:7159/files/cdn/detail/js/bootstrap.min.js",
      "https://localhost:7159/files/cdn/detail/js/main.js",
      // "https://localhost:7159/files/cdn/js/popper.min.js",
      // "https://localhost:7159/files/cdn/js/owl.carousel.min.js",
      // "https://localhost:7159/files/cdn/js/jquery.animateNumber.min.js",
      // "https://localhost:7159/files/cdn/js/jquery.waypoints.min.js",
      // "https://localhost:7159/files/cdn/js/jquery.fancybox.min.js",
      // "https://localhost:7159/files/cdn/js/jquery.sticky.js",
      // "https://localhost:7159/files/cdn/js/aos.js",
      // "https://localhost:7159/files/cdn/js/custom.js",
    ];
    for (const script of scripts) {
      const javascript = document.createElement('script');
      javascript.src = script;
      document.body.appendChild(javascript);
    }
  }
  runScriptFunction() {
    console.log('Script function executed.');
  }

  getProductDetails(): void {
    this.shopService.ProductById(this.productId).subscribe(data => {
      this.detailProduct = data;
    });
  }
}
