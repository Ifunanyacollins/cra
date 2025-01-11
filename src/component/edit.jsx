import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useGetMemo, useUpdateMemo } from '../api';

const Edit = () => {
  const { memoId } = useStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {data, isLoading} =   useGetMemo(memoId)
  const {mutateAsync: update} = useUpdateMemo(memoId)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {title, content, category_id: data.category_id}
    try {
        await update(payload)
    } catch (error) {
        console.log('error processing data')
    }
  };

  useEffect(() => {
    if(data){
    setTitle(data.title)
    setContent(data.content)
    }
  }, [isLoading, memoId])

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="memo-title"
       
          defaultValue={title}
          disabled={!!!data}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-200"
          placeholder="Enter title"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <textarea
          disabled={!!!data}
          id="memo-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none py-2 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-200"
          placeholder="Enter content"
        />
      </div>

      <button
        disabled={!!!data}
        type="submit"
        id="save-memo"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        Save
      </button>
    </form>
  );
};

export default Edit;