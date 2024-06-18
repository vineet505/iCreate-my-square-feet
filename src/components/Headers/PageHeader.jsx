import React from 'react'

const PageHeader = ({title}) => {
  return (
    <div className='h-[40px] pl-1 text-[#737373] dark:text-white text-[20px] font-bold mt-[60px] mb-[24px]'>
        <h4> {title} </h4>
    </div>
  )
}

export default PageHeader