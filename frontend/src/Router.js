import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout/Layout';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import DetailReact from './pages/DetailReact/DetailReact';
import DetailLayer from './pages/DetailLayer/DetailLayer';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/video/:videoId" element={<Detail />} />
          <Route path="/react/:videoId" element={<DetailReact />} />
          <Route path="/player/:videoId" element={<DetailLayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
