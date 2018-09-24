import * as React from 'react';
import {Repository} from 'src/shared/models';
import {
  ActionableRepositoryList,
  UserQueryableRepositoryList,
} from './components';

import './MyGithubFavorites.scss';

interface State {
  favorites: Repository[];
  searchQuery: string;
  inputQuery: string;
}

type Props = {};

class MyGithubFavorites extends React.PureComponent<Props, State> {
  readonly state: State = {
    favorites: [],
    searchQuery: '',
    inputQuery: '',
  };

  private isNotFavorited = (repo: Repository): boolean => {
    return !this.state.favorites.find((fav) => fav.id === repo.id);
  };

  private addToFavorite = (repo: Repository): void => {
    this.setState(({favorites}) => ({
      favorites: [...favorites, repo],
    }));
  };

  private removeFromFavorites = (repo: Repository): void => {
    this.setState(({favorites}) => ({
      favorites: favorites.filter((favorite) => favorite.id !== repo.id),
    }));
  };

  public render() {
    return (
      <div className="MyGithubFavorites">
        <div className="SplitPane">
          <div className="Pane Container">
            <UserQueryableRepositoryList>
              {(repositories) => (
                <ActionableRepositoryList
                  repositories={repositories}
                  rowActionName="Add"
                  onAction={this.addToFavorite}
                  hasActionEnabled={this.isNotFavorited}
                />
              )}
            </UserQueryableRepositoryList>
          </div>
          <div className="Pane RightPane Container bg-primary-light">
            <ActionableRepositoryList
              repositories={this.state.favorites}
              rowActionName="Remove"
              onAction={this.removeFromFavorites}
              hasActionEnabled={() => true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyGithubFavorites;
