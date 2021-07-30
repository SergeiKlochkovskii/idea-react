import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faCameraRetro, faUpload} from '@fortawesome/free-solid-svg-icons';
import ImgCrop from 'antd-img-crop';

import {UploadFile} from 'antd/lib/upload/interface';

import {
    UploadOutlined
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import {Button, Form, Space, Tooltip, Upload} from 'antd';
import {RcFile} from 'antd/lib/upload';

import {FormInstance} from 'antd/lib/form';
import './ProfilePhoto.scss';
import {IState as IStateContainer} from './ProfilePhotoContainer';

interface IProps {
    visible?: boolean;
    // userData?: { idUser: number, hasUserAvatar: boolean, blobAvatar: string };
    handlePreview: (file: UploadFile<any>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
    onCancelPhotoSelect: () => void;
    onSaveSelectedPhoto: (form: FormInstance) => void;
    onAvatarUpload: (file: RcFile, form: FormInstance) => boolean;
    onAvatarRemove: (e: any, form: FormInstance) => void;

}

const ProfilePhoto = (props: IProps & IStateContainer) => {
    const [form] = Form.useForm();
    // const {t} = useTranslation(['userAvatar']);
    const {previewVisible, previewImage, previewTitle} = props;

    const initialValues = {
        // ...props.userData,
        // files:
        //     props.userData?.hasUserAvatar ? [{
        //             uid: '-1',
        //             name: 'providerImage.png',
        //             status: 'done',
        //             url: URL + '/file?ua'
        //         }]
        //         : null
        // ,
        // originFileObj: props.userData?.blobAvatar,
    }


    return (
        <Modal
            title={'Profile Photo'}
            visible={props.visible}
            onCancel={props.onCancelPhotoSelect}
            onOk={() => props.onSaveSelectedPhoto(form)}>
            <Form layout='vertical' form={form} size='large' initialValues={initialValues} style={{textAlign: 'center'}}>
                <Form.Item >
                    <ImgCrop shape='round'>
                        <Upload>
                            <div className='avatar-photo-container'>
                                <Tooltip title={'verCambiarProfilePhoto'} placement='bottom'>
                                    <div className='avatar-photo'>
                                        <FontAwesomeIcon
                                            className='photo-position'
                                            icon={faCameraRetro}/>
                                    </div>
                                </Tooltip>
                            </div>
                            <Button type={'primary'} block style={{marginTop: '2rem'}}
                                    icon={<FontAwesomeIcon icon={faUpload} style={{marginRight: '1rem'}}/>}>
                                Click to Upload</Button>
                        </Upload>
                    </ImgCrop>
                </Form.Item>

                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={props.handleCancel}
                >
                    <img alt='' style={{width: '100%', borderRadius: '50%'}} src={previewImage}/>
                </Modal>

            </Form>
        </Modal>
    )
        ;

}

const UploadWithCrop = (props: { value?: UploadFile[], onChange?: (value: UploadFile[]) => void, handlePreview: (file: UploadFile) => void }) => {
    return (
        <>
            <Upload>
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
        </>
        // <ImgCrop shape='round'>
        //     <Upload
        //         listType='picture-card' name='files'
        //         customRequest={(option: any) => option.onSuccess('ok')}
        //         onPreview={(file) => props.handlePreview(file)}
        //         fileList={props.value}
        //         onChange={info => props.onChange && props.onChange(info.fileList)}>
        //         {(!props.value || props.value.length === 0) &&
        //             <>
        //                 <Tooltip title={'verCambiarProfilePhoto'} placement='bottom'>
        //                     <FontAwesomeIcon icon={faCameraRetro}/>
        //                 </Tooltip>
        //
        //             </>
        //         }
        //
        //     </Upload>
        // </ImgCrop>
    );
}


export default ProfilePhoto;
