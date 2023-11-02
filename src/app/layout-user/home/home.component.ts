import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  product!: any;
  seller!: any;

  constructor(
    private productService: HomeService
  ){}

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
}
