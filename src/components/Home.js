import React,{useEffect,useState} from "react";
import CourseApi from "../API/CourseApi";
import {toast} from 'react-toastify'
import {Navigate, NavLink,useNavigate} from 'react-router-dom'

function Home(props){
    const [course, setCourse] = useState([])

    //call the api =>mount
    useEffect(()=>{
        CourseApi.getAll().then(res => { 
            console.log('course', res);
            setCourse(res.data)
        }).catch(err=>toast.error(err.message))
    },[course])//update

    const delHandler =async(id) =>{
        if(window.confirm(`Are you sure to delete an id = ${id}?`)){
            CourseApi.delete(id).then(res=>{
                toast.success("Successfully Delete")
                Navigate(`/`)
            }).catch(err => toast.error(err.message))
        }else{
            toast.warning('Delete terminate')
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3">Home</h3>
                </div>
            </div>
            <div className="row">
                {
                    course.map((item,index)=>{
                        return(
                            <div className="col-md-4 mt-2" key={index}>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-heading text-center">{item.title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <strong>Fee</strong>
                                                <span className="float-end badge bg-success">&#8377;{item.fee}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Duration</strong>
                                                <span className="float-end badge bg-success">{item.duration}</span>
                                            </li>
                                            <li className="list-group-item">
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <NavLink to={`/update/${item.id}`} className="btn btn-info">Edit</NavLink>
                                        <button onClick={()=>delHandler(item.id)} className="btn btn-danger float-end">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home