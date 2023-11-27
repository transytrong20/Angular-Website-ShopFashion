import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PangingCategoryModel } from 'src/app/Models/Shop-Service-Model';
import { ProductTypeModel } from 'src/app/Models/ProductTypeModel';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listCategory: any[] = [];
  pangingObj = new PangingCategoryModel()
  listProduct: any[] = [];
  categoryId: string = ''

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shopService.allCategory().subscribe(
      (data) => {
        this.listCategory = data;
        console.log('Category', data);
      }
    );

    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '' ;
      this.getProductDetails();
    });

    
    this.pangingObj.PageIndex = 1
    this.shopService.allProduct(this.pangingObj).subscribe(
      (response: { data: ProductTypeModel[] }) => {
        this.listProduct = response.data;
        console.log('Product', this.listProduct);
      }
    )
  }
  getProductDetails() : void {
    this.shopService.allProduct(this.pangingObj).subscribe(
      (response: { data: ProductTypeModel[] }) => {
        this.listProduct = response.data;
        console.log('Product', this.listProduct);
      }
    )
  }
}
