export interface questionnaireSelected {
    idQuestionnaire: number;
    idOrganization: number;
    nameQuestionnaire: string;
    descQuestionnaire: string;
    descDisclaimer: string;
    dateCreation?: Date;
}

export interface questionnaireQuestionGroups {
    idQuestionGroup: number;
    idQuestionnaire: number;
    nameGroup: string;
    valueOrder: number;
    valueEstimatedTime: number;
    dateCreation: Date;
}

export interface questionnaireQuestions {
    idQuestion: number;
    idQuestionGroup: number;
    valueOrder: number;
    nameQuestion: string;
    dateCreation: Date;
}


export interface questionInputs {
    idQuestionInput: number;
    idQuestion: number;
    typeInput: number;
    nameLabel: string;
    typeDisplay: number;
    valueOrder: number;
    valueSize: number;
    flagMandatory: number;
    idInputValueMandatory: number;
    idInputValueOptional: number;
    dateCreation: Date;
}

export interface questionInputValues {
    idInputValue: number;
    idQuestionInput: number;
    nameValue: string;
    valueOrder: number;
    dateCreation: Date;
}

export interface QuestionnaireResult {
    idResult: number;
    idQuestionnaire: number;
    idPatient: number;
    typeStatus: number;
    dateStarted: Date;
    dateCompleted?: Date;
    dateCreation: Date;
}

export interface QuestionnaireResultData {
    idResultData?: number;
    idResult: number;
    step: number;
    valueText: string;
}



export interface QuestionnaireData {

    questionnaire: questionnaireSelected;
    questionnaireQuestionGroups: questionnaireQuestionGroups[];
    questionnaireQuestions: questionnaireQuestions[];
    questionInputs: questionInputs[];
    questionInputValues: questionInputValues[];
    questionnaireResult?: QuestionnaireResult;
    questionnaireResultData?: QuestionnaireResultData[];

    ///////////////////////////////////
    questionnaireAnswered?: OaQuestionnaireAnswered;
    patientAnsweredResults?: PatientAnsweredResults[];

}

//////////////////////////////////////////////////////
export interface OaQuestionnaireAnswered {
    idAnswers: number;
    idQuestionnaire: number;
    idPatient: number;
    typeStatus: number;
    dateStarted: Date;
    dateCompleted: Date;
    dateCreation: Date;
}

export interface PatientAnsweredResults {
    idAnswer?: number;
    idAnswers?: number;
    idQuestionInput?: number;
    formField?: string;
    valueText?: string | any;
    idInputValue?: number;
    dateCompleted?: Date;
    dateCreation?: Date;
}
