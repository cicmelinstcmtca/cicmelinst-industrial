import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.sectionName ? ` - ${this.props.sectionName}` : ''}]:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[200px] bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl m-4 p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-alarm-red)]/5 border border-[var(--color-alarm-red)]/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-alarm-red)" strokeWidth="1.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
              Error en {this.props.sectionName || 'esta sección'}
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 max-w-xs mx-auto">
              Ocurrió un problema al cargar esta sección.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-pipe-blue)] text-white rounded-xl hover:bg-[var(--color-pipe-blue-glow)] transition-all active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
