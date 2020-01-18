import React, { Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { showAlert } from 'helpers/alert'
import { Row, Col, Layout, Typography, Pagination, Spin, List, Card, Avatar, Button } from 'antd'
import { tournamentData } from 'global/fakeData'
import { getOrganizers } from 'services/admins/api'
import moment from 'moment'
import Navigator from 'helpers/history'

const { Paragraph, Title, Text } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column'
}

const teamStyled = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

const itemFooterStyled = {
  display: 'flex',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

class OrganizersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: [] }
  }

  componentDidMount() {
    this.props.dispatch(getOrganizers((response) => {
      this.setState({ loading: false, data: response })
    }))
  }

  render() {
    const { loading, data } = this.state

    return (
      <Spin spinning={loading} delay={500}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" shape="round" icon="plus" onClick={e => Navigator.push('/admins/organizer-create')}>
              Create new organizer
            </Button>
          </div>
          <Content style={contentStyled}>
            <Title level={3} style={{ textAlign: 'center', margin: '30px' }}>List Organizers</Title>
            <Row type="flex" justify="center">
              <Col xs={{span: 24}} md={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 24}} style={{ paddingBottom: '100px' }}>
                <div style={{ display: 'flex', flexFlow: 'wrap row' }}>
                  {
                    data.map(item => {
                      return (
                        <Card
                          key={item.id}
                          style={{ cursor: 'pointer', width: 300, margin: 20 }}
                          type="inner"
                          bodyStyle={{ padding: '12px' }}
                          bordered={true}
                        >
                          <div onClick={e => Navigator.push('/admins/organizer-detail/' + item.id)}>
                            <div style={teamStyled}>
                              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yaq_DZKXinW1i0VvxAgrMQd7gVid0idFr0nxfWrvGStgnHmT&s" size={200}/>
                              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ fontSize: 15 }}>{item.organizerName}</Text>
                                <Text style={{ fontSize: 15 }}>{item.address}</Text>
                                <Text style={{ fontSize: 15 }}>
                                { item.location.map(item => {
                                  return (<span key={item} style={{margin: '0 2px'}} >{item}</span>)
                                })}
                                </Text>
                                <Text style={{ fontSize: 15 }}>{item.phoneNumber}</Text>
                              </div>
                            </div>
                            <div style={itemFooterStyled} >
                              <Text strong>Created At:</Text>
                              <Text code style={{ marginLeft: 5 }}>{moment(item.createdAt).format("DD/MM/YYYY HH:MM")}</Text>
                            </div>
                          </div>
                        </Card>
                      )
                    })
                  }
                </div>
              </Col>
            </Row>
          </Content>
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(OrganizersContainer)