import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout/Layout';
import List from './pages/List/List';
import Sub from './pages/ListVertical/Sub';
import DetailLive from './pages/DetailLive/DetailLive';
import Detail from './pages/Detail/Detail';
import SortList from './pages/List/ListComponent/SortList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/verticalscroll" element={<Sub />} />
          <Route path="/:category" element={<SortList />} />
          <Route path="/playlist" element={<DetailLive />} />
          <Route path="/:type/:videoId" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
