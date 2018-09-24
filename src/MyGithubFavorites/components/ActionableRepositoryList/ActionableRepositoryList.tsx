import * as React from 'react';
import {Repository} from 'src/shared/models';
import './ActionableRepositoryList.scss';

export interface Props {
  repositories: Repository[];
  rowActionName: string;
  onAction: (repo: Repository) => void;
  hasActionEnabled: (repo: Repository) => boolean;
}

class ActionableRepositoryList extends React.PureComponent<Props> {
  public render() {
    return (
      <table className="ActionableRepositoryList fullWidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Latest tag</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.repositories.map((repo) => (
            <tr key={repo.nameAndAuthor}>
              <td>
                <a className="decoration-onhover" href={repo.url}>
                  {repo.nameAndAuthor}
                </a>
              </td>
              <td>{repo.primaryLanguage ? repo.primaryLanguage : '-'}</td>
              <td>{repo.latestTag ? repo.latestTag : '-'}</td>
              <td>
                {this.props.hasActionEnabled(repo) && (
                  <a
                    onClick={() => this.props.onAction(repo)}
                    className="color-primary"
                  >
                    {this.props.rowActionName}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ActionableRepositoryList;
