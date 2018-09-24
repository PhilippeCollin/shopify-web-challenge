import * as React from 'react';

import './PageHeader.scss';

export type Props = {
  children: string;
};

const Header = ({children}: Props) => (
  <header className="PageHeader bg-primary">
    <h1 className="PageTitle">{children}</h1>
  </header>
);

export default Header;
