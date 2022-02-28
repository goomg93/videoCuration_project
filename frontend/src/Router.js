import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout/Layout';
import List from './pages/List/List';
import Sub from './pages/ListVertical/Sub';
import Detail from './pages/Detail/Detail';
import DetailLayer from './pages/DetailLayer/DetailLayer';
import SortList from './pages/List/ListComponent/SortList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/verticalscroll" element={<Sub />} />
          <Route path="/:category" element={<SortList />} />
          <Route path="/video/:videoId" element={<Detail />} />
          <Route path="/player/:videoId" element={<DetailLayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
