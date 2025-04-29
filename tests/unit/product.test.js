jest.mock("../../models/Product-model.js");
jest.mock("nanoid", () => ({ nanoid: jest.fn().mockReturnValue("12345") }));

const {
  listProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../../app/products");
const Product = require("../../models/Product-model");

afterEach(() => jest.clearAllMocks());

describe("Product handlers - unit tests", () => {
  describe("listProducts", () => {
    test("succesfully return array of products", async () => {
      const fakeData = [{ title: "A" }];
      const populate = jest.fn().mockResolvedValue(fakeData);
      Product.find.mockReturnValue({ populate });
      const req = { query: { category: "cat1" } };
      const res = { send: jest.fn(), sendStatus: jest.fn() };
      await listProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({ category: "cat1" });
      expect(populate).toHaveBeenCalledWith("category", "title description");
      expect(res.send).toHaveBeenCalledWith(fakeData);
    });

    test("return 500", async () => {
      Product.find.mockImplementation(() => {
        throw new Error("fail");
      });
      const req = { query: {} };
      const res = { send: jest.fn(), sendStatus: jest.fn() };
      await listProducts(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
  });
});
