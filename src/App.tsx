import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import './App.scss';
import MyGithubFavorites from './MyGithubFavorites/MyGithubFavorites';
import {PageHeader, PageFooter} from './shared';
import {CONFIG} from './config';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((request, previousContext) => ({
  mode: 'no-cors',
  headers: {
    authorization: `Bearer ${CONFIG.token}`,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <PageHeader>My Github Favorites</PageHeader>
        <div className="AppContent">
          <MyGithubFavorites />
        </div>
        <PageFooter
          author={CONFIG.author}
          sourceCodeUrl={CONFIG.sourceCodeUrl}
        />
      </ApolloProvider>
    );
  }
}

export default App;
