const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({ category: cat._id, isActive: true });
        return { ...cat.toObject(), productCount };
      })
    );

    res.json({ success: true, categories: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const deletedCount = await Product.deleteMany({ category: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: `Category deleted with ${deletedCount.deletedCount} associated products` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
