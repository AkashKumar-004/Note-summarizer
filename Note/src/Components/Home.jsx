import React, { useEffect, useState } from 'react';
import NoteForm from '../Components/Note';
import NoteCard from '../Components/NoteCard';
import { getNotes } from '../Api/api';
import { motion } from 'framer-motion';

function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0e0f1a] text-white overflow-hidden px-4 py-8">

      <div className="absolute inset-0 z-0">
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 mb-8 text-center"
        >
          Galactic Note Summarizer
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NoteForm onNoteCreated={fetchNotes} />
        </motion.div>

        <motion.div
          className="mt-6 space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {notes.map(note => (
            <motion.div
              key={note._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <NoteCard note={note} onSummarized={fetchNotes} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
