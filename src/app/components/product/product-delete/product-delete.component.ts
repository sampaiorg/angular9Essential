import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(data => {
      this.product = data;
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!');
      this.router.navigate(['/products']);
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
