import { Component } from "react";
import Btn from "./Btn";
import PropTypes from "prop-types";
class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="main main--error-boundary">
          <section className="error-boundary">
            <h2 className="heading-secondary heading--error-boundary">
              Oops! Something went wrong.
            </h2>
            <p className="heading-p heading--error-boundary">
              {this.state.errorMessage}
            </p>
            <div className="btn-container">
              <button
                className="button"
                onClick={() => window.location.reload()}
              >
                <Btn content="Try Again" />
              </button>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
