import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: "app-animal-detail",
  templateUrl: "./animal-detail.page.html",
  styleUrls: ["./animal-detail.page.scss"],
})
export class ProductDetailPage implements OnInit {

  product?: Product;
  favorite = false;
  favorites: Product[] = [];
  linkImages: string = "";
  userID: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sqlite: DatabaseService
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.userID = sessionStorage.getItem('uid');
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter() {
    this.readFavorites();
  }

  readFavorites() {
    // Leemos los datos de la base de datos
    this.sqlite.read(this.userID).then((products: Product[]) => {

      this.favorites = products;
      this.getProduct();

    }).catch(err => {
      console.error(err);
    })
  }

  getProduct(): void {
    const id: string = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.productService
        .getProductById(id)
        .subscribe((product) => {
          this.product = product;

          let item =
            this.favorites.find(elem => elem.id === product.id);

          this.favorite = !!item;

          if(this.favorite) console.log("isFavorite");

      });
    }
  }


  createFavorite() {
    // Creamos un elemento en la base de datos
    this.sqlite.create(this.product, this.userID)
      .then((changes) => {

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }

  deleteFavorite() {
    this.sqlite.delete(this.product.id, this.userID)
      .then((changes) => {
        console.log("deleteFavorite");

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }



  toggleFavorite(): void {
    if (this.product) {
      if(this.favorite) this.createFavorite();
      else this.deleteFavorite();
    }
  }
}
