import React, { useState } from 'react';

const BulkContent = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSend = () => {
    if (recipients && subject && message) {
      setSuccess(true);
      // Here you can integrate your API call to send the bulk email.
      setTimeout(() => setSuccess(false), 4000); // Automatically hide success message
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📧 Bulk Email Sender</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Recipients (comma-separated emails)</label>
        <textarea
          placeholder="example1@gmail.com, example2@yahoo.com"
          style={styles.textarea}
          rows="2"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Subject</label>
        <input
          type="text"
          placeholder="Enter your email subject"
          style={styles.input}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Message</label>
        <textarea
          placeholder="Write your message here"
          style={styles.textarea}
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleSend}>
          Send Bulk Email 📤
        </button>
      </div>

      {success && (
        <div style={styles.successMessage}>
          ✅ Bulk email sent successfully!
        </div>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  successMessage: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default BulkContent;
