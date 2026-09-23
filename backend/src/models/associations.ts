import User from "./User";
import Product from "./Product";
import Order from "./Order";
import OrderItem from "./OrderItem";

export const setupAssociations = () => {
    // User and Order (One-to-Many)
    User.hasMany(Order, { foreignKey: "userId", as: "orders" });
    Order.belongsTo(User, { foreignKey: "userId", as: "user" });

    // Order and Product (Many-to-Many via OrderItem)
    Order.belongsToMany(Product, { 
        through: OrderItem, 
        foreignKey: "orderId", 
        otherKey: "productId",
        as: "products"
    });
    
    Product.belongsToMany(Order, { 
        through: OrderItem, 
        foreignKey: "productId", 
        otherKey: "orderId",
        as: "orders"
    });

    Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId" });

    Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
    OrderItem.belongsTo(Product, { foreignKey: "productId" });
};