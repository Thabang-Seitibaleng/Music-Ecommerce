import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import { IOrderItem } from "@interfaces/order.types";

class OrderItem extends Model<IOrderItem> implements IOrderItem {
    declare orderId: number;
    declare productId: number;
    declare quantity: number;
    declare unitPrice: number;
}

OrderItem.init(
    {
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "order_items",
        timestamps: false,
    }
);

export default OrderItem;