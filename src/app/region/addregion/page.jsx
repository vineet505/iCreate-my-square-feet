import React from 'react'
import PageHeader from '@/components/Headers/PageHeader'
import { RegionForm } from '@/components/Region/RegionForm'

const page = () => {
  return (
    <>
      <PageHeader title="Add Region" />
      <RegionForm />
    </>
  )
}

export default page