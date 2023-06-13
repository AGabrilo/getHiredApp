
import React from "react";
import { LandingPage, CompaniesPage, FavouritesPage, JobsPage, MyApplicationsPage, LoginPage } from "./pages";
import { NavBar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
    <NavBar/> 
        <Routes>
          <Route  exact path="/" element={<LandingPage />}/>
            <Route exact path="companies" element={<CompaniesPage />} />
            <Route exact path="favourites" element={<FavouritesPage />} />
            <Route  exact path="/jobs" element={<JobsPage />} />
            <Route exact path="myapplications" element={<MyApplicationsPage />} />
            <Route  exact path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter> 
    </div>

  );
}

export default App;
