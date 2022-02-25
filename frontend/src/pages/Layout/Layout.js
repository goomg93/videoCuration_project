import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Category from '../List/ListComponent/Category';
import { gql, useQuery } from '@apollo/client';

const Layout = () => {
  const GET_LIST = gql`
    query GetList {
      videos {
        category
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LIST);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Error To Render</p>;
  }

  const categorys = [];
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
