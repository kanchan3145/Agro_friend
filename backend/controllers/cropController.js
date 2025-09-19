// // const { predictCrop } = require('./yourMachineLearningModel'); // Import your machine learning model function
// // const { PythonShell } = require('python-shell');

// // // Load machine learning model
// // const pyshell = new PythonShell('path/to/your/model_script.py');


// module.exports.cropRecommendation = async (req, res) => {
//   try {
//     const {nitrogen, phosphorus, potassium,temperature, humidity, pH, rainfall } = req.body;
//     console.log(req.body)
//     console.log(nitrogen, phosphorus, potassium,temperature, humidity, pH, rainfall)

//     res.json({ temperature, humidity });

//     // Pass all the parameters to your machine learning model function for prediction
//     // const cropRecommendation = predictCrop(nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall);

//     // res.json({ cropRecommendation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // module.exports.cropRecommendation = async (req, res) => {
// //   try {
// //     // const {nitrogen, phosphorus, potassium,temperature, humidity, pH, rainfall } = req.body;
// //     // console.log(req.body)
// //     // console.log(nitrogen, phosphorus, potassium,temperature, humidity, pH, rainfall)

// //     // res.json({ temperature, humidity });







// //     const { nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall } = req.body;

// //   // Pass input data to the Python script
// //   pyshell.send({ nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall });

// //   // Receive results from the Python script
// //   pyshell.on('message', (message) => {
// //     const recommendation = JSON.parse(message);
// //     res.json(recommendation);
// //   });

// //   // End the input stream and wait for the Python script to finish
// //   pyshell.end((err) => {
// //     if (err) throw err;
// //   });
// // }









//     // Pass all the parameters to your machine learning model function for prediction
//     // const cropRecommendation = predictCrop(nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall);

//     // res.json({ cropRecommendation });
// //    catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };


// 🚀 Dummy Crop Recommendation
module.exports.cropRecommendation = async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall } = req.body;

    console.log("🌱 Received crop data:", req.body);

    let recommendation = "Wheat"; // default

    if (pH < 6) recommendation = "Rice";
    if (nitrogen > 80 && potassium > 40) recommendation = "Maize";
    if (humidity > 75 && rainfall > 200) recommendation = "Sugarcane";
    if (phosphorus < 20) recommendation = "Lentils";

    res.json({
      recommendedCrop: recommendation,
      inputs: { nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall }
    });

  } catch (error) {
    console.error("❌ Crop Recommendation Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
