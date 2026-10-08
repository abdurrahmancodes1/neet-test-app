import React from 'react';
import { AlertTriangle, RefreshCw, LogOut, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetSession = () => {
    try {
      window.localStorage.removeItem('neet_active_test_id');
      window.localStorage.removeItem('neet_current_user_v1');
    } catch {}
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#05070B] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-rose-600/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#180A0E] via-[#0F070A] to-[#070A12] p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shadow-glow">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-1 text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                Application Recovery
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Something encountered an issue
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                The application detected an unexpected state while loading the interface. You can easily reload or reset to the sign-in screen below.
              </p>
            </div>

            {this.state.error && (
              <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3 text-left">
                <p className="font-mono text-[11px] text-rose-300 break-all">
                  {String(this.state.error?.message || this.state.error)}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetSession}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs font-bold text-slate-300 hover:text-white transition active:scale-95"
              >
                <LogOut size={14} />
                <span>Go to Sign In / Register</span>
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
