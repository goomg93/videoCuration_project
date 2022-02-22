import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/List/List';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
