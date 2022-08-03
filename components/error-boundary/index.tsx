import { Component, PropsWithChildren } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type ErrorBoundaryPropsType = PropsWithChildren<{
  navigator: NavigateFunction;
}>;

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  ErrorBoundaryPropsType,
  IErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <div style={{ width: 400, padding: 16, textAlign: 'center' }}>
        <p>bviewer has something wrong.</p>
        <button className='basic-btn' onClick={() => this.props.navigator('/')}>
          返回主页
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}

const ErrorBoundaryWithRouter =
  (ClassComponent: typeof ErrorBoundary) =>
  (props: Pick<ErrorBoundaryPropsType, 'children'>) =>
    <ClassComponent navigator={useNavigate()}>{props.children}</ClassComponent>;

export default ErrorBoundaryWithRouter(ErrorBoundary);
