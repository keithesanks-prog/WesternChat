import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ height: "100%", margin: 0, padding: 0 }}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Creepster&family=Old+Standard+TT:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap" rel="stylesheet" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-image: url('/images/BurntParchment.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            overflow-x: hidden;
          }
          body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-image: url('/images/BurntParchment.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            overflow-x: hidden;
          }
          #__next {
            min-height: 100vh;
            height: auto;
            width: 100%;
            background-image: url('/images/BurntParchment.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
        `}</style>
      </Head>
      <body style={{ margin: 0, padding: 0, height: "100%", minHeight: "100vh", width: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
