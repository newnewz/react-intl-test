import React from 'react';
import './App.css';
import { FormattedMessage } from 'react-intl';


function App() {
  
   return (
    <div className="App">
      hello <FormattedMessage description="other part of hello world" defaultMessage='world'></FormattedMessage>
    </div>
  );
}

export default App;
