import { Product } from './../models/product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  filterProducts$: Observable<Product[]>;

  displayedColumns = ['name', 'price', 'stock', 'operations'];

  @ViewChild('name') productName: ElementRef;

  productForm = this.fb.group({
    id: [undefined],
    name: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onSubmit() {
    let p: Product = this.productForm.value;
    if (!p.id) {
      this.addProduct(p);
    } else {
      this.updateProduct(p);
    }
  }

  addProduct(p: Product) {
    this.productService
      .addProduct(p)
      .then(() => {
        this.snackBar.open('Product add', 'OK', { duration: 2000 });
        this.productForm.reset({
          name: '',
          stock: '',
          price: '',
          id: undefined,
        });
        this.productName.nativeElement.focus();
      })
      .catch(() => {
        this.snackBar.open('Erros on submiting the Product', 'OK', {
          duration: 2000,
        });
      });
  }

  updateProduct(p: Product) {
    this.productService
      .updateProduct(p)
      .then(() => {
        this.snackBar.open('Product Updated', 'ok', { duration: 2000 });
        this.productForm.reset({
          name: '',
          stock: '',
          price: '',
          id: undefined,
        });

        this.productName.nativeElement.focus();
      })
      .catch((err) => {
        console.log(err);
        this.snackBar.open('Error Update the Product!');
      });
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  del(p: Product) {
    this.productService
      .deleteProduc(p)
      .then(() => {
        this.snackBar.open('Product has been removed', 'ok', {
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log(err);

        this.snackBar.open('Error when trying to removed the Product ', 'ok', {
          duration: 2000,
        });
      });
  }

  filter(event) {
    this.filterProducts$ = this.productService.searchByName(event.target.value);
  }
}
