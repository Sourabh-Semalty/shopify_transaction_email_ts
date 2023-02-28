"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const static_data_1 = require("./helpers/static_data");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
const SHOP = "local-cc-1.myshopify.com";
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Running Node with Express and Typescript",
    });
});
app.get("/reco/product-card/click/:index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { index } = req.params;
        const { productIds } = req.query;
        if (!productIds)
            throw new Error("Invalid product id's");
        const strProdIds = productIds;
        const currentProd = static_data_1.ProductsData[strProdIds][parseInt(index, 10)];
        const productUrl = `https://${SHOP}/products/${currentProd.handle}`;
        res.redirect(productUrl);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
        return;
    }
}));
app.get("/reco/product-card/render/:index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { index } = req.params;
        const { productIds } = req.query;
        if (!productIds)
            throw new Error("Invalid product id's");
        const strProdIds = productIds;
        const currentProd = static_data_1.ProductsData[strProdIds][parseInt(index, 10)];
        console.log(currentProd);
        const response = yield axios_1.default.get(currentProd.image, {
            responseType: "arraybuffer",
        });
        res.set("Content-Type", "image/jpeg");
        res.send(response.data);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
        return;
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});
