import React, { Component } from 'react'
import { Icon, Button, Input, AutoComplete } from 'antd';

const { Option } = AutoComplete;

class SearchContainer extends Component {
 constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.searchResult = this.searchResult.bind(this)
  }

  handleSearch(value) {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    })
  }

  searchResult(query) {
    return new Array(this.getRandomInt(5))
      .join('.')
      .split('.')
      .map((item, idx) => ({
        query,
        category: `${query}${idx}`,
        count: this.getRandomInt(200, 100)
      }))
  }

  getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSelect(value) {
    console.log('onSelect', value);
  }

  renderOption(item) {
    return (
      <Option key={item.category} text={item.category}>
        <div className="global-search-item">
          <span className="global-search-item-desc">
            Found {item.query} on
            <a
              href={`https://s.taobao.com/search?q=${item.query}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.category}
            </a>
          </span>
          <span className="global-search-item-count">{item.count} results</span>
        </div>
      </Option>
    )
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="global-search"
          size="default"
          style={{ width: '300px' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
      </div>
    );
  }
}

export default SearchContainer