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
    p.id = this.angularfirestor.createId();
    return this.productsCollection.doc(p.id).set(p);

    // return this.productsCollection.add(p);
  }

  deleteProduc(p: Product) {
    return this.productsCollection.doc(p.id).delete();
  }

  updateProduct(p: Product) {
    return this.productsCollection.doc(p.id).set(p);
  }

  searchByName(name: string): Observable<Product[]> {
    return this.angularfirestor
      .collection<Product>('products', (ref) =>
        ref
          .orderBy('name')
          .startAt(name)
          .endAt(name + '\uf8ff')
      )
      .valueChanges();
  }
}
