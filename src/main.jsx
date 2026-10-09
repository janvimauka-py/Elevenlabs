import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('VoxAI React ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#07152d',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '560px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: '#38bdf8' }}>
              VoxAI Dubbing Studio
            </h1>
            <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '20px' }}>
              Something interrupted the studio rendering. Don't worry, your work is safe.
            </p>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '12px',
              color: '#f87171',
              fontFamily: 'monospace',
              textAlign: 'left',
              marginBottom: '24px',
              overflowX: 'auto'
            }}>
              {this.state.error?.message || 'Unknown runtime error'}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('voxai_narration_history');
                window.location.reload();
              }}
              style={{
                backgroundColor: '#38bdf8',
                color: '#082f49',
                border: 'none',
                fontWeight: '700',
                padding: '12px 28px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reset & Reload Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
