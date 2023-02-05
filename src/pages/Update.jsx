import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if(!title || !body || tags.length === 0){
            setFormError("Please fill in all the fields");
            return;
        }
        const { data, error } = await supabase
            .from('blogs')
            .update({ title, body, tags})
            .eq('id', id)
            .select()

        if(error){
            console.log(error);
            setFormError("Please fill in all the fields");
        }


        if(data){
            console.log(data);
            setFormError(null);
            navigate('/');
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select()
                .eq('id', id)
                .single()

            if(error){
                setFormError("Please fill in all fields");
                navigate("/", { replace: true });
            }

            if(data){
                setTitle(data.title);
                setBody(data.body);
                setTags(data.tags);
            }
        }
        fetchBlog();
    }, [id, navigate])
 
    return ( 
        <div className="page">
            <form onSubmit={handleSubmit} className="bg-sky-500 p-5 max-w-md mx-auto my-0 rounded-md">
                <label className="flex mb-3">
                    <span className="">Title:</span>
                    <input 
                        className="w-full outline-none p-2"
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                </label>
                <label className="flex mb-3">
                    <span>Body:</span>
                    <input 
                        className="w-full outline-none p-2"
                        type="text" 
                        value={body} 
                        onChange={e => setBody(e.target.value)} 
                    />
                </label>
                <label className="flex mb-3">
                    <span>Tags:</span>
                    <select 
                        className="w-full outline-none p-2"
                        multiple 
                        onChange={e => setTags([...e.target.selectedOptions].map(option => option.value))}
                    >
                        <option value="tech">tech</option>
                        <option value="remote">remote</option>
                        <option value="job">job</option>
                        <option value="software dev">software dev</option>
                    </select>
                </label>
                <button className="bg-sky-700 p-2 text-white">Update Blog</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
 
export default Update;