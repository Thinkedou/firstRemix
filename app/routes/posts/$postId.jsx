import { useParams, useLoaderData, redirect } from 'remix'
import { db } from '~/utils/db.server'

export const loader = async ({params})=>{
    const post= await db.post.findUnique({
        where:{id:params.postId}
    })
    if(!post){
        throw new Error('Post not found')
    }
    const data = {post}
    return data
}

export const action = async ({params,request})=>{
    const form = await request.formData()
    if(form.get('_method')==='delete'){
        const post= await db.post.findUnique({
            where:{id:params.postId}
        })
        if(!post){
            throw new Error('Post not found')
        }
        await db.post.delete({where:{id:params.postId}})
        return redirect('/posts')
    }
}

export default function Post() {
    const params = useParams()
    const {post} = useLoaderData()
  return (
    <div>
        <h1>{post.title}</h1>
        <div className="page-content">
            {post.body}
        </div>
        <div className="page-footer">
            <form method="POST">
                <input type='hidden' name='_method' value='delete' />
                <button className="btn btn-delete">
                    Delete
                </button>
            </form>
        </div>
    </div>
  );
}
