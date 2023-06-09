const express = require('express');
const router = express.Router();

//Import controllers
import ProspectController from "../controllers/ProspectController";

router.post('/prospect/save', ProspectController.save);
router.get('/prospect', ProspectController.all);
router.get('/prospect/:id', ProspectController.get);

module.exports = router;