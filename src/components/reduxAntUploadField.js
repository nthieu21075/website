import isEmpty from 'lodash/isEmpty'
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Icon, Form, Button, message, Modal, Upload } from 'antd';
import _ from 'lodash'

const AntUpload = ({
  children,
  handleCancel,
  input,
  meta: { invalid, touched, error },
  label,
  imageUrl,
  previewImage,
  ...props
}) => {
  const hasError = touched && invalid

  return (
    <Form.Item
      label={label}
      help={hasError && error}
      validateStatus={hasError ? 'error' : 'success'}
    >
      <Upload
        {...input}
        {...props}
        accept={'image/*'}
        className='avatar-uploader avatar-uploader-full'
        customRequest={null}
        listType='picture-card'
        loading={false}
        showUploadList={true}
      >
        {(imageUrl == undefined || imageUrl == '') ? (
          <div>
            <Icon type='cloud-upload-o' style={{ fontSize: 40 }} />
            <div style={{ fontSize: 11 }}>
              File formats: JPEG, PNG, GIF (max size 2MB)
            </div>
          </div>
        ) : null}
      </Upload>
      <Modal visible={previewImage} footer={null} onCancel={handleCancel}>
        <img src={imageUrl} width='100%' alt='example' />
      </Modal>
    </Form.Item>
  )
}

const setFileList = (imageUrl) => ({
  uid: '-1',
  name: '',
  status: 'done',
  url: imageUrl
})

class AntUploadFormField extends Component {
  constructor(props) {
    super(props)
    let state = {
      confirmLoading: false,
      fileList: [],
      imageUrl: '',
      previewImage: false,
      defaultImage: ''
    }

    this.state = state

    this.beforeUpload = this.beforeUpload.bind(this)
    this.getBase64 = this.getBase64.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  beforeUpload(file, fileList) {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isGIF = file.type === 'image/gif'
    const isLt2MB = file.size / 2048000 <= 1

    if ((isJPG || isPNG || isGIF) && isLt2MB) {
      this.getBase64(file, (imageUrl) => {
        return this.setState({ imageUrl: imageUrl, fileList: [setFileList(imageUrl)] })
      })
      return false
    }

    return new Promise((resolve, reject) => {
      message.error(
        `Only 2MB jpg/png/gif files are accepted! Instead, received a ${(
          file.size / 1024000
        ).toFixed(1)}MB (${file.type})!`,
        5
      )
      reject(file)
    })
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        return this.setState({ imageUrl: reader.result, fileList: [setFileList(reader.result)] })
      }
    )
    reader.readAsDataURL(img)
  }

  handleCancel() {
    this.setState({ previewImage: false })
  }

  handlePreview() {
    this.setState({ previewImage: true })
  }

  handleRemove() {
    this.setState({ imageUrl: '', fileList: [] })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultImageUrl !== this.state.imageUrl && nextProps.defaultImageUrl) {
      this.setState({
        fileList: [setFileList(process.env.API_DOMAIN_URL + nextProps.defaultImageUrl)],
        imageUrl: nextProps.defaultImageUrl
      })
    }
  }

  render() {
    const { name, label, validate } = this.props
    const { imageUrl } = this.state
    return (
      <Field
        fileList={this.state.fileList}
        name={name}
        label={label}
        beforeUpload={this.beforeUpload}
        disabled={this.state.confirmLoading}
        component={AntUpload}
        handleCancel={this.handleCancel}
        imageUrl={imageUrl &&  imageUrl != '' ? process.env.API_DOMAIN_URL + imageUrl : imageUrl}
        onPreview={this.handlePreview}
        onRemove={this.handleRemove}
        previewImage={this.state.previewImage}
        validate={validate}
      />
    )
  }
}

export default AntUploadFormField
