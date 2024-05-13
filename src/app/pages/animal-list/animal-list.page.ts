import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import {DatabaseService} from "../../services/database.service";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-animal-list",
  templateUrl: "./animal-list.page.html",
  styleUrls: ["./animal-list.page.scss"],
})
export class ProductListPage implements OnInit {

  
  products: Product[] = [];
  favorites: Product[] = [];
  linkImages: string[] = [];
  userID: string = '';
  refresh: boolean = false;

  constructor(
    private sqlite: DatabaseService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {    
    this.userID = sessionStorage.getItem('uid');
    console.log("ngOnInit");
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter() {
    this.readFavorites();
  }


  readFavorites() {
    // Leemos los datos de la base de datos
    this.sqlite.read(this.userID).then((products: Product[]) => {

      this.favorites = products;
      this.getProducts();

    }).catch(err => {
      console.error(err);
    })
  }

  isFavorite(product): boolean {
    let item =
      this.favorites.find(elem => elem.id === product.id);

    let favorite: boolean = !!item;

    return favorite;
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe((products) => {
        this.products = products;
        console.log(this.products)

      });
  }

  createFavorite(product: Product) {
    // Creamos un elemento en la base de datos
    this.sqlite.create(product, this.userID)
      .then((changes) => {
        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }

  deleteFavorite(product: Product) {
    // Borramos el elemento
    this.sqlite.delete(product.id, this.userID)
      .then((changes) => {
        console.log("deleteFavorite");

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }


  toggleFavorite(product: Product): void {
    if(this.isFavorite(product)) this.deleteFavorite(product);
    else this.createFavorite(product);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
