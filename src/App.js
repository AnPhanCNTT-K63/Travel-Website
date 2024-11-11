import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />
        <Navigation />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
