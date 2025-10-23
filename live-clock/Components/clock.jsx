import  { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const currentTime = () => setTime(new Date());
    const intervalId = setInterval(currentTime, 1000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  return (
    <div style={styles.container}>
      <p style={styles.time}>{formatTime(time)}</p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'monospace',
    textAlign: 'center',
    padding: '2rem',
    background: '#1e1e2f',
    color: '#00ffcc',
    borderRadius: '12px',
    width: 'fit-content',
    margin: '2rem auto',
    boxShadow: '0 0 20px rgba(0,255,204,0.3)',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '2rem',
  },
  time: {
    fontSize: '3rem',
    letterSpacing: '2px',
    fontWeight: 'bold',
  },
};

export default LiveClock;