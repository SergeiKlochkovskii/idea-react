import React from 'react';
import TestForm1Container from './TestForm1Container';
import TestForm2Container from './TestForm2Container';
import DataContext from '../store/data-context';
import ProfilePhotoContainer from './ProfilePhotoContainer';
import _ from 'lodash';
import {PatientAnsweredResults} from '../questionnaire/entities/Questionnaire';


interface IState {
    photoVisible?: boolean;
    dst: string;
}

interface IProps {
}

class TestContainer extends React.Component<IProps, IState> {
    state: IState = {
        dst: '',
    }

    componentDidMount() {
        let srs: PatientAnsweredResults[] = [
            // {
            //     'idAnswer': 100,
            //     'idAnswers': 46,
            //     'idQuestionInput': 771,
            //     'formField': 'R_771',
            //     'valueText': '',
            // },
            // {
            //     'idAnswers': 46,
            //     'idQuestionInput': 776,
            //     'formField': 'R_776',
            //     'valueText': '2',
            //     'dateCompleted': '2022-01-13T20:12:58.826Z',
            //     'dateCreation': '2022-01-13T20:12:58.826Z'
            // },
            // {
            //     'idAnswers': 46,
            //     'idQuestionInput': 780,
            //     'formField': 'F_780',
            //     'valueText': '1111',
            //     'dateCompleted': '2022-01-13T20:12:58.826Z',
            //     'dateCreation': '2022-01-13T20:12:58.826Z'
            // },
            // {
            //     'idAnswers': 46,
            //     'idQuestionInput': 781,
            //     'formField': 'F_781',
            //     'valueText': '2233',
            //     'dateCompleted': '2022-01-13T20:12:58.826Z',
            //     'dateCreation': '2022-01-13T20:12:58.826Z'
            // },
            // {
            //     'idAnswers': 46,
            //     'idQuestionInput': 782,
            //     'formField': 'R_782',
            //     'valueText': '3',
            //     'dateCompleted': '2022-01-13T20:12:58.826Z',
            //     'dateCreation': '2022-01-13T20:12:58.826Z'
            // }
        ];

        let dst: PatientAnsweredResults[] = [
            {
                'idAnswers': 46,
                'idQuestionInput': 771,
                'formField': 'R_771',
                'valueText': '2',
            },
            {
                'idAnswers': 46,
                'idQuestionInput': 776,
                'formField': 'R_776',
                'valueText': '2',
            },
            {
                'idAnswers': 46,
                'idQuestionInput': 780,
                'formField': 'F_780',
                'valueText': '1111',
            },
            {
                'idAnswers': 46,
                'idQuestionInput': 781,
                'formField': 'F_781',
                'valueText': '2233',
            },
            {
                'idAnswers': 46,
                'idQuestionInput': 7852,
                'formField': 'R_782',
                'valueText': '3',
            }
        ];

        let x = dst.map(v => v.idQuestionInput);

        let y = srs.filter(e => dst.map(v => v.idQuestionInput).indexOf(e.idQuestionInput) !== -1);
        let xx = _.unionBy(dst, y, 'formField');

        xx = _.unionBy(srs, dst, 'formField');

        let a: {id: number}[] = [{id: 1}, {id: 2}];

        const ac = a.filter(e => e.id > 1);

        ac[0].id = 88;
        for (let acKey in ac) {


        }


        // let a: number[] = [1,1,1,2,1,1];
        // let s: boolean = false;
        // let e: boolean = false;
        // let ns: number = 0;
        // let ne: number = 0;
        // for (let i = 0; i < a.length; i++) {
        //     if(a[i] === 1 && !s) {
        //         ns = i;
        //     }
        //
        //     if(a[i] !== 1 && s) {
        //         ne = i -1;
        //
        //         s = false;
        //         e = false;
        //         console.log('start: ', ns, ' end: ', ne);
        //     }
        //
        //
        // }


    }

    public render() {
        return (
            <DataContext.Provider value={{
                str: this.state.dst,
                handleClick: this.handleClick,
                pups: 'Klops',
            }}>
                <TestForm1Container/>
                <TestForm2Container/>

                <ProfilePhotoContainer
                    profilePhotoVisible={this.state.photoVisible}
                    onCloseProfilePhotoForm={this.onCloseProfilePhotoForm}
                />
            </DataContext.Provider>
        )
    }

    handleClick = (val: string, extra: string) => {

        const child = (<div>Bzzzz</div>);

        const element: JSX.Element = (<div>
            {child}

        </div>);


        //.value = (<div>YYYYYY</div>);


        let a: number[] = [1, 2, 1, 1, 2, 1, 1];
        let s: boolean = false;
        let e: boolean = false;
        let ns: number = -1;
        let ne: number = -1;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === 1 && !s) {
                ns = i;
                s = true;
            }

            if (s && (a[i] !== 1)) {
                ne = i - 1;
                e = true;
            } else if (s && i === a.length - 1) {
                ne = i;
                e = true;
            }

            if (s && e) {
                console.log('start: ', ns, ' end: ', ne);
                s = false;
                e = false;
            }

            if (a[i] !== 1) {
                console.log('pos: ', i, ', element: ', a[i]);
            }


        }

        // this.setState({photoVisible: true});
        this.setState({dst: val + extra});
    }

    onCloseProfilePhotoForm = () => {
        this.setState({photoVisible: false})
    }

}

export default TestContainer;