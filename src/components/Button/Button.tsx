import React from 'react';
import styles from './Button.module.css';

type Props = {
  onClick(): void;
};

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};
