import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/constants/Layout'
import HomeComp from '../components/Home'

const IndexPage = () => {
  // useEffect(() => {
  //   const handleMessage = (_event, args) => alert(args)

  //   // add a listener to 'message' channel
  //   global.ipcRenderer.addListener('message', handleMessage)

  //   return () => {
  //     global.ipcRenderer.removeListener('message', handleMessage)
  //   }
  // }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <Layout title="Oneplay">
      <HomeComp />
    </Layout>
  )
}

export default IndexPage
