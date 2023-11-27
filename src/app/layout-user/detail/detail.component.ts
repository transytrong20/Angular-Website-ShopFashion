import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptLoaderService } from 'src/app/services/javascript/script-loader.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
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
      this.productId = params.get('id') || '' ;
      this.getProductDetails();
    });
    

    const scriptUrls = [
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/detail/js/vendor/jquery-3.2.1.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/detail/js/bootstrap.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/detail/js/main.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/popper.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/owl.carousel.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.animateNumber.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.waypoints.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.fancybox.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.sticky.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/aos.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/custom.js'
    ];
    this.scriptLoaderService.loadScripts(scriptUrls).then(() => {
      this.runScriptFunction();
    }).catch((error) => {
      console.error('Error loading scripts:', error);
    });

    
  }
  
  runScriptFunction() {
    console.log('Script function executed.');
  }

  getProductDetails() : void {
    this.shopService.ProductById(this.productId).subscribe(data => {
      this.detailProduct = data;
    });
  }
}
