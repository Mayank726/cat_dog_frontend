import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Image select hone par preview dikhana
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(""); // purana result hatao
  };

  // Predict button pe click hone par
  const handlePredict = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      setResult("Predicting...");

      // 👇 Backend Render URL
      const res = await axios.post(
        "https://cat-dog-classifier-bi8r.onrender.com/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(`It's a ${res.data.prediction}! 🐾`);
    } catch (err) {
      console.error(err);
      setResult("Prediction failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h1>🐱🐶 Cat vs Dog Classifier</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ margin: "20px 0" }}
      />

      {preview && (
        <div>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              marginBottom: "20px",
            }}
          />
        </div>
      )}

      <div>
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </div>

      {result && (
        <h2
          style={{
            marginTop: "30px",
            color:
              result.includes("Cat") || result.includes("cat")
                ? "blue"
                : result.includes("Dog") || result.includes("dog")
                ? "brown"
                : "red",
          }}
        >
          {result}
        </h2>
      )}
    </div>
  );
}

export default App;

