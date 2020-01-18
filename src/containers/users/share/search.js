import React, { Component } from 'react'
import { Icon, Button, Input, AutoComplete } from 'antd';
import { connect } from 'react-redux'
import { Typography } from 'antd';
import _ from 'lodash'
import Navigator from 'helpers/history'
import { searchTourmanent } from 'services/users/tournaments/api'

const { Text } = Typography;
const { Option } = AutoComplete;

class SearchContainer extends Component {
 constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      value: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  handleSearch(value) {
    const { dispatch, params, type } = this.props

    if (value == '') {
      this.setState({ value: '', dataSource: [{ empty: true, text: 'Not found any result with your key word'}]})
    } else {
      dispatch(searchTourmanent(value, type, (response) => {
        if (response.length === 0) {
          this.setState({ value: value, dataSource: [{ empty: true, text: 'Not Found any result with your key word'}]})
        } else {
          this.setState({ dataSource: response, value: value})
        }
      }))
    }
  }

  onSelect(value) {
    if (this.props.type == 'organizer') {
      Navigator.push('/organizer/tournament/' + value)
    } else {
      Navigator.push('/tournament/' + value)
    }
  }

  renderOption(item) {
    if (item.empty) {
      return (
        <Option key={0} text={item.text}>
          <div className="global-search-item" style={{ display: 'flex', alignItems: 'center' }}>
            {item.text}
          </div>
        </Option>
      )
    }
    return (
      <Option key={item.id} text={item.name}>
        <div className="global-search-item" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={process.env.API_DOMAIN_URL + item.mainImageUrl} style={{ width: 50, marginRight: 10 }}/>
          <Text strong>{item.name}</Text>
        </div>
      </Option>
    )
  }

  render() {
    const { dataSource, value } = this.state

    return (
      <div className="global-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="global-search"
          size="default"
          style={{ width: '300px' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="Search..."
          optionLabelProp="text"
          value={value}
        >
          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(SearchContainer)