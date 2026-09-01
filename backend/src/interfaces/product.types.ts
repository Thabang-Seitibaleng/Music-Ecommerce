export interface IProduct {
    id?: number;
    title: string;
    description?: string;
    price: number;
    stockQuantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}