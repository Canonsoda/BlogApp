import React from 'react'
import { Container , PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 bg-black-500 bg-current'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost