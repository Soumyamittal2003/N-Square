//import React from 'react';
import BulkContent from './BulkContent';

const Bulk = () => {
  return (
    <div style={styles.container}>
      <div style={styles.paper}>
        <h2 style={styles.header}>📧 Bulk Email Sender</h2>
        <p style={styles.description}>
          Easily send bulk emails to your recipients with a single click.
        </p>
        <BulkContent />
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  paper: {
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
};

export default Bulk;
