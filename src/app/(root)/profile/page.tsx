import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

function page() {

  redirect("/profile/listedCrops",RedirectType.replace)
  return (
    <div>page</div>
  )
}

export default page