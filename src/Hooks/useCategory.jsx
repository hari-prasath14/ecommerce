import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useCategory = () => {

    const [categories,setCategories] =useState()

    const getCategory = async() =>{
        try 
        {
            const {data} = await axios.get(`${backendUrl}/api/category/get-category`)
            setCategories(data?.allCategory)
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategory()
    },[])

    return categories
}

export default useCategory;