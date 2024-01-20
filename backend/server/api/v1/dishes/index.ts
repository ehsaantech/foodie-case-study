import express from "express";
import controller from "./dishes.controller";

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.get('/:id', controller.getByID);
router.get('/chef/:id', controller.getByChefID);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;