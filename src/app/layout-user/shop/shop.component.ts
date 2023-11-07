import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listCategory: any[] = [];

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.allCategory().subscribe(
      (data) => {
        this.listCategory = data;
        console.log('GetListProduct', data);
      }
    );
  }
}
