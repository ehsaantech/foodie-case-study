import { Router } from 'express';

import authRouter from "./auth";
import userRouter from "./user";
import dishRouter from "./dishes";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/dish', dishRouter);

export default router;