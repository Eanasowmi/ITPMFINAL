const express = require("express");
const router = express.Router();
const Material = require("../models/materialModel");

router.post("/", async (req, res) => {
  const { materialId, name, quantity, price } = req.body;

  try {
    const material = new Material({ materialId, name, quantity, price });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { materialId, name, quantity, price } = req.body;

  try {
    const material = await Material.findByIdAndUpdate(
      id,
      { materialId, name, quantity, price },
      { new: true, runValidators: true }
    );
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findByIdAndDelete(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/name/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const material = await Material.findOne({ name });
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/name/:name", async (req, res) => {
  const { name } = req.params;
  const { quantity } = req.body;
  try {
    const material = await Material.findOne({ name });
    if (material) {
      material.quantity = quantity;
      await material.save();
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
