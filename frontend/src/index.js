import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { fetchConfiguration } from './redux/configurationSlice';
import { fetchJob } from './redux/jobsSlice';
import { fetchUsers } from './redux/userSlice';

//start loading initial conf list
store.dispatch(fetchConfiguration())
store.dispatch(fetchJob())
store.dispatch(fetchUsers())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>

  </StyledEngineProvider>,
);


