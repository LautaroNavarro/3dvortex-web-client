import React from 'react';
import SearchIcon from '../../Icons/SearchIcon';

const NavBarSearch = (props) => {
    return (
      <form className="form-inline my-2 my-lg-0 d-inline w-50">
        <div className="input-group">
          <input className="form-control py-2 border-right-0 border" type="search" aria-label="Search" />
          <div className="input-group-append border-danger rounded-right">
              <div className="input-group-text bg-white rounded-right nav-item">
                <SearchIcon />
              </div>
          </div>
        </div>
      </form>
    );
}

export default NavBarSearch;

