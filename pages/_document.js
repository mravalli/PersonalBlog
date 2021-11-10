import Document, { Html, Head, Main } from 'next/document'
import DeferNextScript from  '../lib/DeferNextScript'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head />
        <body className="text-gray-800 antialiased">
          <Main />
          <DeferNextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument