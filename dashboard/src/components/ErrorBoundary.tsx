import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("ZRYL UI crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300 px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-lg font-bold text-red-400">
              Something went wrong
            </h1>
            <p className="text-sm text-zinc-400">
              Zryl UI crashed, but your data is safe.
            </p>
            <pre className="text-xs text-zinc-600 max-w-md overflow-auto">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => location.reload()}
              className="px-4 py-2 bg-white text-black rounded text-xs font-bold"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}