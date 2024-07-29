import React from 'react'
import { CheckboxReactHookFormMultiple } from '../../../components/tests/multiCheckbox'
const Page = ({  searchParams}:{searchParams: Record<string, string | string[] | undefined>}) => {
  return (
    <div>
        <CheckboxReactHookFormMultiple />
    </div>
    
  )
}

export default Page