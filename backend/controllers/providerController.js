const ServiceProvider = require('../models/ServiceProvider');

exports.getAllProviders = async (req, res) => {
  try { res.json(await ServiceProvider.find()); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createProvider = async (req, res) => {
  try { res.status(201).json(await ServiceProvider.create(req.body)); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProvider = async (req, res) => {
  try {
    await ServiceProvider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Provider deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
