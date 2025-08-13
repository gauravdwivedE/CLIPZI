import axios from '../api/axios';
import React, { use, useState } from 'react'
import Modal  from 'react-modal';
import CustomeToast from './CustomeToast';

const ChangePasswordPopup = ({linkId, setDataLoad, openPopup, setOpenPopup}) => {
 
const [password, setPassword] = useState('')
const [isdelete, setIsDelete] = useState(false)
const [random, setRandome] = useState(100)
const [deleteField, setDeleteField] = useState('')

const generateRandome  = () =>  setRandome(Math.floor(Math.random()*100))

const handlePasswordChange = async () => {
  if(!linkId){
    return CustomeToast("Something went wrong please try again later", true)
  }
  try {
    const response = await axios.put(`/urls/password/${linkId}`, {password}, {headers: {
        Authorization:   `Bearer ${localStorage.getItem('token')}`
    }
    })

    if(response.status === 200){
        setDataLoad((prev) => !prev)
        CustomeToast(response.data.message)
        setPassword('')
        setOpenPopup(false)
    }
  } catch (error) {
    console.log(error);
    
  }
}

const handleLinkDelete = async () => {
  if(!linkId){
    return CustomeToast("Something went wrong please try again later", true)
  }
  if(deleteField != random){
    return CustomeToast("Numbers did't match")
  }
  try {
    const response = await axios.delete(`/urls/${linkId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   
    if(response.status === 200){
      CustomeToast(response.data.message)
      setDataLoad((prev) => !prev)
      setOpenPopup(false)
      linkId('')

    }
  } catch (error) {
    
  }

}

  return (
    <>
      <Modal
        isOpen={openPopup}
        onRequestClose={() => setOpenPopup(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '55%',
            width: '21rem',
            background: '#181E29',
            border: '1px solid #353C4A',
            borderRadius: '10px',
            color: '#fff',
            overflow: 'hidden'
          },
          overlay: {
            backgroundColor: 'transparent',
           backdropFilter: 'blur(5px)'
          },
        }}
      >
        <h2 className="text-lg font-bold ">Manage link protection </h2>
        <p className="text-[13px] font-light mt-1"> Change or update existing password</p>
        <div className='flex flex-col space-y-1 my-4'>
            <label htmlFor="password">Password</label>
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" id = 'password' placeholder='Enter password'
            className='p-2 outline-none border-none bg-white rounded placeholder:text-gray-800 text-[14px] text-gray-800'
            />
        </div>
      <div className="flex gap-5 justify-end mt-7">
        <button className="rounded text-[11px] px-4 py-2 bg-[#144EE3]" onClick={()=> setOpenPopup(false)}>Cancel</button>
          <button className="rounded text-[11px] px-4 py-2 bg-[#144EE3]" onClick={handlePasswordChange}>Save</button>
      </div>
        <p className='text-red-500 text-[10px] mt-4'>Note: You can't see your protected password because it is fully encrypted</p>
      
       <div className="flex gap-5  mt-7 items-end">
         {!isdelete &&  <button className="rounded text-[11px] px-4 py-2 bg-red-500" onClick={() => {generateRandome(), setIsDelete(true)}}>Delete this Link</button>}
     
     {isdelete &&  <div className="flex gap-5  items-end" > 
            <input 
            value={deleteField}
            onChange={(e) => setDeleteField(e.target.value)}
            type="text" id = 'password' placeholder={`Enter ${random} to delete`}
            className='p-2 outline-none border-none bg-white rounded placeholder:text-gray-400 text-[11px] text-gray-800'
            />
          <button className="rounded text-[11px] px-4 py-2 bg-red-500" onClick={() => handleLinkDelete()}>Delete</button>
            
      </div> }
      </div>
      
      </Modal>
    </>
  )
}

export default ChangePasswordPopup
