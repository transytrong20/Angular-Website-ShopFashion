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
    
    const scriptUrls = [
      // 'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery-3.4.1.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/popper.min.js',
      // 'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/bootstrap.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/owl.carousel.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.animateNumber.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.waypoints.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.fancybox.min.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/jquery.sticky.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/aos.js',
      'https://aspnetcore6-api-shopfashion.azurewebsites.net/files/cdn/js/custom.js'
    ];
    this.scriptLoaderService.loadScripts(scriptUrls).then(() => {
      // Scripts have been loaded and executed.
      // You can use the functionality provided by the scripts here.
      this.runScriptFunction();
    }).catch((error) => {
      console.error('Error loading scripts:', error);
    });
  }
  runScriptFunction() {
    // Call functions or perform actions from the loaded script
    console.log('Script function executed.');
  }
}
