// Manual mock for react-router-dom to simplify testing
const React = require('react');

module.exports = {
  __esModule: true,
  BrowserRouter: ({ children }) => children,
  MemoryRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Link: ({ to, children, ...rest }) => React.createElement('a', { href: to, ...rest }, children),
  Navigate: ({ to, children }) => React.createElement(React.Fragment, null, children),
  useNavigate: () => () => {},
  useParams: () => ({}),
};
