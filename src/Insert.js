import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import {storage} from './firebase'
import {getDownloadURL, uploadBytes, ref} from 'firebase/storage'
import {ref as sRef, set, update} from 'firebase/database'
import { realTimeDatabase } from "./firebase";

var Insert = (props) => {
    const [data, setData] = useState({
        movieName: '',
        category: '',
        releaseDate: '',
        posterLink: ''
    })
    const [updateState, setUpdateState] = useState(false)
    const [posterFile, setposterFile] = useState()

    // const dataRef = ref(realTimeDatabase, 'movieData')
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if(updateState)
        {
            if(posterFile){
                upload(posterFile)
            }
            else{
                update(sRef(realTimeDatabase, `movieData/${props.updateMovieId}`), data)
            }

        }
        else{
            if(posterFile){
                upload(posterFile)
            }
            else{
                set(sRef(realTimeDatabase, `movieData/${Date.now()}`), data)
            }
        }
        // axios.post('https:// crud-f8d79-default-rtdb.firebaseio.com/movieData.json', data)
        // .then((response) => {
        //     console.log(response);
        // })
        // .catch(e => {
        //     console.log(e, 'error');
        // });
    
    }
    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});
    }

    useEffect(() => {
      if(props.updateMovieId != ''){
        axios.get(`https://crud-f8d79-default-rtdb.firebaseio.com/movieData/${props.updateMovieId}.json`)
        .then(res => {
            console.log(res);
            setData(res.data)   
            const{category, movieName, posterLink, releaseDate} = res.data
        })
        setUpdateState(true)
      }
      else{
        setUpdateState(false)
      }
    }, [props.updateMovieId])

    
    var upload = async (file) => {
        let r = (Math.random+1).toString(36).substring(7);
        const fileRef = ref(storage, r+".jpg");
        await uploadBytes(fileRef, file)
        const posterLink = await getDownloadURL(fileRef)
        if(updateState){
            update(sRef(realTimeDatabase, `movieData/${props.updateMovieId}`), {...data, posterLink})
        }
        else{
            set(sRef(realTimeDatabase, `movieData/${Date.now()}`), {...data, posterLink})
        }
    }
   
  return (
    <>
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control type="text" name="movieName" placeholder="Enter movie name" onChange={onChangeHandler} value={data.movieName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
            <Form.Label>Movie Category</Form.Label>
            <Form.Select aria-label="Default select example" name="category" value={data.category} onChange={onChangeHandler}>
                <option>Select Category</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="action">Action</option>
                <option value="horror">Horror</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
            <Form.Label>Movie Release Date</Form.Label>
            <Form.Control type="date" name="releaseDate" placeholder="Enter movie name" onChange={onChangeHandler} value={data.releaseDate} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
            <Form.Label>Movie Poster</Form.Label>
            <Form.Control type="file" name="posterLink" placeholder="Enter movie name" onChange={(e) => {
                setposterFile(e.target.files[0])
            }} />
        </Form.Group>
        {updateState?(<Button variant="primary" type="submit">
            Update
        </Button>) : <Button variant="primary" type="submit">
            Insert
        </Button>}
        
      </Form>
    </>
  );
};

export default Insert;
