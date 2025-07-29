import React, { useState } from 'react';
import { deletebyid, summ } from '../Api/api';

function NoteCard({ note, onSummarized }) {
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    try {
      setLoading(true);
      await summ(note._id);
      onSummarized();
    } catch (err) {
      console.error("Error summarizing note:", err);
      alert("Failed to summarize note.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
  try {
    await deletebyid(_id);
    alert("🗑️ Note deleted successfully!");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("❌ Failed to delete the note.");
  }
};
  return (
    <div className="bg-[#1a1f2e] border border-cyan-600 rounded-xl p-5 shadow-md shadow-cyan-500/20 text-white transition-all hover:shadow-lg hover:shadow-purple-600/30 relative">
  <div className="flex justify-between items-start">
    <h2 className="text-xl font-semibold text-cyan-400 mb-2">{note.title}</h2>
    <button
      onClick={() => handleDelete(note._id)}
      className="text-sm px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-red-500/50 transition-all duration-200"
    >
      🗑️ Delete
    </button>
  </div>

  <p className="text-gray-300">{note.content}</p>

  {note.summary && (
    <div className="mt-3 p-3 bg-[#23283b] border-l-4 border-green-400 text-green-300 rounded-md">
      <strong>AI Summary:</strong> {note.summary}
    </div>
  )}

  <button
    onClick={summarize}
    disabled={loading}
    className={`mt-4 w-full py-2 rounded-md font-semibold transition-all 
      ${loading
        ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed'
        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-cyan-500 hover:to-purple-600'
      } text-white shadow-lg shadow-cyan-500/20 hover:shadow-purple-500/30`}
  >
    {loading ? '🚀 Summarizing...' : '✨ Summarize with AI'}
  </button>
</div>

  );
}

export default NoteCard;
