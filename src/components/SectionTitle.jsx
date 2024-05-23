import React from 'react'

const SectionTitle = ({title, path}) => {
  return (
    <div className='section-title-div border-b py-3 border-gray-600'>
        <h1 className='section-title-title text-6xl font-bold text-center mb-5 max-md:text-3xl max-sm:text-3xl text-accent-content'>{ title }</h1>
        <p className='section-title-path text-lg text-center max-sm:text-sm  text-accent-content'>{ path }</p>
    </div>
  )
}

export default SectionTitle