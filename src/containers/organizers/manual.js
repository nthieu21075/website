import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { connect } from 'react-redux'
import { getManual } from 'services/organizers/tournaments/api'
import { Icon, message, Button, Card, Typography } from 'antd';
const { Title } = Typography

class ManualContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { fileList: [] }

  }

  componentDidMount() {
    this.props.dispatch(getManual((response) => {
      console.log(response)
      this.setState({ fileList: response })
    }))
  }

  render() {
    return (
      <div style={{ height: 200, display: 'flex', flexDirection: 'column' }}>
        <Title level={3} style={{ textAlign: 'center', margin: '30px' }}>List Manual </Title>
        <div style={{ display: 'flex', flexFlow: 'wrap row', 'justifyContent': 'center' }}>
          {
            this.state.fileList.map(item => {
              return (
                <Card
                  type="inner"
                  bodyStyle={{ padding: '12px' }}
                  bordered={true}
                  style={{ width: 200, margin: '0 10px' }}
                >
                  <a href={process.env.API_DOMAIN_URL + item.path} target="_blank" style={{ display: 'flex', flexDirection: 'column', color: 'black', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon type="file" style={{ fontSize: 40 }}/>
                    <div style={{margin: '10px 0', fontWeight: 'bold', width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', overflow: 'hidden'}}>{item.originalName}</div>
                    <a href={process.env.API_DOMAIN_URL + item.path} target="_blank">
                      <Button  icon="download" shape="round" style={{ background: 'green', color: 'white'}}>
                        Download
                      </Button>
                    </a>
                  </a>
                </Card>
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