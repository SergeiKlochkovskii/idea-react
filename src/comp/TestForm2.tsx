import {Form, Row, Col, Select, Button, Input} from 'antd';
import React, {useContext, useEffect, useRef, useState} from 'react';
import 'antd/dist/antd.css';
import DataContext from '../store/data-context';

const TestForm2 = (props: { children: any; }) => {



    const [form] = Form.useForm();
    let initialValues: any = {

    };

    const ctx = useContext(DataContext);

    const handleClick = () => {
        form.setFieldsValue({fldr: ctx.pups + ': ' + ctx.str});
    }

    useEffect(() => {
            form.setFieldsValue({...form.getFieldsValue(), fld1: ctx.str, fld2: ctx.pups});
        }, [ctx]
    );

    return (
        <div>
            {props.children}
            <span>
                <h2>{ctx.str}</h2>
            </span>
            <Form
                layout='vertical'
                form={form}
                size='small'
                initialValues={initialValues}>
                <Row>
                    <Col span={9}> </Col>
                    <Col span={6}>
                        <Form.Item
                            style={{color: 'gray'}}
                            label='Test list'
                            name='testList'
                            rules={[{required: true}]}
                        />
                        <Row>
                            <Col>
                                <Form.Item label={'Value 1 '} name='fld1' rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label={'Value 2'} name='fld2' rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type='primary' onClick={handleClick}>
                                    {'Check values'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={9}> </Col>
                </Row>
                <Row style={{margin: '20px'}}>
                    <Col span={9}> </Col>
                    <Col>
                        Left text
                    </Col>
                    <Col>
                        Right text: <Form.Item name='fldr' noStyle={true}>
                        <Input/>
                    </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default TestForm2;