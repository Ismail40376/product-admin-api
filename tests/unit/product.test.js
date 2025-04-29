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

  describe("getProductById", () => {
    test("return found product", async () => {
      const fake = { _id: "xyz" };
      Product.findById.mockResolvedValue(fake);

      const req = { params: { id: "xyz" } };
      const res = { send: jest.fn(), sendSatatus: jest.fn() };
      await getProductById(req, res);
      expect(Product.findById).toHaveBeenCalledWith("xyz");
      expect(res.send).toHaveBeenCalledWith(fake);
    });
    test("return 404 if product not found", async () => {
      Product.findById.mockResolvedValue(null);
      const req = { params: { id: "nope" } };
      const res = { send: jest.fn(), sendStatus: jest.fn() };
      await getProductById(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
    test("return 500", async () => {
      Product.findById.mockRejectedValue(new Error("err"));
      const req = { params: { id: "123" } };
      const res = { send: jest.fn(), sendStatus: jest.fn() };
      await getProductById(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
  });
});
