import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { connect } from 'react-redux'
import { getManual, removeManual } from 'services/admins/api'
import { Upload, Icon, message, Button } from 'antd';

const { Dragger } = Upload;

class ManualContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { fileList: [] }

    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getManual((response) => {
      this.setState({ fileList: response })
    }))
  }

  onChange(info) {
    const { status } = info.file

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)

      this.props.dispatch(getManual((response) => {
        this.setState({ fileList: response })
      }))
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  onRemove(info) {
    this.props.dispatch(removeManual(info.id, (response) => {
      this.setState({ fileList: response })
      message.success(`${info.originalName} file removed successfully.`)
    }))
  }

  render() {
    let props = {
      showUploadList: false,
      name: 'files',
      method: 'post',
      multiple: true,
      action: process.env.API_DOMAIN_URL + 'api/admins/create-manual',
    }

    return (
      <div style={{ height: 200, display: 'flex', flexDirection: 'column' }}>
        <Dragger {...props} onChange={this.onChange}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
        <div style={{ display: 'flex', flexFlow: 'wrap row', 'justifyContent': 'center' }}>
          {
            this.state.fileList.map(item => {
              return (
                <div
                  key={item.id}
                  style={{ cursor: 'pointer', width: '100%', margin: 20, display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Icon type="file" />
                    <span style={{marginLeft: 5}}>{item.originalName}</span>
                  </div>
                  <div style={{ width: 50 }}>
                    <a href={process.env.API_DOMAIN_URL + item.path} target="_blank">
                      <Icon type="download" style={{ fontSize: 20 }}/>
                    </a>
                    <Icon type="close-circle" onClick={e => this.onRemove(item)} style={{ color: 'red', marginLeft: 10, fontSize: 20, cursor: 'pointer' }} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(ManualContainer)