const express = require('express');
const router = express.Router();

const datos = require('../data.json');

router.get('/', (req, res) => {
  res.json(datos);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  
  datos.push({
    id: datos.length + 1,
    name
    
  });
  res.json('Successfully created');
});

router.put('/:id', (req, res) => {
  console.log(req.body, req.params)
  const { id } = req.params;
  const { name } = req.body;
  

  datos.forEach((product, i) => {
    if (product.id == id) {
      product.name = name;
    }
  });
  res.json('Successfully updated');

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  datos.forEach((product, i) => {
    if(product.id == id) {
      datos.splice(i, 1);
      
    }
  });
  res.json('Successfully deleted');
});

module.exports = router;