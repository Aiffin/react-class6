import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import CourseApi from '../API/CourseApi'

function Update(props){
    const [course,setCourse] = useState({
        title:'',
        fee:0,
        duration:''
    })
    const params =useParams()//to read router params
    const navigate = useNavigate()//to navigate

    useEffect(()=>{
        CourseApi.getSingle(params.id).then(res=>{
            console.log('Single course:',res.data)
            setCourse(res.data)
        }).catch(err=>toast.error(err.message))
    },[])

    const readValue = (e) =>{
        const {name,value} = e.target;
        setCourse({...course, [name]: value}) 
    }


    const submitHandler=async(e)=>{
        try{
            e.preventDefault();
            console.log('upadte data:',course)
            CourseApi.update(course,params.id).then(res=>{
                toast.success("course updated successfully")
                navigate(`/`)
            }).catch(err => toast.error(err.message))
        }catch(err){
            toast.error(err.message)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3">Update</h3>
                </div>
            </div>
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form action="" autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" value={course.title} onChange={readValue} className="form-control" required />
                            </div>   
                            <div className="form-group mt-2">    
                                <label htmlFor="fee">Fees</label>
                                <input type="number" name="fee" id="fee" value={course.fee} onChange={readValue} className="form-control" required />
                            </div>    
                            <div className="form-group mt-2">    
                                <label htmlFor="duration">Duration</label>
                                <input type="text" name="duration" id="duration" value={course.duration} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Submit" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update