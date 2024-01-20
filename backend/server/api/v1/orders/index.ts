import express from "express";
import controller from "./orders.controller";

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.get('/:id', controller.getByID);
router.get('/user/:id', controller.getOrderByUserId);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;