import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { ConfigProvider, Layout, theme } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <Layout>
            <App />
        </Layout>
    </ConfigProvider>
  </React.StrictMode>,
)
