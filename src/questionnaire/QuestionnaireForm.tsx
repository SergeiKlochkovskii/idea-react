import React, {createRef, useEffect, useRef, useState} from 'react';
import {questionInputs, questionInputValues, QuestionnaireData} from './entities/Questionnaire';
import {Button, Col, Form, Input, Radio, Row} from 'antd';
import {Steps} from 'antd';
import {FormInstance} from 'antd/lib/form';
import ReactDOM from 'react-dom';


const QuestionnaireForm = (
    props: {
        questionnaireData: QuestionnaireData;
    }
) => {


    const [currentStep, setCurrentStep] = useState<number>(0);
    let formVisibility;

    const totalSteps = props.questionnaireData.questionnaireQuestionGroups.length

    const [form] = Form.useForm();

    const initialValues = {};

    const {Step} = Steps;

    const typeRadio = 1;
    const typeText = 2;
    // 1: block, 2: inline
    const displayBlock = 1;
    const displayInline = 2;
    const displayBlockBegin = 3;
    const displayBlockEnd = 4;

    // 1: Small, 2: Medium, 3: Large
    const sizeSmall = 1;
    const sizeMedium = 2;
    const sizeLarge = 3;

    type BlockRange = {
        blockStart: number;
        blockEnd: number;
    }

    type CreatedElement = {
        createdControls: JSX.Element;
        currentIndex: number;
        elementType: number;
    }

    type Elements = {
        controls: questionInputs[];
        currentIndex: number;
    }

    const divRef = createRef<HTMLDivElement>();
    const radioGroupwinRef = createRef<HTMLDivElement>();
    const rowRef = createRef<HTMLDivElement>();



    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const getSizeRatio = (selectedControls: questionInputs[], idxStart: number): number => {
        let displayType = selectedControls[idxStart].typeDisplay;
        let i: number = idxStart;
        let elementsCount: number = 0;
        let radioCount: number = 0;
        while (i < selectedControls.length) {
            if (selectedControls[i].typeDisplay !== displayType) {
                break;
            }
            if (selectedControls[i].typeInput === typeRadio) {
                elementsCount = elementsCount + selectedControls[i].valueSize / 2;
            } else {
                elementsCount = elementsCount + selectedControls[i].valueSize;
            }

            i++;
        }

        let k = 24 / elementsCount;


        return k;

    }

    const getColSpan = (selectedControls: questionInputs, controlsSizeRatio: number): number => {
        let result: number = controlsSizeRatio * selectedControls.valueSize;
        result = Math.min(selectedControls.valueSize * 4, result)

        return result;

    }


    const ProcessQuestionControls = (questionId: number) => {
        const selectedControls = props.questionnaireData.questionInputs.filter(e => e.idQuestion === questionId);
        const controlLength = selectedControls.length;
        let controlIndex = 0;
        const GroupControls: JSX.Element[] = [];
        const rowGutter = 24;


        while (controlIndex < controlLength) {

            let controls = createControl(selectedControls, controlIndex);
            //Block?
            switch (selectedControls[controlIndex].typeDisplay) {
                case displayBlock: // 1 control in block
                    GroupControls.push(
                        <Row>
                            <Col span={selectedControls[controlIndex].valueSize * 8}>
                                <Form.Item
                                    label={(controls.elementType !== typeRadio) ? selectedControls[controlIndex].nameLabel : null}
                                    name={'E_' + questionId + '_' + controlIndex}>
                                    {controls.createdControls}
                                </Form.Item>
                            </Col>
                        </Row>
                    );
                    controlIndex = controls.currentIndex;
                    break;
                case displayBlockBegin:
                    let blockControls: JSX.Element[] = [];

                    blockControls.push(
                        <Col>
                            <Form.Item

                                label={(controls.elementType !== typeRadio) ? selectedControls[controlIndex].nameLabel : null}
                                name={'E_' + questionId + '_' + controlIndex}>
                                {controls.createdControls}
                            </Form.Item>
                        </Col>
                    );

                    controlIndex = controls.currentIndex;
                    controlIndex++;

                    while (controlIndex < controlLength) {
                        if (selectedControls[controlIndex].typeInput === displayBlockEnd)
                            break;

                        blockControls.push(
                            <Col>
                                <Form.Item
                                    label={(controls.elementType !== typeRadio) ? selectedControls[controlIndex].nameLabel : null}
                                    name={'E_' + questionId + '_' + controlIndex}>
                                    {controls.createdControls}
                                </Form.Item>
                            </Col>
                        );
                        controlIndex++;
                    }

                    GroupControls.push(
                        <Row gutter={rowGutter} justify={'space-between'}
                             style={{marginLeft: '0.5rem', marginRight: '0.5rem'}}>
                            {blockControls}
                        </Row>
                    );

                    break;
                case displayInline:  //Inline
                    // Collect all inline controls in one row
                    let inlineControls: JSX.Element[] = [];
                    let controlsSizeRatio = getSizeRatio(selectedControls, controlIndex);

                    controlIndex = controls.currentIndex;

                    while (true) {
                        let colSpan: number = 8;
                        if (controls.elementType !== typeRadio)
                            colSpan = getColSpan(selectedControls[controlIndex], controlsSizeRatio);


                        let formItem = (<Form.Item
                                label={(controls.elementType !== typeRadio) ? selectedControls[controlIndex].nameLabel : null}
                                name={controls.elementType !== typeRadio? 'R_': 'E_' + questionId + '_' + controlIndex}
                                style={{marginBottom: 'auto'}}
                            >
                                {controls.createdControls}
                            </Form.Item>
                        );

                        if (controls.elementType === typeRadio) {
                            inlineControls.push(
                                <Col>
                                    {formItem}
                                </Col>
                            );

                            // console.log("************Radio: ", selectedControls[controlIndex].nameLabel, '\nElement:', radioGroupwinRef);

                        } else {
                            inlineControls.push(
                                <Col >
                                    {formItem}
                                </Col>)
                        }


                        controlIndex++;
                        if (controlIndex >= controlLength || selectedControls[controlIndex].typeDisplay !== displayInline) {
                            break;
                        }

                        controls = createControl(selectedControls, controlIndex);

                    }

                    //style={{margin: '0.5rem', marginRight: '0.5rem', borderStyle: 'groove', borderWidth: '1px', borderColor: 'rgb(250, 250, 250, 0.25)'}}
                    GroupControls.push(
                        <Row gutter={rowGutter}
                            // justify={'space-around'}
                        >
                            {inlineControls}
                        </Row>
                    );


                    // const measureLayer = document.getElementById('xyz');
                    // if (measureLayer) {
                    //     const renderedElement = ReactDOM.createPortal(rowRef, measureLayer!);
                    //
                    //
                    //     console.log('Render: ', rowRef.current);
                    //     ReactDOM.unmountComponentAtNode(measureLayer!);
                    // }


                    controlIndex--;
                    break;
                default:
                    break;
            }

            controlIndex++;
        }

        return (<>{GroupControls}</>);

    }

    const createControl = (controls: questionInputs[], idx: number) => {
        let result: CreatedElement = {createdControls: (<></>), currentIndex: idx, elementType: 0};
        switch (controls[idx].typeInput) {
            case typeRadio:
                result = (createRadioGroup(controls, idx));
                break;
            case typeText:
                result = createInput(controls, idx);
                break;
            default:
                break;
        }

        return result;
    }

    const createRadioGroup = (controls: questionInputs[], idx: number): CreatedElement => {
        let radioItems: JSX.Element[] = [];
        let result: CreatedElement;
        while (idx < controls.length) {
            if (controls[idx].typeInput !== typeRadio)
                break;

            let i = idx;
            const defaultValue: questionInputValues = props.questionnaireData.questionInputValues.filter(e => e.idQuestionInput === controls[i].idQuestionInput)[0];
            radioItems.push(
                <Radio value={defaultValue.nameValue} key={defaultValue.idQuestionInput}
                >
                    {controls[idx].nameLabel}
                </Radio>
            );

            idx++;
        }

        let radioItemGroup: JSX.Element = (
            <Radio.Group name={'RG_' + controls[idx - 1].idQuestion.toString() }

            >
                {radioItems}
            </Radio.Group>
        )

        result = {createdControls: radioItemGroup, currentIndex: idx - 1, elementType: typeRadio};
        return result;
    }

    const createInput = (controls: questionInputs[], idx: number): CreatedElement => {
        const defaultValue: questionInputValues = props.questionnaireData.questionInputValues.filter(e => e.idQuestionInput === controls[idx].idQuestionInput)[0];
        const result: CreatedElement = {
            createdControls: (<Input
                defaultValue={defaultValue.nameValue}
                size={'large'}/>),
            currentIndex: idx,
            elementType: typeText
        };
        return result;
    }


    const Questions = () => {
        const questionList = props.questionnaireData
            .questionnaireQuestions
            .filter((e) => e.idQuestionGroup === props.questionnaireData.questionnaireQuestionGroups[currentStep].idQuestionGroup)
            .map((e) =>
                <div
                    style={{
                        marginLeft: '0.5rem',
                        marginTop: '1rem',
                        fontSize: '16px',
                        color: 'darkblue',
                        textAlign: 'left'
                    }}
                >
                    <b>{e.nameQuestion}</b>
                    {ProcessQuestionControls(e.idQuestion)}
                </div>
            );

        return (<> {questionList} </>);

    }

    const QSteps = () => {
        const stepList = props.questionnaireData.questionnaireQuestionGroups.map(e =>
            <Step
                key={e.idQuestionGroup}
                title={e.nameGroup} description={`${e.valueEstimatedTime.toString(10)} segundos`}/>
        );

        return (
            <Steps current={currentStep} labelPlacement={'vertical'}>
                {stepList}
            </Steps>
        );

    }

    useEffect(() => {
            console.log(rowRef);
            formVisibility= 'visible';
        }
        ,[rowRef, radioGroupwinRef]
    )

    const getTheStructure = (ref: any) => {

        const rCopy = ref;

        console.log(ref);
        return null;

    }



    return (



        <div  style={{visibility: formVisibility}}>

            <QSteps/>
            <span style={{fontSize: '16px'}}><b>{props.questionnaireData.questionnaire.descDisclaimer}</b></span>

            <div ref={rowRef}
                // style={{visibility: 'hidden'}}
            >


                <Form layout='horizontal' form={form} size='large' initialValues={initialValues}>
                    <Questions/>



                    <Row gutter={[16, 16]} style={{float: 'right'}}>
                        {(currentStep > 0) &&
                            <Col>
                                <Button
                                    type='primary' size='large'
                                    shape={'round'}
                                    onClick={prevStep}> {'Volver'}
                                </Button>
                            </Col>
                        }
                        {(currentStep < totalSteps - 1) &&
                            <Col>
                                <Button
                                    type='primary' size='large'
                                    shape={'round'}
                                    onClick={nextStep}> {'Siguiente'}
                                </Button>
                            </Col>
                        }
                    </Row>

                </Form>

            </div>
            {getTheStructure(rowRef)}
        </div>
    );

}

export default QuestionnaireForm;
