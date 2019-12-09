import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Drawer, Button } from 'antd'
import CreateTeamForm from 'components/users/createTeamForm'
import { createTeam } from 'services/users/profile/api'

class CreateTeam extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClose, visible } = this.props

    return (
      <Drawer
        title="Create a new team"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <FormDecorator/>
      </Drawer>
    )
  }
}

let FormDecorator = reduxForm({
  form: 'userCreateTeamForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  onSubmit: createTeam
})(CreateTeamForm)

FormDecorator = connect(
  (state) => ({
    initialValues: {
      categories: state.users.categories.data,
      categoryId: state.users.categories.data.length > 0 ? state.users.categories.data[0].id : 0
    }
  })
)(FormDecorator)


const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(CreateTeam)