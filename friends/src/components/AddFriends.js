import React, { useState } from 'react'

import { authios } from '../utils/authios';

const AddFriends = (props) =>{
    const [dude, setDude] = useState({
        name: '',
        email: '',
        age: '',
        id: Date.now()
    })

    const postFriend = e =>{
        e.preventDefault()
        authios().post('/api/friends', {
            name: dude.name,
            email: dude.email,
            age: dude.age,
            id: dude.id
        }).then(
            res => {
                console.log(res, 'posted friend')
            }
        ).catch(
            error => console.log(error)
        )
        props.getData()
    }

    const handelChange = (event) => {
        setDude({...dude, [event.target.name]: event.target.value})
    }

    return(
        <form onSubmit={event => postFriend(event)}>
        <label>
            Name:
            <input type="text" name="name" value={dude.name} onChange={event =>handelChange(event)} required/>
        </label>
        <label>
            Age:
            <input type="text" name="age" value={dude.age} onChange={event => handelChange(event)} required/>
        </label>
        <label>
            Email:
            <input type="text" name="email" value={dude.email} onChange={event => handelChange(event)} required/>
        </label>
        <button type="submit">post that boi</button>
    </form>
    )

}

export default AddFriends