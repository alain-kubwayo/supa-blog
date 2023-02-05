import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [orderBy, setOrderBy] = useState('created_at');

    const handleDelete = (id) => {
        setBlogs(prevBlogs => {
            return prevBlogs.filter(blog => id !== blog.id);
        })
    }

    useEffect(()=>{
        const fetchBlogs = async () => {
            const {data, error} = await supabase
                .from('blogs')
                .select() // fetch all blogs
                .order(orderBy, { ascending: false})

            if(error){
                setError("Could not fetch the blogs");
                setBlogs(null);
                console.log(error);
            }

            if(data){
                setBlogs(data);
                setError(null);
            }
        }
        fetchBlogs();
    }, [orderBy])
    
    return ( 
        <div className="page">
            {error && <p>{error}</p>}
            {blogs && (
                <div className="blogs">
                    <div>
                        <p>Order by: </p>
                        <button className="bg-sky-900 text-white px-2 py-1 mr-4" onClick={() => setOrderBy('created_at')}>Time Created</button>
                        <button className="bg-sky-900 text-white px-2 py-1 mr-4" onClick={() => setOrderBy('title')}>Title</button>
                        <button className="bg-sky-900 text-white px-2 py-1" onClick={() => setOrderBy('body')}>Body</button>
                    </div>
                    <div className="mt-10 grid grid-cols-3 gap-5">
                        {blogs.map(blog => <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Home;