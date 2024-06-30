const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(cors());
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit to 10mb
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Your Roboflow API details
const ROBOFLOW_API_ENDPOINT = 'https://detect.roboflow.com/dabur/2';
const ROBOFLOW_API_KEY = 'CSC6NWlRmHGQf2qUVPIL';

// Endpoint to handle image detection
app.post('/api/detect', async (req, res) => {
  const { image } = req.body;
  try {
    const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/billing-system/2",
        params: {
            api_key: "CSC6NWlRmHGQf2qUVPIL"
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }}
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error detecting objects:', error.message);
    res.status(500).json({ error: 'Failed to detect objects' });
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
  

//   const response = await axios({
//     method: "POST",
//     url: "https://detect.roboflow.com/dabur/2",
//     params: {
//         api_key: "CSC6NWlRmHGQf2qUVPIL"
//     },
//     data: image,
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     }
// })
// .then(function(response) {
//     res.json(response.data);
// })
// .catch(function(error) {
//     console.error('Error detecting objects:', error.message);
//     res.status(500).json({ error: 'Failed to detect objects' });});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
