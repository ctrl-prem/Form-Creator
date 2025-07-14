import express from 'express';
import {
  createForm,
  getForm,
  submitForm,
} from '../controllers/formController.js';

const router = express.Router();

router.post('/', createForm);
router.get('/:id', getForm);
router.post('/:id/submissions', submitForm);

export default router;
