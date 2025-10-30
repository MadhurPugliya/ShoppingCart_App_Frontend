export interface Product {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    imageUrl?: string; 
    categoryName: string;// optional property, as not every product may have an image
  }