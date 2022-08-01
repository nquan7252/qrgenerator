import React, { Component, useRef, useState } from 'react';
import Qr from '../Components/Qr.js';
import {qrversion} from '../Helper/helper.js'
function Home() {
    const input=useRef()
    const [version,setVersion]=useState(1);
    const [data,setData]=useState(null)
    const [newSubmit,setNewSubmit]=useState(false);
    const handleOptionChange=(event)=>{
       input.current.value=''
        setVersion(Number(event.target.value))
    }
    const handleInputChange=(event)=>{
        if (event.target.value.length>qrversion[version].max){
            console.log('reached maximum')
        }
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if (input.current.value.length==0||input.current.value.length>qrversion[version].max){
            console.log('invalid')
        }
        else{
            console.log('submitted')
            setData(input.current.value)
            setNewSubmit(!newSubmit)
        }
    }
    return <div className='home'>
        <form onSubmit={handleSubmit}>
        <select onChange={handleOptionChange}>
            {new Array(40).fill().map((element,index)=>index+1).map((element)=><option value={element}>{element}</option>)}
        </select>
        <input ref={input} onInput={handleInputChange}></input>
        <button>Generate</button>
        </form>
        {data&&<Qr newSubmit={newSubmit} version={version} data={data}/>}
    </div>;
}

export default Home;