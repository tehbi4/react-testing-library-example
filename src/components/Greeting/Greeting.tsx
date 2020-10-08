import React from 'react';
import styles from './Greeting.module.css';

type Props = {
  userName?: string;
};

export const Greeting: React.FC<Props> = ({ userName = 'unknown user' }) => {
  return <div data-testid="greeting" className={styles.Greeting}>Hello, {userName}!</div>;
};
