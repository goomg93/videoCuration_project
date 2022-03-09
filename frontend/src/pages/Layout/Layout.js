import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Category from '../List/ListComponent/Category';
import dataFetch from '../../hooks/useDataFetch';

const Layout = () => {
  const { loading, error, data } = dataFetch.useCategoryFetch();
  const categorys = [];

  if (loading) return loading;
  if (error) return error;

  if (data?.videos.length > 0) {
    for (let i = 0; i < data.videos.length; i++) {
      for (let j = 0; j < data.videos[i].category.length; j++) {
        categorys.push(data.videos[i].category[j]);
      }
    }
  }

  const checker = [...new Set(categorys)];

  return (
    <>
      <Header />
      <Category categorys={checker} />
      <Outlet />
    </>
  );
};

export default Layout;
