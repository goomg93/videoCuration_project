import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Category.module.css';

function Category({ categorys }) {
  const navigate = useNavigate();

  const navigateHandler = data => {
    navigate(`/${data}`);
  };

  return (
    <section className={styles.Category}>
      {categorys.map((data, index) => (
        <span
          className={styles.CategoryName}
          onClick={() => navigateHandler(data)}
          key={index}
        >
          #{data}
        </span>
      ))}
    </section>
  );
}

export default Category;
