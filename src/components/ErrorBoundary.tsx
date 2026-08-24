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
        <div className="flex items-center justify-center min-h-[200px] bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-lg m-4 p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-2">
              Error en {this.props.sectionName || 'esta sección'}
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              La sección no pudo cargarse correctamente.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-[var(--color-pipe-blue)] text-[var(--color-bg-control)] rounded hover:opacity-80 transition-opacity text-sm font-mono"
            >
              REINTENTAR
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
