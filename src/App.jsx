import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.prediction);
  };

  return (
    <div className="App">
      <h1>🐾 Cat vs Dog Classifier 🐾</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" className="preview" />}

      <button onClick={handleSubmit}>Predict</button>

      {result && (
        <h2 className="result">
          Prediction: <span>{result}</span>
        </h2>
      )}
    </div>
  );
}

export default App;
