import React from 'react';
import './scss/app.scss';
import Form from './components/Form';
import Pronostic from './components/Pronostic';
import { useResponse } from './components/useResponse';


function App() {
  const { dato, sendRequest, datotwo, loading, error, textInicio, background } = useResponse()
  return (
    <div className="App">
      <Form sendRequest={sendRequest} background={background} />
      <Pronostic currentClime={dato} pronostic={datotwo} loading={loading} error={error} textInicio={textInicio} background={background} />
    </div>
  );
}

export default App;
