import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ClientRoutes from '@components/ClientRoutes';
import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const App = ({ theme }) => {
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <div className={classes[theme]}>
      <ThemeProvider theme={muiTheme}>
        <ClientRoutes />
      </ThemeProvider>
    </div>
  );
};

App.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

export default connect(mapStateToProps)(App);
