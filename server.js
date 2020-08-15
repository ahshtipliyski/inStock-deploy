const express = require('express');
const app = express();
const cors = require('cors');
const sPort = 8080;
const warehouseRoutes = require('./routes/warehouses');
const inventoryRoutes = require('./routes/inventory');
const path = require('path');






app.use(express.json());
app.use(cors());

app.use('/warehouses', warehouseRoutes);
app.use('/inventory', inventoryRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//fix
app.listen(sPort, () => console.log(`Server listening on port: ${sPort}`));