
import React from "react";
import { LandingPage, CompaniesPage, FavouritesPage, JobsPage, MyApplicationsPage, LoginPage, ProfilePage, CompanyDetailsPage, JobDetailsPage } from "./pages";
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
            <Route  exact path="/myprofile" element={<ProfilePage />} />
            <Route path="companies/:companyId" element={<CompanyDetailsPage/>} />
            <Route path="jobs/:jobId" element={<JobDetailsPage/>} />
        </Routes>
      </BrowserRouter> 
    </div>

  );
}

export default App;
