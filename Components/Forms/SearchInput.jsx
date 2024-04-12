import React from 'react';
import { useSearch } from '../../src/Context/SearchProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values,setValues] = useSearch()

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try 
        {
            if(values.keyword)
            {
            const {data} = await axios.get(`${backendUrl}/api/product/search/${values.keyword}`)
            setValues({...values,result : data})
            navigate('/search')
            }            
        } 
        catch (error) 
        {
            console.log(error);    
        }
    }
    return (
        <div>
            <form className="d-flex" onSubmit={handleSubmit} >
                <input className="form-control me-2 " 
                type="search"
                placeholder="Search" 
                aria-label="Search" 
                value={values.keyword}
                onChange={(e) => setValues({...values,keyword : e.target.value})}
                />
                <button className="btn btn-outline-success ms-auto" style={{backgroundColor : '#05386B',color:'#EDF5E1',fontFamily:'cursive'}} type="submit">
                    Search
                </button>
            </form>

        </div>
    );
};

export default SearchInput;