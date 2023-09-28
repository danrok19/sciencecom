import React from 'react'
import FormOrganizeFirst from '../../Components/FormOrganizeFirst/FormOrganizeFirst'
import ChangeEvent from '../../Components/ChangeEvent/ChangeEvent'

const OrganizePage = () => {
  return (
    <div style={{background: '#950740', paddingTop: '2em', paddingBottom: '3rem'}}>
      <ChangeEvent />
      <FormOrganizeFirst />
    </div>
  )
}

export default OrganizePage
