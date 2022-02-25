import React from 'react';
import styles from './Category.module.css';

function Category({ categorys }) {
  console.log('category: ', typeof [categorys]);
  return (
    <section className={styles.Category}>
      {categorys.map((data, index) => (
        <span className={styles.CategoryName} key={index}>
          #{data}
        </span>
      ))}
    </section>
  );
}

export default Category;
