import {Form, Row, Col, Button, Input, Radio, Space} from 'antd';
import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import DataContext from '../store/data-context';


const TestForm1 = () => {


    const ctx = useContext(DataContext);

    const [form] = Form.useForm();
    let initialValues: any = {
        fld1: 'Test 1',
        fld2: ctx.pups
    };

    return (
        <div>
            <span>
                <h2>Test</h2>
            </span>
            <Form
                layout='vertical'
                form={form}
                size='small'
                initialValues={initialValues}>
                <Row>
                    <Col span={9}> </Col>
                    <Col span={6}>
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
                                <Button type='primary'
                                        onClick={() => ctx.handleClick(form.getFieldValue('fld1'),
                                            '  XXX')}>
                                    {'Check values'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={9}> </Col>
                </Row>

                <Form.Item
                           style={{
                    backgroundColor: 'aqua', width: '80%', margin: 'auto'
                }}
                >
                    <Radio.Group
                        // style={{
                        //     backgroundColor: 'aqua',
                        //
                        //     display: 'flex',
                        //     justifyContent: 'space-between'
                        // }} size={'large'}
                        defaultValue={1}>

                        <Row>
                            <Radio value={1}>A</Radio>
                            <Radio value={2}>B</Radio>
                        </Row>
                        <Row>
                            <Radio value={3}>C</Radio>
                            <Radio value={4}>D</Radio>
                        </Row>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div>
    );
}

export default TestForm1;