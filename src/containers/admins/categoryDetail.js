import React, { Component } from 'react'
import { Layout, Typography  } from 'antd'
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import UpdateCategoryForm from 'components/admins/updateCategoryForm'
import { updateCategory, getCategoryDetail } from 'services/admins/api'

const { Title } = Typography
const { Content } = Layout

const contentStyled = {
  padding: 24,
  marginBottom: 24,
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#fff'
}

class CategoryDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.props.dispatch(reset('adminUpdateCategoryForm'))
    this.props.dispatch(getCategoryDetail(this.props.params.id, (response) => {
      this.setState({ data: response })
    }))
  }

  render() {
    return (
      <Content style={contentStyled}>
        <Title level={3} style={{ textAlign: 'center', marginTop: '15px' }}>Category Detail</Title>
        <FormDecorator data={this.state.data}/>
      </Content>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'adminUpdateCategoryForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: updateCategory
})(UpdateCategoryForm)

const ininValueDetault = (state, ownState) => {
  if (ownState.data.id) {
    const data = ownState.data

    return { initialValues: {
        id: data.id,
        name: data.name,
        imageUrl: data.mainImageUrl
      }
    }
  } else {
    return { initialValues: {imageUrl: ''} }
  }
}

FormDecorator = connect(ininValueDetault)(FormDecorator)

const mapStateToProps = (state, ownState) => ({
})

export default connect(mapStateToProps)(CategoryDetailContainer)