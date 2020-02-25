import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Drawer, Button, List, Typography } from 'antd'
import CreateTeamForm from 'components/users/createTeamForm'
import { createTeam } from 'services/users/profile/api'

class MyTeam extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClose, visible, myTeam } = this.props
    console.log(myTeam.data)
    return (
      <Drawer
        title="My team"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {myTeam.data && (<List
            bordered
            dataSource={myTeam.data.team}
            renderItem={item => (
              <List.Item>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <img alt="error" src={process.env.API_DOMAIN_URL + item.logo} style={{ height: 80, width: 100, objectFit: 'contain', marginRight: 15 }} />
                  <Typography.Title level={4}>{item.name}</Typography.Title>
                </div>
              </List.Item>
            )}
          />
        )}
      </Drawer>
    )
  }
}



const mapStateToProps = (state) => ({
  myTeam: state.users.userTeam
})

export default connect(mapStateToProps)(MyTeam)