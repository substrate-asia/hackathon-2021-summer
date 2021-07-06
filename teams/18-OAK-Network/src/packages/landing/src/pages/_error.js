import React from 'react';
import Head from 'next/head';
import ErrorSec from 'containers/Error';
import { ResetCSS } from 'common/assets/css/style';
export default function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>404: Not found</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700|Poppins:400,500,600,700|Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ResetCSS />
      <div>
        {statusCode ? (
          `An error ${statusCode} occurred on server`
        ) : (
          <ErrorSec />
        )}
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
