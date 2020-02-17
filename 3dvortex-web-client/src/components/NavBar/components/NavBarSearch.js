import React, { PureComponent } from 'react';
import SearchIcon from '../../Icons/SearchIcon';
import GeneralContext from '../../../components/Layout/GeneralContext';
import classes from './NavBar.module.css'


class NavBarSearch extends PureComponent{

  static contextType = GeneralContext;

  state = {
    'search': '',
  }

  handleChangeSearch = (e) =>{
    this.setState({'search': e.target.value});
  }

  handleSearch = (e) => {
    e.preventDefault()
    const { setRedirect } = this.context;
    setRedirect(`/search-models?name=${this.state.search}`);
  }

  render () {
      return (
        <form
          className="form-inline my-2 my-lg-0 d-inline w-50"
          onSubmit={ (e) => this.handleSearch(e) }
        >
          <div className="input-group">
            <input
              className="form-control py-2 border-right-0 border"
              type="search"
              aria-label="Search"
              value={this.state.search}
              onChange={ (e) => this.handleChangeSearch(e) }
            />
            <div
              className={`input-group-append border-danger rounded-right ${classes.clickable}`}
              onClick={ (e) => this.handleSearch(e) }
            >
                <div className="input-group-text bg-white rounded-right nav-item">
                  <SearchIcon />
                </div>
            </div>
          </div>
        </form>
      );
  }
}

export default NavBarSearch;

