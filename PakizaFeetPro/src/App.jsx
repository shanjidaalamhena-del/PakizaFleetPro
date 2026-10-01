import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ForgotPage from "./Pages/ForgotPage";
import ResetPassPage from "./Pages/ResetPassPage";
import NewResetPage from "./Pages/NewResetPage";

import LandingPage from "./Pages/LandingPage";
import CreateRequisition from "./Pages/CreateRequisition";
import Dashboard from "./Component/Landing/Dashboard";
import MyRequestPage from "./Pages/MyRequestPage";
import TrackingPage from "./Pages/TrackingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPage />} />

        <Route path="/reset-password" element={<ResetPassPage />} />

        <Route path="/new-reset-password" element={<NewResetPage />} />

        <Route path="/landing" element={<LandingPage />}>
          <Route index element={<Dashboard />} />
          <Route path="requisition/create" element={<CreateRequisition />} />
  <Route path="requisition/my-requests" element={<MyRequestPage />} />
       
        
       <Route path="/landing/tracking" element={<TrackingPage/>} /> 
      
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;