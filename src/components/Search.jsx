import React, { Component } from 'react';

class Search extends Component {
  // state = {  }

  render() {
    return (
      <div>
        <label htmlFor="input-search">
          <input type="text" name="input-search" id="input-search" />
          <h2
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        </label>
      </div>
    );
  }
}

export default Search;
