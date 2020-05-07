import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<
    Product
  > = this.angularfirestor.collection('products');

  constructor(private angularfirestor: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  addProduct(p: Product) {
    return this.productsCollection.add(p);
  }
}
