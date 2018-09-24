import * as React from 'react';
import {ChangeEvent} from 'react';
import {Repository} from 'src/shared/models';
import {QueryableRepositoryList} from '..';

import './UserQueryableRepositoryList.scss';

export type Props = {
  children: (repo: Repository[]) => any;
};

type State = {
  inputQuery: string;
  searchQuery: string;
};

class UserQueryableRepositoryList extends React.Component<Props, State> {
  readonly state: State = {
    inputQuery: '',
    searchQuery: '',
  };

  private applyQuery = (): void => {
    this.setState((prevState) => ({
      searchQuery: prevState.inputQuery,
    }));
  };

  private inputQueryChanged = (
    inputEvent: ChangeEvent<HTMLInputElement>,
  ): void => {
    this.setState({
      inputQuery: inputEvent.target.value,
    });
    if (!inputEvent.target.value) {
      this.applyQuery();
    }
  };

  render() {
    return (
      <div className="UserQueriableRepositoryList">
        <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={this.state.inputQuery}
            onChange={this.inputQueryChanged}
          />
          <button type="submit" onClick={this.applyQuery}>
            Search
          </button>
        </form>
        <QueryableRepositoryList query={this.state.searchQuery}>
          {(repositories) => this.props.children(repositories)}
        </QueryableRepositoryList>
      </div>
    );
  }
}

export default UserQueryableRepositoryList;
