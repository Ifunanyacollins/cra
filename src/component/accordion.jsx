import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useGetMemos } from '../api';
import { useStore } from '../store';


const AccordionItem = ({ name,  isOpen, onClick, id, update_memo }) => {
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
        data?.map((memo) =>  <div
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
  
  const {openIndex, setOpenIndex, update_memo} = useStore()

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          name={item.name}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
          id={item.id}
          update_memo={update_memo}
        />
      ))}
    </div>
  );
};

export default Accordion;

