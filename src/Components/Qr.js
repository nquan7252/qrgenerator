import React, { Component,useEffect,useState } from 'react';
import { qrversion } from '../Helper/helper';
import { init } from '../Helper/init';
import './Qr.css'
function Qr(props) {
    const [version,setVersion]=useState(props.version)
    const [size,setSize]=useState(qrversion[props.version].size)
    const [data,setData]=useState(props.data)
    useEffect(()=>{
        console.log('prop version',props.version)
        setSize(qrversion[props.version].size)
        setData(props.data)
        setVersion(props.version)
    },[props.newSubmit])
    const [array,setArray]=useState([[]])
    useEffect(()=>{
        let mat=new Array(qrversion[props.version].size).fill(-1)
        for (let i in mat){
            mat[i]=new Array(qrversion[props.version].size).fill(-1)
        }
        init(mat,props.version,data)
        setArray(JSON.parse(JSON.stringify(mat)))
    },[props.newSubmit])
    return <div className='qr'>
        {console.log('body')}
        {array.map(element=><div className='row'>{element.map(element=><span className={element==1?'one':element==0?'zero':element==2?'two':'empty'}></span>)}</div>)}
    </div>;
}

export default Qr

