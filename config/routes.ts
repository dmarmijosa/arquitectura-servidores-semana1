import { Router } from 'express';
import employeesRouter from '../controller/employees.controller';

const router = Router();

router.use('/employees', employeesRouter);

export default router;
