import express, { request } from "express";
import { ProductsData } from "./helpers/static_data";
const app = express();
app.use(express.json());
const PORT = 3000;

const SHOP = "local-cc-1.myshopify.com";

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Running Node with Express and Typescript",
  });
});

app.get("/reco/product-card/click/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { productIds } = req.query;
    if (!productIds) throw new Error("Invalid product id's");

    const strProdIds: any = (productIds as string[]).join(",");
    const currentProd = ProductsData[strProdIds][parseInt(index, 10)];

    const productUrl = `https://${SHOP}/products/${currentProd.handle}`;
    res.redirect(productUrl);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    return;
  }
});

app.get("/reco/product-card/render/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { productIds } = req.query;
    if (!productIds) throw new Error("Invalid product id's");

    const strProdIds: any = (productIds as string[]).join(",");

    const currentProd = ProductsData[strProdIds][parseInt(index, 10)];

    const response = await request.get(currentProd.image);
    console.log(response);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
