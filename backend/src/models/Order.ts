import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";
import { IOrder } from "@interfaces/order.types";

interface OrderCreationAttributes extends Optional<IOrder, "id" | "status"> {}

class Order extends Model<IOrder, OrderCreationAttributes> implements IOrder {
    declare id: number;
    declare userId: number;
    declare totalAmount: number;
    declare status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        status: {
            type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
            defaultValue: 'pending',
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true,
    }
);

export default Order;