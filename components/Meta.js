import React from "react";
import Head from "next/head";

export default function Meta({
  title = "Weight Loss Tracker",
  keywords = "nextjs, firebase, firestore, starter boilerplate",
  description = "Boilerplate template for a NextJS project using Firebase, Firestore",
  image = "",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@vanzylmedia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
