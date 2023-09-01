
import React from "react";
import { LandingPage, CompaniesPage, FavouritesPage, JobsPage, MyApplicationsPage, LoginPage, ProfilePage, CompanyDetailsPage, JobDetailsPage, UsersPage, SignUpPage, MyJobsPage, ProfilePageCompany, UserDetailsPage, CompaniesPageAdmin } from "./pages";
import { NavBar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoute";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  const role = localStorage.getItem('role')

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="companies" element={<ProtectedRoute type='all'><CompaniesPage /></ProtectedRoute>} />
            <Route exact path="favourites" element={<ProtectedRoute type='user'><FavouritesPage /></ProtectedRoute>} />
            <Route exact path="/jobs" element={<ProtectedRoute type='companyAndUser'><JobsPage /></ProtectedRoute>} />
            <Route exact path="/myJobs" element={<ProtectedRoute type='company'><MyJobsPage /></ProtectedRoute>} />
            <Route exact path="myapplications" element={<ProtectedRoute type='companyAndUser'><MyApplicationsPage /></ProtectedRoute>} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
            <Route exact path="/myprofile" element={<ProtectedRoute type='all'>{role === 'company' ? <ProfilePageCompany /> : <ProfilePage />}</ProtectedRoute>} />
            <Route exact path="/studentsTable" element={<ProtectedRoute type='admin'><UsersPage /></ProtectedRoute>} />
            <Route exact path="/companiesTable" element={<ProtectedRoute type='admin'><CompaniesPageAdmin /></ProtectedRoute>} />
            <Route path="companies/:companyId" element={<ProtectedRoute type='all'><CompanyDetailsPage /></ProtectedRoute>} />
            <Route path="users/:userId" element={<ProtectedRoute type='all'><UserDetailsPage /></ProtectedRoute>} />
            <Route path="jobs/:jobId" element={<ProtectedRoute type='all'><JobDetailsPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;