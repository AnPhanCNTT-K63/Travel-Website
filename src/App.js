import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header />
          <Navbar />
          <Navigation />
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
