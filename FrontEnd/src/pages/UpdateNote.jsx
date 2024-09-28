import { Alert, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

export default function UpdateNote() {

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

useEffect(() => {
    try {
        const fetchNote = async () => {
          const res = await fetch(`/api/note/getnotes?noteId=${noteId}`);
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
            setPublishError(data.message);
            return;
          }
          if (res.ok) {
            setPublishError(null);
            setFormData(data.notes[0]);
          }
        };
        fetchNote();
      } catch (error) {
        console.log(error.message);
      }
},[noteId]);
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const res = await fetch(`/api/note/updatenote/${noteId}/${currentUser._id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
          setPublishError(data.message);
          return;
      }
      if (res.ok) {
          setPublishError(null);
          navigate(`/note/${data.title}`);
      }
  } catch (error) {
      setPublishError('Something went wrong');
  }
};


  return (
    <div className='max-w-lg mx-auto p-5 w-full min-h-screen'>
        <h1 className='text-3xl font-semibold my-7 text-center'>Update the Note</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mb-12' onChange={(value) => setFormData({ ...formData, content: value })} value={formData.content}/>
                <div className='flex flex-col w-full mt-8'>
                <Button gradientDuoTone='pinkToOrange' type='submit'>Update</Button>
                </div>
            </form>
            {publishError && ( <Alert className='mt-5' color='failure'> {publishError} </Alert> )}
    </div>
  )
}
