import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage)


  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-black rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="w-full flex justify-center items-center mb-4 overflow-hidden rounded-xl h-48 bg-gray-900">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            <div className="text-white text-sm">Image not available</div>
          )}
        </div>
        <h2 className="text-xl font-bold text-yellow-500 text-center">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
