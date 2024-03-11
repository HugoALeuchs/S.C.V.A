import React, { createContext, useContext } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorProvider } from "../src/ColorProvider";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Sistema de Controle de Volume de Armazenamento</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ColorProvider>
    </AppCacheProvider>
  );
}
