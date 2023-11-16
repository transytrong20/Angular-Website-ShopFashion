export interface ProductTypeModel {
    name: string;
    description: string;
    price: number;
    image: string;
    status: any; // Bạn có thể thay thế 'any' bằng kiểu dữ liệu phù hợp
    discount: number;
    accepted: boolean;
    index: number;
    new: boolean ;
    sale: boolean ;
    saleTurn: number; // Bạn có thể thay thế 'any' bằng kiểu dữ liệu phù hợp
    categoryId: string;
    categoryName: string[];
    createdTime: string; // Bạn có thể sử dụng kiểu Date nếu cần
    createdBy: any; // Bạn có thể thay thế 'any' bằng kiểu dữ liệu phù hợp
    lastModifiedTime: string | null; // Bạn có thể sử dụng kiểu Date nếu cần
    lastModifiedBy: number ; // Bạn có thể thay thế 'any' bằng kiểu dữ liệu phù hợp
    id: string;
  }