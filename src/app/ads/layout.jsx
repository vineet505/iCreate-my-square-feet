import React from 'react'
import Layout from '@/layouts/layout'
import TopHeader from '@/components/TopBar/TopHeader'

const layout = ({children}) => {
  return (
    <Layout>
      <div className='overflow-auto'>
        <TopHeader />
      </div>
      <div className='p-8'>
        {children}
      </div>
    </Layout>
  )
}

export default layout