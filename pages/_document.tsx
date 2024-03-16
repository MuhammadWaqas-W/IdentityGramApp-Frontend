import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#2296f3" />
          <meta name="title" content="IDENTITY-GRAM" />
          <meta name="description" content="IDENTITY-GRAM-DESCRIPTION" />
          <meta name="keywords" content="identity-gram , social" />
          <meta property="og:image" content="./brandLogo.png" />
          <link rel="icon" href="/images/icons/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap&family=Public+Sans:wght@400;500;600;700"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
