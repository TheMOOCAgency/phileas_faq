/*import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewApp from './NewApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5cb7d8',
        },
        secondary: orange,
    },
    background: "#5cb7d8"
});

/* Début du rendu *********************************************** */
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <NewApp data={window.props} lang={window.lang}/>
    </ThemeProvider>
    ,document.getElementById('root')
);
