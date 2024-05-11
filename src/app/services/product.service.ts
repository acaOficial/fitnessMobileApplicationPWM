import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>("productos");
  }

  getAllProducts() {
    return this.productsCollection.valueChanges({ idField: "id" });
  }

  getProductById(productId: string) {
    return this.afs
      .doc<Product>(`productos/${productId}`)
      .valueChanges({ idField: "id" });
  }


  toggleFavorite(product: Product) {
    //animal.favorite = !animal.favorite;
    this.afs.doc<Product>(`productos/${product.id}`).update(product);
  }


  getFavorites() {
    return this.afs
      .collection<Product>("productos", (ref) =>
        ref.where("favorite", "==", true)
      )
      .valueChanges({ idField: "id" });

  }

}
