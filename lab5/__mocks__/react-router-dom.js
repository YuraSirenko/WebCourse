const React = require('react');

function BrowserRouter({ children }) {
  return children;
}

function Link({ to, children, ...rest }) {
  return React.createElement('a', { href: to, ...rest }, children);
}

function Navigate({ to, children }) {
  return React.createElement(React.Fragment, null, children);
}

function useNavigate() {
  return () => {};
}

function useParams() {
  return {};
}

function MemoryRouter({ children }) {
  return children;
}

function Routes({ children }) {
  return children;
}

function Route({ element }) {
  return element;
}

exports.__esModule = true;
exports.BrowserRouter = BrowserRouter;
exports.Link = Link;
exports.Navigate = Navigate;
exports.useNavigate = useNavigate;
exports.useParams = useParams;
exports.MemoryRouter = MemoryRouter;
exports.Routes = Routes;
exports.Route = Route;
