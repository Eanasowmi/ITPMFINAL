const asyncHandler = require("express-async-handler");
const Material = require("../models/materialModel");

const addMaterial = asyncHandler(async (req, res) => {
  const { materialId, name } = req.body;

  if (!materialId || !name) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const materialExists = await Material.findOne({ materialId });
  if (materialExists) {
    res.status(400);
    throw new Error("Material already exists");
  }

  const material = new Material({
    materialId,
    name,
  });

  const createdMaterial = await material.save();
  res.status(201).json(createdMaterial);
});

module.exports = { addMaterial };
