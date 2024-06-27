import {
  Product,
  ProductCategorize,
  ProductCategory,
  PromotionCategorize,
} from "@prisma/client";

export interface CategoryWithPromotionCategorize extends ProductCategory {
  promotionCategorize: PromotionCategorize;
}

export interface Category extends ProductCategorize {
  category: ProductCategory;
}

export interface ProductWithCategory extends Product {
  productCategorize: Category[];
}
