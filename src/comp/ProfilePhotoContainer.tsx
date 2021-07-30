import React from 'react';
import View from './ProfilePhoto';
import {RcFile} from 'antd/lib/upload';
import {FormInstance} from 'antd/lib/form';
import {notification} from "antd";

interface IProps {
    profilePhotoVisible?: boolean;
    onCloseProfilePhotoForm: () => void;
}

export interface IState {
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;

}


class ProfilePhotoContainer extends React.Component<IProps, IState> {

    public state: IState = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
    };

    public componentDidMount() {
        if (this.props.profilePhotoVisible) {
            this.loadData();
        }
    }

    public render() {

        return (
                <View
                    {...this.state}
                    visible={this.props.profilePhotoVisible}
                    onAvatarRemove={this.onAvatarRemove}
                    onAvatarUpload={this.onAvatarUpload}
                    handleCancel={this.handleCancel}
                    handlePreview={this.handlePreview}
                    onCancelPhotoSelect={this.onCancelPhotoSelect}
                    onSaveSelectedPhoto={this.onSaveSelectedPhoto}
                />
        )

    }

    private loadData = () => {
        // Rest<{ type: string }, { idUser: number, hasUserAvatar: boolean, blobAvatar: string }>().operation({type: 'SelectUserDataForAvatar'})
        //     .then(response => {
        //         this.setState({
        //             userData: response,
        //             loaded: true
        //         });
        //     });
    }

    private onCancelPhotoSelect = () => {

        this.props.onCloseProfilePhotoForm();
    }


    private onSaveSelectedPhoto = (form: FormInstance) => {
        // this.saveSelectedPhoto(form).catch((e) => {
        //         notification['error']({
        //             message: this.props.t('newUserNoSelectionError')
        //         });
        //     }
        // );
    }

    private saveSelectedPhoto = async (form: FormInstance) => {
        // const avatarImage = form.getFieldsValue();
        // const userImageBase64Data = avatarImage.files && avatarImage.files[0] && !avatarImage.files[0].url &&
        //     await this.getBase64(avatarImage.files[0].originFileObj);
        // Rest<{ type: string, idUser: number, base64ImageAvatar: any }, any>()
        //     .operation({
        //         type: 'SetUserAvatar',
        //         idUser: this.state.userData?.idUser!,
        //         base64ImageAvatar: userImageBase64Data ? userImageBase64Data : undefined
        //     })
        //     .then(response => {
        //         this.props.onCloseProfilePhotoForm();
        //     }).catch(() => {
        //     // throw new Error('Oops!');
        // });
    }

    private onAvatarUpload = (file: RcFile, form: FormInstance) => {

        return false;
    };

    private onAvatarRemove = (e: MouseEvent, form: FormInstance) => {
        e.stopPropagation();
        form.setFieldsValue({...form.getFieldsValue(), base64ImageLogo: undefined, hasProfilePhoto: false});
    }

    private handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            // previewImage: file.url || file.preview,
            previewVisible: true,
            // previewTitle: (file.name || (file.url && file.url.substring(file.url.lastIndexOf('/') + 1)))
        });
    };

    private handleCancel = (e: React.MouseEvent<HTMLElement>) => this.setState({previewVisible: false});

    private getBase64 = (file: RcFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


}

export default (ProfilePhotoContainer);