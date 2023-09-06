import React from 'react';

// 1. Define TypeScript interface for the component's props.
interface ModalProps {
  isOpen?: boolean;
  onClose: VoidFunction
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen = false, onClose, children })=>{

    function handleClose(event: React.MouseEvent<HTMLElement>){
        const target = event.target as HTMLElement;
        if(target.id==="Wrapper"){
            onClose();
        }
    }

    if(!isOpen) return null;
    else return (
    <div id="Wrapper" onClick={handleClose} className='fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[1000px] h-[600px] overflow-scroll flex flex-col'>
            <button className='text-white place-self-end text-xl' onClick={onClose}>X</button>
            <div className='bg-white p-2 rounded'>
               {children}
            </div>
        </div>
    </div>
  )
}

export default Modal;