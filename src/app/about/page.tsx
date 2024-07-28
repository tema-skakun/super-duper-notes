import React from 'react';
import styles from './About.module.css';

const AboutPage = async () => {
  const appInfo = 'This is a note-taking application built with Next.js.';
  const creatorInfo = 'The application was created by Artem Skakun.';
  const clientInfo = 'The application was commissioned by Drafter LLC.';

  return (
    <div className={styles.about}>
      <h1>About This Application</h1>
      <p>{appInfo}</p>
      <h2>Creator</h2>
      <p>{creatorInfo}</p>
      <h2>Client</h2>
      <p>{clientInfo}</p>
    </div>
  );
};

export default AboutPage;
