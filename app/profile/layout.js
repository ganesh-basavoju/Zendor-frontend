import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex flex-col w-full bg-gray-100 '>
       

        {children}
    </div>
  )
}

export default layout