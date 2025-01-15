import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAddMemo, useGetMemos } from '../api';
import { useStore } from '../store';


const AccordionItem = ({ name,  isOpen, onClick, id, update_memo, deleteId }) => {
   const {data} =  useGetMemos(id, isOpen)

  
  return (
    <div className="border-b border-gray-200 " id={`category-${id}`}>
      <button
      id={`category-${id}-title`}
        className="w-full py-4 px-6 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
        onClick={onClick}
      >
        <span className="font-medium text-gray-900">{name}</span>
        <span 
          className={`material-icons-outlined text-gray-600 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
         <ChevronDown/>
        </span>
      </button>

      {isOpen &&
        data?.filter((memo) => memo.id !== deleteId)?.map((memo) =>  <div
        onClick={() => update_memo(memo.id)}
        key={memo.id}
        id={`memo-${memo.id}`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ml-10 cursor-pointer ${
            isOpen ? 'max-h-96 opacity-100  pb-3 my-2' : 'max-h-0 opacity-0'
          }`}
        >
          {memo.title}
        </div> )
      }
   
    </div>
  );
};

const Accordion = ({ items }) => {
 
  const {openIndex, setOpenIndex, update_memo, deleteId} = useStore()
  const { mutateAsync: add_memo} =  useAddMemo(openIndex)
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddMemo =  async () => {
    const payload = {
        title: "New memo",
        content: "New memo",
        category_id:  openIndex
    }
    try {
        await add_memo(payload)
    } catch (error) {
        console.log('an error occurred')
    }
  }
  
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          name={item.name}
          content={item.content}
          isOpen={openIndex === item.id}
          onClick={() => handleItemClick(item.id)}
          id={item.id}
          update_memo={update_memo}
          deleteId={deleteId}
        />
      ))}

      <div className='my-5 px-3 flex justify-end'>
      <button
       onClick={handleAddMemo}
        disabled={openIndex === null}
        type="submit"
        id="new-memo"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        New
      </button>
      </div>
    </div>
  );
};

export default Accordion;

