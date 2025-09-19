// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import states from "../../utils/state_city.js";
// import { useNavigate } from "react-router-dom";

// const Crop = () => {
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     state: "",
//     city: "",
//     pH: "",
//     rainfall: "",
//   });

//   const [loadingWeather, setLoadingWeather] = useState(false);
//   const [loadingRecommendation, setLoadingRecommendation] = useState(false);

//   const [weather, setWeather] = useState({
//     temperature: null,
//     humidity: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//   };

//   useEffect(() => {
//     const fetchWeather = async () => {
//       if (inputs.city) {
//         try {
//           setLoadingWeather(true); // Set loading state while fetching data
//           const response = await axios.get(
//             `https://agro-friend.vercel.app/api/get-weather?city=${inputs.city}`
//           );

//           const { temperature, humidity } = response.data;
//           setWeather({ temperature, humidity });
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoadingWeather(false); // Reset loading state when data is fetched
//         }
//       }
//     };

//     fetchWeather();
//   }, [inputs.city]);

//   const { nitrogen, phosphorus, potassium, city, pH, rainfall } = inputs;

//   const { temperature, humidity } = weather;

//   // Creating a new object with the original inputs and the fetched temperature and humidity
//   const requestData = {
//     nitrogen,
//     phosphorus,
//     potassium,
//     temperature,
//     city,
//     humidity,
//     pH,
//     rainfall,
//   };
//   // console.log(requestData)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoadingRecommendation(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/crop-recommendation",
//         requestData
//       );

//       const recommendation = response.data;
//       navigate("/crop-result", { state: { recommendation } });
//     } catch (error) {
//       console.error(error);
//     }
//     finally {
//       setLoadingRecommendation(false); // Reset loading state when data is fetched or an error occurs
//     }
//   };

//   return (
//     <>
//       <div className="pt-16 md:pt-0">
//         <section className="w-full py-12 md:py-24 lg:py-32 border-t">
//           <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center lg:space-y-4">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold pb-3 tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
//                 Crop Recommendation
//               </h2>
//               <p className="max-w-[600px] text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
//                 Let us help you choose the best crops for your farm based on
//                 your location and soil conditions.
//               </p>
//             </div>
//             <div className="mx-auto w-full max-w-sm space-y-2">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col font-bold sm:font-semibold items-center gap-8"
//               >
//                 <div className="flex flex-col items-start ring-1 ring-orange-500 hover:ring-green-500 shadow-xl px-4 rounded-lg gap-4 py-4">
//                   <div className="space-x-2 space-y-2">
//                     <label className="text-sm">Nitrogen:</label>
//                     <input
//                       type="number"
//                       name="nitrogen"
//                       placeholder="Enter the value of N"
//                       value={inputs.nitrogen}
//                       onChange={handleInputChange}
//                       required
//                       className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className=" space-x-2 space-y-2">
//                     <label className="text-sm">Phosphorus:</label>
//                     <input
//                       type="number"
//                       name="phosphorus"
//                       placeholder="Enter the value of P"
//                       value={inputs.phosphorus}
//                       onChange={handleInputChange}
//                       required
//                       className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className=" space-x-2 space-y-2">
//                     <label className="text-sm">Potassium:</label>
//                     <input
//                       type="number"
//                       name="potassium"
//                       placeholder="Enter the value of K"
//                       value={inputs.potassium}
//                       onChange={handleInputChange}
//                       required
//                       className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="text-left">
//                     For current temperature and humidity, please choose your
//                     location
//                   </div>
//                   <div className=" space-x-2 space-y-2">
//                     <label className="text-sm">State:</label>
//                     <select
//                       name="state"
//                       value={inputs.state}
//                       onChange={handleInputChange}
//                       className="font-light sm:font-normal rounded-md pl-2 pr-8 bg-white border border-gray-400 focus:outline-none focus:border-blue-500"
//                     >
//                       {/* <option>Select State</option> */}
//                       {states.map((state, index) => (
//                         <option key={index} value={state.name}>
//                           {state.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className=" space-x-2 space-y-2">
//                     <label className="text-sm">City:</label>
//                     <select
//                       name="city"
//                       value={inputs.city}
//                       onChange={handleInputChange}
//                       className="font-light sm:font-normal rounded-md pl-2 pr-8 bg-white border border-gray-400 focus:outline-none focus:border-blue-500"
//                       disabled={
//                         !inputs.state || inputs.state === "Select State"
//                       }
//                     >
//                       {/* <option>Select City</option> */}
//                       {states
//                         .find((state) => state.name === inputs.state)
//                         ?.cities.map((city, index) => (
//                           <option key={index} value={city}>
//                             {city}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                   <div className="space-x-2 space-y-2 text-left">
//                     {loadingWeather && (
//                       <p>Loading temperature and humidity...</p>
//                     )}
//                     {weather.temperature &&
//                       weather.humidity &&
//                       !loadingWeather && (
//                         <div className="space-y-2">
//                           <p>
//                             Temperature:{" "}
//                             <span className=" font-normal text-orange-600">
//                               {(weather.temperature - 273.15).toFixed(2)}°C{" "}
//                             </span>
//                           </p>
//                           <p>
//                             Humidity:{" "}
//                             <span className=" font-normal text-orange-600">
//                               {weather.humidity.toFixed(2)}%{" "}
//                             </span>
//                           </p>
//                         </div>
//                       )}
//                   </div>

//                   <div className="space-x-2 space-y-2">
//                     <label className="text-sm">pH Level:</label>
//                     <input
//                       type="number"
//                       name="pH"
//                       placeholder="Enter the value (0-14)"
//                       value={inputs.pH}
//                       onChange={handleInputChange}
//                       required
//                       className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="space-x-2 space-y-2">
//                     <label className="text-sm">Rainfall (mm):</label>
//                     <input
//                       type="number"
//                       name="rainfall"
//                       placeholder="Enter the value in mm"
//                       value={inputs.rainfall}
//                       onChange={handleInputChange}
//                       required
//                       className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//                 {/* <button
//                   type="submit"
//                   className="bg-green-500 text-gray-900 text-lg ring-1 ring-gray-900 shadow-xl px-4 rounded-lg hover:text-white py-2"
//                 >
//                   Get Recommendations
//                 </button> */}
//                 <button
//                   type="submit"
//                   disabled={loadingRecommendation} // Disable the button when loading
//                   className={`bg-green-500 text-gray-900 text-lg ring-1 ring-gray-900 shadow-xl px-4 rounded-lg hover:text-white py-2 ${
//                     loadingRecommendation ? "cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loadingRecommendation ? "Getting Recommendations..." : "Get Recommendations"}
//                 </button>
//               </form>

//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Crop;

import React, { useState, useEffect } from "react";
import axios from "axios";
import states from "../../utils/state_city.js";
import { useNavigate } from "react-router-dom";

// 👉 Auto-switch API base URL (local vs deployed)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://your-deployed-backend.vercel.app"; // replace with your real deployment URL

const Crop = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    state: "",
    city: "",
    pH: "",
    rainfall: "",
  });

  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const [weather, setWeather] = useState({
    temperature: null,
    humidity: null,
  });

  // 🔹 Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // 🔹 Fetch weather whenever city changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (inputs.city) {
        try {
          setLoadingWeather(true);
          const response = await axios.get(
            `${API_BASE_URL}/api/get-weather?city=${inputs.city}`
          );

          const { temperature, humidity } = response.data;
          setWeather({ temperature, humidity });
        } catch (error) {
          console.error("❌ Error fetching weather:", error);
          setWeather({ temperature: null, humidity: null });
        } finally {
          setLoadingWeather(false);
        }
      }
    };

    fetchWeather();
  }, [inputs.city]);

  const { nitrogen, phosphorus, potassium, city, pH, rainfall } = inputs;
  const { temperature, humidity } = weather;

  // 🔹 Combine all request data
  const requestData = {
    nitrogen: Number(nitrogen),
    phosphorus: Number(phosphorus),
    potassium: Number(potassium),
    temperature: Number(temperature),
    humidity: Number(humidity),
    pH: Number(pH),
    rainfall: Number(rainfall),
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingRecommendation(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/crop-recommendation`,
        requestData
      );

      const recommendation = response.data;

      console.log("✅ Recommendation response:", recommendation);

      navigate("/crop-result", { state: { recommendation } });
    } catch (error) {
      console.error("❌ Error fetching recommendation:", error);
      alert("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoadingRecommendation(false);
    }
  };

  return (
    <div className="pt-16 md:pt-0">
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center lg:space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold pb-3 tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              Crop Recommendation
            </h2>
            <p className="max-w-[600px] text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
              Let us help you choose the best crops for your farm based on
              your location and soil conditions.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm space-y-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col font-bold sm:font-semibold items-center gap-8"
            >
              <div className="flex flex-col items-start ring-1 ring-orange-500 hover:ring-green-500 shadow-xl px-4 rounded-lg gap-4 py-4">
                {/* Inputs */}
                <InputField
                  label="Nitrogen:"
                  name="nitrogen"
                  placeholder="Enter the value of N"
                  value={inputs.nitrogen}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Phosphorus:"
                  name="phosphorus"
                  placeholder="Enter the value of P"
                  value={inputs.phosphorus}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Potassium:"
                  name="potassium"
                  placeholder="Enter the value of K"
                  value={inputs.potassium}
                  onChange={handleInputChange}
                />

                <div className="text-left">
                  For current temperature and humidity, please choose your
                  location
                </div>

                {/* State dropdown */}
                <Dropdown
                  label="State:"
                  name="state"
                  value={inputs.state}
                  onChange={handleInputChange}
                  options={states.map((state) => state.name)}
                />

                {/* City dropdown */}
                <Dropdown
                  label="City:"
                  name="city"
                  value={inputs.city}
                  onChange={handleInputChange}
                  options={
                    states.find((s) => s.name === inputs.state)?.cities || []
                  }
                  disabled={!inputs.state}
                />

                {/* Weather info */}
                <div className="space-x-2 space-y-2 text-left">
                  {loadingWeather && <p>Loading temperature and humidity...</p>}
                  {temperature && humidity && !loadingWeather && (
                    <div className="space-y-2">
                      <p>
                        Temperature:{" "}
                        <span className="font-normal text-orange-600">
                          {temperature}°C
                        </span>
                      </p>
                      <p>
                        Humidity:{" "}
                        <span className="font-normal text-orange-600">
                          {humidity}%
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <InputField
                  label="pH Level:"
                  name="pH"
                  placeholder="Enter the value (0-14)"
                  value={inputs.pH}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Rainfall (mm):"
                  name="rainfall"
                  placeholder="Enter the value in mm"
                  value={inputs.rainfall}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loadingRecommendation}
                className={`bg-green-500 text-gray-900 text-lg ring-1 ring-gray-900 shadow-xl px-4 rounded-lg hover:text-white py-2 ${
                  loadingRecommendation ? "cursor-not-allowed" : ""
                }`}
              >
                {loadingRecommendation
                  ? "Getting Recommendations..."
                  : "Get Recommendations"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// 🔹 Reusable Input component
const InputField = ({ label, name, placeholder, value, onChange }) => (
  <div className="space-x-2 space-y-2">
    <label className="text-sm">{label}</label>
    <input
      type="number"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="font-light sm:font-normal rounded-md pl-2 border border-gray-400 focus:outline-none focus:border-blue-500"
    />
  </div>
);

// 🔹 Reusable Dropdown component
const Dropdown = ({ label, name, value, onChange, options, disabled }) => (
  <div className="space-x-2 space-y-2">
    <label className="text-sm">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="font-light sm:font-normal rounded-md pl-2 pr-8 bg-white border border-gray-400 focus:outline-none focus:border-blue-500"
    >
      <option value="">Select</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Crop;
