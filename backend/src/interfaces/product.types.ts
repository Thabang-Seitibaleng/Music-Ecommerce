export interface IProduct {
    id?: number;
    title: string;
    artist?: string;
    description?: string;
    category?: string;
    price: number;
    stockQuantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
