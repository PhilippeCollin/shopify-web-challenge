import * as React from 'react';
import './PageFooter.scss';

type Props = {
  author: string;
  sourceCodeUrl: string;
};

const Footer = ({author, sourceCodeUrl}: Props) => (
  <div className="PageFooter bg-primary">
    <div className="sourceCode">
      Source code: <a href={sourceCodeUrl}>{sourceCodeUrl}</a>
    </div>
    <div className="author">
      Shopify Web Developer Intern Challenge - Solution by{' '}
      <strong>{author}</strong>
    </div>
  </div>
);

export default Footer;
