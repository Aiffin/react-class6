import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseApi from "../API/CourseApi";

function Create(props){
    const [course,setCourse] = useState({
        title:"",
        fee:0,
        duration:""
    })

    //navigate
    const navigate =useNavigate()

    // to read value from input  create func
    const readValue = (e) =>{
        // console.log('event:',e.target)
        const {name,value}=e.target;
        setCourse({...course,[name]:value})
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("course:",course);
        CourseApi.create(course).then(res=>{
            toast.success('COURSE CREATED Successfully')
            navigate(`/`)
        }).catch(err => toast.error(err.message))
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">create</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>

                                <div className="form-group mt-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" id="title" value={course.title} onChange={readValue} className="form-control" required/>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="fee">Fee</label>
                                    <input type="text" name="fee" id="fee" value={course.fee} onChange={readValue} className="form-control" required/>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="duration">Duration</label>
                                    <input type="text" name="duration" id="duration" value={course.duration} onChange={readValue} className="form-control" required/>
                                </div>

                                <div className="form-group mt-2">
                                    <input type="submit" value="Create" className="btn btn-success" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create