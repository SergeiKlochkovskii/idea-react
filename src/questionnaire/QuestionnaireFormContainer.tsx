import React from 'react';

import 'antd/dist/antd.css';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';
import {
    questionnaireSelected,
    QuestionnaireData,
    questionnaireQuestionGroups,
    questionnaireQuestions, questionInputs, questionInputValues
} from './entities/Questionnaire';
import {js21, jsDatamini, jsDatamini1, jsEd} from '../data/qData';


interface IProps {

}

export interface IState {

    questionnaireData: QuestionnaireData;
    loaded: boolean;

}

class QuestionnaireFormContainer extends React.Component<RouteComponentProps<{ id: string }> & IProps, IState> {

    public idQuestionnaire: string = this.props.match.params.id;
    state: IState = {
        loaded: false,

        questionnaireData: {
            questionnaire: {
                idQuestionnaire: 0,
                idOrganization: 0,
                nameQuestionnaire: '',
                descQuestionnaire: '',
                descDisclaimer: ',',
            },
            questionnaireQuestionGroups: [],
            questionnaireQuestions: [],
            questionInputs: [],
            questionInputValues: []
        }


    };

    componentDidMount() {
        this.loadData();
    }

    render() {

        return (
            this.state.loaded ?
                    <QuestionnaireForm
                        questionnaireData={this.state.questionnaireData}


                    />

                : <></>


        );

    }

    loadData = () => {

        // this.setState({questionnaireData: js21, loaded: true});
        // let app: any;
        // let s = {a: 1, b: 2};
        //
        // for (const [book, price] of Object.entries(s)) {
        //         console.log(book, '  ', price);
        // }



        // Rest<{ type: string, idQuestionnaire: number }, QuestionnaireData>()
        //     .operation({type: 'GetQuestionnaireSelected', idQuestionnaire: parseInt(this.idQuestionnaire, 10)})
        //     .then((response: QuestionnaireData) => {
        //         this.setState({questionnaireData: response, loaded: true});
        //     });
    }

}

export default (withRouter(QuestionnaireFormContainer));