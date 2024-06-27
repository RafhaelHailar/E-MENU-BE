import { Product, ProductCategorize, ProductCategory } from "@prisma/client";

export interface Category extends ProductCategorize {
  category: ProductCategory;
}

export interface ProductWithCategory extends Product {
  productCategorize: Category[];
}
