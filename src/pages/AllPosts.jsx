import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Fetch posts when the component is mounted
        appwriteService.getPosts([]).then((response) => {
            if (response) {
                setPosts(response.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    // If no posts, display this message
                    <div className="text-center text-white text-hover-yellow-500">
                        <h1 className="text-4xl font-bold">No posts yet!</h1>
                        <p className="mt-4">It looks like you haven’t created any posts yet. <br />
                        <span className="font-medium text-primary hover:underline cursor-pointer">
                            Create a post
                        </span> to share your thoughts!</p>
                    </div>
                ) : (
                    // If there are posts, display them
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
