import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../Components/Forms/CategoryForm';
import { Modal } from 'antd';


const CreateCategory = () => {
    const [categories,setCategories] = useState([])
    const [name,setName]= useState("")
    const [visible,setVisible] = useState(false)
    const [selected,setSelected] = useState(null)
    const [updatedName,setUpdatedName]= useState("")

    

    
    //handle CategoryForm
    const handleSubmit = async (e)=>{

        e.preventDefault();

        try {
            
            const {data} = await axios.post('http://localhost:4000/api/category/create-category',{name})
            if(data?.success)
            {
            toast.success(`${name} is Created`)
            getAllCategory()

            
            }
            else{
                toast.error(data.message)
            }
            
        } 
        catch (error) {
            toast.error("Something went wrong in creating category")
            
        }


    }

    const getAllCategory = async () =>{
    try{
        const {data} = await axios.get('http://localhost:4000/api/category/get-category')
        if(data?.success)
        {
        setCategories(data?.allCategory)
        }
    }
    catch(error)
    {
        toast.error("Something went wrong")
    }

    }
    useEffect(()=>{
        getAllCategory()
    },[])


    //Update category
    const handleUpdate =async(e)=>{
            e.preventDefault()

            try {            
                if(updatedName){
                const{data} = await axios.put(`http://localhost:4000/api/category/update-category/${selected._id}`,{name:updatedName})
                if (data.success) {
                    toast.success(`${updatedName} is updated` )
                    setSelected(null)
                    setUpdatedName("")
                    setVisible(false)
                    getAllCategory()
                }
                else{
                    toast.error(data.message)
                }
            }
            } 
            catch (error) {
                toast.error("Something went wrong")
            }
        }   


        const handleDelete =async(c)=>{
            try {
                const {data} = await axios.delete(`http://localhost:4000/api/category/delete-category/${c._id}`)
                if(data.success){
                    toast.success(name + " "+data.message)
                    getAllCategory()
                }
                else{
                    toast.error(data.message)
                }
            } catch (error) {
                
            }
        }



    return (
        <Layout title={'Dashboard - Create Category'}>
            <div className="container-fluid m-3 p-3">

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='w-75'>
                            <div className="p-3 w-75">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                    <>
                                    <tr>
                                        <td key={ c._id}>{c.name}</td>
                                    <td> 
                                    <button  className='btn btn-primary ms-2' onClick={()=>{setVisible(true) ;setUpdatedName(c.name) ;setSelected(c)}} >Edit</button>
                                    <Modal footer={null} open={visible} onCancel={()=>{setVisible(false)}}>
                                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                                    </Modal>
                                    
                                    <button  className='btn btn-danger ms-2' onClick={()=>{handleDelete(c)}}>Delete</button>
                                    </td>
                                    </tr>                                   
                                    </>    
                                    ))}
                                            
                                        
                                    
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;