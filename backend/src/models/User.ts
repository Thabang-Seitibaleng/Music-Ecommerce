import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";
import { IUser } from "@interfaces/user.types";

interface UserCreationAttributes extends Optional<IUser, "id" | "role"> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "customer" | "admin";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);

export default User;
