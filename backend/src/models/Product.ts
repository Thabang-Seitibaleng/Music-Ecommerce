import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";
import { IProduct } from "@interfaces/product.types";

interface ProductCreationAttributes extends Optional<IProduct, "id"> {}

class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
    declare id: number;
    declare title: string;
    declare description: string;
    declare price: number;
    declare stockQuantity: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stockQuantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true,
    }
);

export default Product;