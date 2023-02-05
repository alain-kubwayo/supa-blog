import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const BlogCard = ({blog, onDelete}) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        const { data, error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', blog.id)
            .select()

        if(error){
            console.log(error);
        }

        if(data){
            onDelete(blog.id);
        }

    }
    return ( 
        <div className="w-full p-2.5 bg-sky-400 text-gray-700 box-border rounded-md">
            <h3 className="text-md text-sky-900 font-semibold">{blog.title}</h3>
            <p>{blog.body}</p>
            {blog.tags.map(tag => <p key={tag}>{tag}</p>)}
            <div className="buttons flex gap-x-4 justify-end">
                <Link to={`/${blog.id}`} className="bg-sky-800 round-md text-white p-2">Edit</Link>
                <button onClick={handleClick} className="bg-red-800 round-md text-white p-2">Delete</button>
            </div>
        </div>
    );
}
 
export default BlogCard;