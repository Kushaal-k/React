import React, { useEffect } from 'react'
import appwriteService from '../appwrite/configs'
import { PostCard, Container } from '../components/index'

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])

    appwriteService.getAllPosts()
    .then((post) => {
        if(post){
            setPosts(post.documents)
        }
    })
    .catch((error) => console.log("Failed to Fetch all posts!!", error))

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost