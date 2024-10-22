import { Button, Card, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashNotes() {
  const { currentUser } = useSelector((state) => state.user);
  const [userNotes, setUserNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState('');

  // Fetching the notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch(`/api/note/getnotes?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserNotes(data.notes);
        } else {
          console.error('Failed to fetch notes');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (currentUser) {
      fetchNotes();
    }
  }, [currentUser]);

  // Handle delete functionality
  const handleDeleteNote = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/note/deletenote/${noteIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUserNotes(userNotes.filter((note) => note._id !== noteIdToDelete));
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full p-4 flex flex-wrap gap-4 justify-center">
      {userNotes.length > 0 ? (
        userNotes.map((note) => (
          <Card
            className="w-[240px] h-[320px] p-4 flex flex-col justify-between"
            key={note._id}
          >
            <div className="flex-grow prose border-b border-white pb-2">
              <Link to={`/note/${note.title}`}>
                <div
                  className="text-gray-700 dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: note.content.length > 150
                      ? note.content.substring(0, 150) + '...'
                      : note.content,
                  }}
                />
              </Link>
            </div>

            {/* Buttons remain in the flow at the bottom */}
            <div className="flex justify-between pt-2">
              <Link to={`/updatenote/${note._id}`}>
                <Button size="xs" className='w-15' gradientDuoTone="purpleToBlue">
                  Edit
                </Button>
              </Link>
              <Button
                color="failure"
                size="xs"
                onClick={() => {
                  setShowModal(true);
                  setNoteIdToDelete(note._id);
                }} className='w-15'>
                Delete
              </Button>
            </div>   
          </Card>
        ))
      ) : (
        <p>You have no notes yet!</p>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this note?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteNote}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
