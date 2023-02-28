import express from "express";
import axios from "axios";
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

    const strProdIds: any = productIds as string[];
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

    const strProdIds: any = productIds as string[];

    const currentProd = ProductsData[strProdIds][parseInt(index, 10)];

    console.log(currentProd);
    const response = await axios.get(currentProd.image, {
      responseType: "arraybuffer",
    });
    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
