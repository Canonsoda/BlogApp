import React,{useState,useEffect, use} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostForm } from '../components'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function EditPost() {
    const [post,setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
       if(slug) {
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
       }else{
        navigate('/')
       }
    },[slug,navigate])
    
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost