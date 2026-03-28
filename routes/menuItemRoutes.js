const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');

// Post Method to add a Menu Item
router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newItem = new MenuItem(data);

    const response = await newItem.save();
    console.log('Menu Item Saved');
    res.status(200).json(response);

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


// GET Method to get the Menu Items
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Menu Item data fetched');
    res.status(200).json(data);

  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});

  }
})

router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract the teste type from the URL parameter

   if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fetched')
      res.status(200).json(response);
    
  } else {
    res.status(404).json({error: 'Invalid teste type'});
  }

  } catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

// Perform put operation for MenuItem
router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id; // Extract the id from the URL parameter
    const updatedMenuItemData = req.body; // Updated data for the MenuItem

    const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
      new: true,   // Return the updated document
      runValidators: true   // Run Mongoose validation
    })

    if (!response) {
      return res.status(404).json({error: 'MenuItem not found'});
    }

    console.log('data updated');
    res.status(200).json(response);

  }catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;  // Extract the MenuItem's ID from the URL parameter

    // Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(404).json({error: 'MenuItem not fount'});
    }
    console.log('data delete');
    res.status(200).json({message: 'MenuItem Deleted Successfully'});

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


module.exports = router;



