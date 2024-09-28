import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';

export default function NotePage() {


const { noteTitle }= useParams();
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [note, setNote] = useState(null);
console.log(note);


useEffect ( () => {
  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/note/getnotes?title=${noteTitle}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setNote(data.notes[0]);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  fetchNote();
},[noteTitle]);

if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );



  return (
    <main className="p-4 sm:p-6 lg:p-8 flex flex-col mx-auto min-h-screen max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
  <div className="bg-white shadow-md rounded-md p-4 sm:p-6 md:p-8 lg:p-12 w-full flex flex-col justify-between min-h-[80vh]">
    <div 
      className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full"
      dangerouslySetInnerHTML={{ __html: note && note.content }}
    />
    <div>
    <div className='mt-4 flex justify-center border rounded-full border-blue-500 hover:bg-blue-500 hover:text-white p-1 w-1/3'>
            <Link to='/home?tab=notes'>
               <span className='text-xl text'>Back</span>
            </Link>
    </div>
    </div>
  </div>
</main>

  )
}
