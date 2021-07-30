import React, {useContext} from 'react';
import TestForm2 from './TestForm2';

interface IProps {}
interface IState {}

class TestForm2Container extends React.Component<IProps, IState> {

    public render() {
        return (
            <TestForm2>
                <h1>Child header</h1>
            </TestForm2>

        );
    }
}

export default TestForm2Container;
