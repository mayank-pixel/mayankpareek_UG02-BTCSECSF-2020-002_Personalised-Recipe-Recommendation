import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <>
      <div class="main">
        <h1>Heading</h1>

        <div>
          <h2>Whats your preference ?</h2>
          <p>Veg or Non-Veg!</p>
          <input type="radio" value="veg" />
          <label >Veg</label>
          <input type="radio" value="non veg" />
          <label >Non-Veg </label>
        </div>

        <div>
          <h2>Whats your cuisine ?</h2>
          <p>Choose Your One!</p>
          <select>
            <option value="Healthy Food">Healthy Food</option>
            <option value="Indian">Indian</option>
          </select>
        </div>

        <div>
          <h2>Whats ingredients do you have ?</h2>
          <p>Choose Your Ingredients from the list!</p>
          <select>
            <option value="Healthy Food">Healthy Food</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
      </div>

    </>
  );
}

export default App;