export interface IOrder {
    id?: number;
    userId: number;
    totalAmount: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IOrderItem {
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}