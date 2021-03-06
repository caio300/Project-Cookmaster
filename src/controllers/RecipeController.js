const RecipeService = require('../services/RecipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeService.createRecipe(name, ingredients, preparation, _id);

  if (recipe.message) {
    return res.status(400).json({ message: recipe.message });
  }

  return res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  const recipes = await RecipeService.getRecipes();
  return res.status(200).json(recipes);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const getId = await RecipeService.findById(id);
  if (getId.message) {
    return res.status(404).json({ message: getId.message });
  }

  return res.status(200).json(getId);
};

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeService.updateRecipes(id, name, ingredients, preparation, _id);
  recipe.userId = _id;
  return res.status(200).json(recipe);
};

const excludeRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeService.excludeRecipe(id);
  res.status(204).json({ message: 'excluded product' });
};

module.exports = {
  createRecipe,
  getRecipes,
  findById,
  updateRecipes,
  excludeRecipe,
};