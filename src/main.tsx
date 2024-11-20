import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Phantom/components/App'
import { ConfigProvider, Layout, theme } from 'antd'
import ReactGA from "react-ga4";

ReactGA.initialize("G-FLCN86EH9W");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <Layout>
            <App />
        </Layout>
    </ConfigProvider>
  </React.StrictMode>,
)
