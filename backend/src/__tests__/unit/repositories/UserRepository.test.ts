import User from "@models/User";
import { IUser } from "@interfaces/user.types";
import { UserRepository } from "@repositories/UserRepository";

jest.mock("@models/User");

describe("UserRepository Unit Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("findByEmail", () => {
        it("should find a user by email", async () => {
            const mockUser = {
                id: 1,
                name: "Test User",
                email: "test@example.com",
            } as User;

            (User.findOne as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserRepository.findByEmail("test@example.com");

            expect(User.findOne).toHaveBeenCalledWith({
                where: {
                email: "test@example.com",
                },
            });

            expect(result).toBe(mockUser);
        });

        it("should return null when the user does not exist", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            const result = await UserRepository.findByEmail(
                "notfound@example.com"
            );

            expect(User.findOne).toHaveBeenCalledWith({
                where: {
                email: "notfound@example.com",
                },
            });

            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("should create a user with the provided data", async () => {
            const userData: Partial<IUser> = {
                name: "Test User",
                email: "test@example.com",
                password: "Password123!",
            };

            const mockUser = {
                id: 1,
                ...userData,
            } as User;

            (User.create as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserRepository.create(userData);

            expect(User.create).toHaveBeenCalledWith(userData);
            expect(result).toBe(mockUser);
        });
    });

    describe("findById", () => {
        it("should find a user by ID", async () => {
            const mockUser = {
                id: 1,
                name: "Test User",
                email: "test@example.com",
            } as User;

            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserRepository.findById(1);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(result).toBe(mockUser);
        });

        it("should return null when the user does not exist", async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await UserRepository.findById(999);

            expect(User.findByPk).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        });
    });
});