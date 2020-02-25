import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Layout, Typography, Spin, Card, Button, Modal } from 'antd'
import { getPrivateCategories, deleteCategory } from 'services/admins/api'
import Navigator from 'helpers/history'
import Routes from 'global/routes'

const { Title, Text } = Typography
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
  paddingBottom: '10px',
  justifyContent: 'center',
  alignItems: 'center'
}

const itemFooterStyled = {
  display: 'flex',
  padding: '10px 0',
  justifyContent: 'center',
  alignItems: 'center'
}

class CategoriesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: [] }

    this.deleteItem = this.deleteItem.bind(this)
    this.updateData = this.updateData.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getPrivateCategories((response) => {
      this.setState({ loading: false, data: response })
    }))
  }

  deleteItem(id) {
    const { dispatch } = this.props
    const { updateData } = this

    Modal.confirm({
      title: 'Do you Want to delete this category?',
      content: '',
      onOk() {
        dispatch(deleteCategory(id, (response) => {
          updateData(response)
        }))
      },
      onCancel() {},
    });
  }

  updateData(data) {
    this.setState({ data: data })
  }

  render() {
    const { loading, data } = this.state

    return (
      <Spin spinning={loading} delay={500}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" shape="round" icon="plus" onClick={e => Navigator.push(Routes.admins.CATEGORY_CREATE)}>
              Create new category
            </Button>
          </div>
          <Content style={contentStyled}>
            <Title level={3} style={{ textAlign: 'center', margin: '30px' }}>List Categories</Title>
            <Row type="flex" justify="center">
              <Col xs={{span: 24}} md={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 24}} style={{ paddingBottom: '100px' }}>
                <div style={{ display: 'flex', flexFlow: 'wrap row', 'justifyContent': 'center' }}>
                  {
                    data.map(item => {
                      return (
                        <Card
                          key={item.id}
                          style={{ cursor: 'pointer', width: 400, margin: 20 }}
                          type="inner"
                          bodyStyle={{ padding: '0' }}
                          bordered={true}
                        >
                          <div onClick={e => Navigator.push('/admins/category-detail/' + item.id)}>
                            <div style={teamStyled}>
                              <img src={ process.env.API_DOMAIN_URL + item.imageUrl } style={{ width: '100%', height: 200, objectFit: 'cover' }}/>
                              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                              </div>
                            </div>
                          </div>
                          <div style={itemFooterStyled} >
                            <Button type="danger" onClick={ e => this.deleteItem(item.id)}>Delete</Button>
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

export default connect(mapStateToProps)(CategoriesContainer)