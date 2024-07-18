import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/LoginSignUp';
import Campus from './components/Campus';
function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
       <Route path="/Campus" element={<Campus/>} />
      </Routes>
  );
}
export default App;







