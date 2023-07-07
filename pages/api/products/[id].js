import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }

  if (request.method === "PUT") {
    Product.findByIdAndUpdate(id, { $set: request.body, });
    response.status(200).json({ status: "Product successfully updated."});
  }

  if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    return response.status(200).json({ status: "Product successfully deleted." });
  }
}