import axios from '../api/axios';
import React from 'react'
import Modal  from 'react-modal';
import CustomeToast from './CustomeToast';

const InactiveLinkPopup = ({linkId, setLinkId, setDataLoad, openPopup, setOpenPopup}) => {
  
  const handleDeactivation = async () => {
  if(!linkId){
    return CustomeToast("Something went wrong please try again later", true)
  }
  try {
    const response = await axios.put(`/urls/disable/${linkId}`, {}, { headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
    setDataLoad((prev) => !prev)
    setLinkId('')
    setOpenPopup(false)

  } catch (error) {
    console.log(error);
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
            height: '27%',
            width: '20rem',
            background: '#181E29',
            border: '1px solid #353C4A',
            borderRadius: '10px',
            color: '#fff'
          },
          overlay: {
            backgroundColor: 'transparent',
           backdropFilter: 'blur(5px)'
          },
        }}
      >
        <h2 className="text-lg font-bold ">Are you sure ? </h2>
        <p className="text-sm font-light mt-1"> Do you want to <span className='text-red-500'>Disable</span> this link</p>

      <div className="flex gap-5 justify-end mt-12">
        <button className="rounded text-[11px] px-4 py-2 bg-[#144EE3]" onClick={()=> setOpenPopup(false)}>No</button>
          <button className="rounded text-[11px] px-4 py-2 bg-[#144EE3]" onClick={handleDeactivation}>Yes</button>
      </div>
      
      </Modal>
    </>
  )
}

export default InactiveLinkPopup
