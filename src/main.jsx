import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { DbProvider } from './context/DatabaseContext';
import { AuthProvider } from './context/AuthContext';

class Eb extends React.Component {
  constructor(p) {
    super(p);
    this.state = { err: false, erMsg: null, inf: null };
  }
  static getDerivedStateFromError(e) {
    return { err: true, erMsg: e };
  }
  componentDidCatch(e, i) {
    this.setState({ inf: i });
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: '2rem', background: '#202124', color: '#f87171', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ошибка:</h1>
          <pre style={{ background: '#323639', padding: '1rem', borderRadius: '0.5rem', color: '#f1f3f4' }}>
            {this.state.erMsg && this.state.erMsg.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Eb>
    <BrowserRouter>
      <DbProvider>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </DbProvider>
    </BrowserRouter>
  </Eb>
);
