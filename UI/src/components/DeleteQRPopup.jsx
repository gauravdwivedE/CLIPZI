import axios from '../api/axios';
import React, { use, useState } from 'react'
import Modal  from 'react-modal';
import CustomeToast from './CustomeToast';

const DeleteQRPopup = ({QRId, openPopup, setOpenPopup, setDataLoad}) => {
 
const [isdelete, setIsDelete] = useState(false)
const [random, setRandome] = useState(100)
const [deleteField, setDeleteField] = useState('')

const generateRandome  = () =>  setRandome(Math.floor(Math.random()*100))

const handleQRDelete = async () => {
  if(deleteField != random){
    return CustomeToast("Numbers did't match")
  }
  
  if(!QRId){
      return CustomeToast("Something went wrong please try again later", true)
  }
  
  try {
    const response = await axios.delete(`/qrs/${QRId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   
    if(response.status === 200){
      CustomeToast(response.data.message)
      setDataLoad((prev) => !prev)
      setOpenPopup(false)
      QRId('')
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
            height: '30%',
            width: '21rem',
            background: '#181E29',
            border: '1px solid #353C4A',
            borderRadius: '10px',
            color: '#fff',
            overflow: 'hidden',
            zIndex: 999
            
          },
          
          overlay: {
            backgroundColor: 'transparent',
           backdropFilter: 'blur(5px)'
          },
        }}
      >
        <h2 className="text-lg font-bold ">Delete QR </h2>
        <p className="text-[13px] font-light mt-1">You can't revert this change</p>
              
       <div className="flex gap-5  mt-18 items-end">
         {!isdelete && <button className="rounded text-[11px] px-4 py-2 bg-[#144EE3]" onClick={()=> setOpenPopup(false)}>Cancel</button>}
         {!isdelete &&  <button className="rounded text-[11px] px-4 py-2 bg-red-500" onClick={() => {generateRandome(), setIsDelete(true)}}>Delete this Link</button>}
        
     {isdelete &&  <div className="flex gap-2 sm::gap-5  items-end" > 
            <input 
            value={deleteField}
            onChange={(e) => setDeleteField(e.target.value)}
            type="text" id = 'password' placeholder={`Enter ${random} to delete`}
            className='p-2 outline-none border-none bg-white rounded placeholder:text-gray-400 text-[11px]  text-gray-800'
            />
           
        <button className="rounded text-[10px] px-4 py-2 bg-[#144EE3]" onClick={()=> setOpenPopup(false)}>Cancel</button>
      
          <button className="rounded text-[10px] px-4 py-2 bg-red-500" onClick={() => handleQRDelete()}>Delete</button>
            
      </div> }
      </div>
      
      </Modal>
    </>
  )
}

export default DeleteQRPopup
