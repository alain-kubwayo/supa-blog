import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if(!title || !body || tags.length === 0){
            setFormError("Please fill in all the fields correctly");
            return;
        }

        const blog = {
            title,
            body,
            tags
        }

        const {data, error} = await supabase
            .from("blogs")
            .insert([blog])
            .select();

        if(error){
            console.log(error);
            setFormError("Please fill in all the fields correctly");
        }

        if(data){
            setFormError(null);
            console.log(data);
            navigate("/");
        }
    }

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
                        <option value="frontend">frontend</option>
                    </select>
                </label>
                <button className="bg-sky-700 p-2 text-white">Create Blog</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
 
export default Create;