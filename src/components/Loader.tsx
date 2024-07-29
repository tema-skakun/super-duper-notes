import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css'

const Loader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
