import * as React from 'react';
import {Query} from 'react-apollo';
import {Repository} from 'src/shared/models';
import SearchRepositoriesQuery from './graphql/SearchRepositories.graphql';
import {
  SearchRepositories,
  SearchRepositories_search_edges_node,
  SearchRepositories_search_edges_node_Repository,
} from './graphql/__generated__/SearchRepositories';

export type Props = {
  query: string;
  children: (repositories: Repository[]) => any;
};

function mapDataToRepositories({
  search: {edges},
}: SearchRepositories): Repository[] {
  if (edges == null) {
    return [];
  }

  return edges.reduce<Repository[]>((repositories, edge) => {
    if (edge == null || edge.node == null || !isRepositoryNode(edge.node)) {
      return repositories;
    }

    const latestTagRef =
      edge.node.refs && edge.node.refs.edges
        ? edge.node.refs.edges[0]
        : undefined;
    const primaryLanguage = edge.node.primaryLanguage;

    const repository = {
      id: edge.node.id,
      nameAndAuthor: edge.node.nameWithOwner,
      latestTag:
        latestTagRef && latestTagRef.tag ? latestTagRef.tag.name : undefined,
      primaryLanguage: primaryLanguage ? primaryLanguage.name : undefined,
      url: edge.node.url,
    };

    return [...repositories, repository];
  }, []);
}

function isRepositoryNode(
  node: SearchRepositories_search_edges_node,
): node is SearchRepositories_search_edges_node_Repository {
  return node.__typename === 'Repository';
}

const QueryableRepositoriesList = ({query, children}: Props) => (
  <Query query={SearchRepositoriesQuery} variables={{query}} skip={!query}>
    {({data, loading}) => {
      const repositories =
        query && data && !loading ? mapDataToRepositories(data) : [];
      return children(repositories);
    }}
  </Query>
);

export default QueryableRepositoriesList;
