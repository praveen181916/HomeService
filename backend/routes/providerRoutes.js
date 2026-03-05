const express = require('express');
const router = express.Router();
const { getAllProviders, createProvider, updateProvider, deleteProvider } = require('../controllers/providerController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getAllProviders);
router.post('/', protect, adminOnly, createProvider);
router.put('/:id', protect, adminOnly, updateProvider);
router.delete('/:id', protect, adminOnly, deleteProvider);

module.exports = router;
