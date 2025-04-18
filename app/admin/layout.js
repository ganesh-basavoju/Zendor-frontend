import AdminLayout from '@/components/Admin/Layout'
import React from 'react'

const layout = ({children}) => {
  return (
       <AdminLayout>
       {children}
       </AdminLayout>
  )
}

export default layout