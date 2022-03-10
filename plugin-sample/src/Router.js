import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from './pages/List/List';
import Detail from './pages/Detail/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="*" element={<List />} />
        <Route path="/video/:type/" element={<Detail />}>
          <Route path=":videoId" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
