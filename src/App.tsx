import React from 'react';
import './App.css';
import TestContainer from './comp/TestContainer';
import { Route, BrowserRouter, Switch, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import QuestionnaireFormContainer from './questionnaire/QuestionnaireFormContainer';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path='/questionnaire/:id'>
                        <QuestionnaireFormContainer/>
                    </Route>

                    <Route path='/'>
                        <TestContainer/>

                    </Route>

                </Switch>
            </BrowserRouter>

            {/*<TestContainer/>*/}
        </div>
    )
        ;
}

export default App;
