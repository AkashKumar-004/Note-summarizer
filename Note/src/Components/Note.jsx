import React, { useState } from 'react';
import { addNotes, contentsum } from '../Api/api';

function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading,setLoading] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNotes({ title, content });
    setTitle('');
    setContent('');
    onNoteCreated();
  };
  
  const AIcontent=async ()=>{
    try{
      setLoading(true);
      const data=await contentsum({title})
      setContent(data);
    }
    catch(err)
    {
      console.error(err);
    }
    finally
    {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#121624] p-6 rounded-xl shadow-md shadow-cyan-500/20">
      
      <input
        type="text"
        placeholder="Note Title"
        className="w-full px-4 py-2 bg-[#1a1f2e] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Your thoughts among the stars..."
        className="w-full px-4 py-2 bg-[#1a1f2e] text-white border border-purple-500 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
    <button
      type="button"
      onClick={AIcontent}
      className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-all"
    >
      {loading ? '🚀 Generating....':"✨ Generate AI Content"}
  </button>


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold rounded-md shadow-md hover:shadow-purple-500/50 transition-all"
      >
        🚀 Create Note
      </button>
    </form>
  );
}

export default NoteForm;
