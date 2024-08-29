import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Layout/BaseUrl';
import CategoryForm from '../../components/Form/CategoryForm';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name,setName] = useState("");

    const getAllCategory = async()=>{
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/category/get-category`)

            if(data.success){
                setCategory(data.category)
                toast.success("Fetched the category.....")
            }
            console.log({category})
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong......")
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${baseUrl}/api/v1/category/create-category`,{name})
            console.log(data)
            if(data?.success){
                toast.success(`${data.category.name} is created`)
                getAllCategory()
            }
        } catch (error) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        getAllCategory()
    },[])

    return (
        <Layout title={"Dashboard-create category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>

                    <div className="col-md-9">
                        <h2>Manage Category</h2>
                        <div className='p-3'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((c)=>(
                                    <>
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button className='btn btn-primary'>Edit</button>
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
    )
}

export default CreateCategory
