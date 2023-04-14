import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import messages from './compiled-lang/en-US.json';
import { IntlProvider } from 'react-intl';

const locale = 'en-US';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(messages);
root.render(
  <React.StrictMode>
    <IntlProvider locale={locale} defaultLocale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
