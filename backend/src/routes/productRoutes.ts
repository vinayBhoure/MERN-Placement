import express from 'express';
import { deleteProduct, getAdminProducts, getAllCategories, getAllProduct, getLatestProducts, getProductsByCategory, getSingleProduct, newProduct, updateProduct } from '../controllers/Product.js';
import { fileUpload } from '../middlewares/multer.js';
import { adminOnly } from '../middlewares/auth.js';

const router = express.Router();

// base url: /api/v1/product

router.post("/new", adminOnly, fileUpload, newProduct);
router.get("/latest", getLatestProducts );
router.get("/categories", getAllCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/allproducts", getAllProduct);
router.get("/admin-products", adminOnly, getAdminProducts);

router.route("/:id").get(getSingleProduct).put(adminOnly, fileUpload, updateProduct).delete(adminOnly, deleteProduct);


export default router