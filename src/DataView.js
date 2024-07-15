import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { realTimeDatabase } from './firebase'
import { onValue, ref, remove } from 'firebase/database'
var DataView = (props) => {
    const dbRef = ref(realTimeDatabase, 'movieData')
    const [getMovieData, setGetMovieData] = useState([])
    useEffect(() => {
        onValue(dbRef, (snapShot) => {
            let dataRef = []
            snapShot.forEach((data)=>{
                const key = data.key;
                const value = data.val();
                dataRef.push({id: key, data: value});

                // console.log(data.key, data.val(), 'ds');
            })
            setGetMovieData(dataRef)
        })
        // axios.get('https://crud-f8d79-default-rtdb.firebaseio.com/movieData.json')
        // .then((response) => {
        //     let data = response.data;
        //     let dataRef = [];
        //     for(const key in data){
        //         dataRef.push({id: key, data: data[key]});
        //     }
            // setGetMovieData(dataRef)
        // });
    }, [])
    var onDelete = (id) => {
        console.log(id);
        remove(ref(realTimeDatabase, `movieData/${id}`))
    }
   
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Movie Name</th>
                    <th>Category</th>
                    <th>Release Date</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody> 
                {getMovieData.map(data => {
                    return(
                        <tr key={data.id}>
                            <td>{data.data.movieName}</td>
                            <td>{data.data.category}</td>
                            <td>{data.data.releaseDate}</td>
                            <td><img width="50px" height="50px" src={data.data.posterLink} /></td>
                            <td>
                                <Button variant="primary" onClick={() => props.updateId(data.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => onDelete(data.id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </>
  )
}
export default DataView