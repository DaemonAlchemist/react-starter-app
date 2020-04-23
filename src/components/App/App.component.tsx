import * as React from 'react';
import { Route } from 'react-router';
import { ReduxContainer } from "simple-redux-container";
import { Home } from '../Home';
import './App.less';

const reducers = {};

export const App = (props:any) =>
  <ReduxContainer
    reducers={reducers}
    middleware={[]}
    useLocalStorage={false}
  >
    <div>
      <Route exact path="/" component={Home} />
    </div>
  </ReduxContainer>
;

export default App;
