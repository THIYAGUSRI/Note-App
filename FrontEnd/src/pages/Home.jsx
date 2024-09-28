import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSlider from '../components/DashSlider';
import DashProfile from '../components/DashProfile';
import DashNotes from '../components/DashNotes';
import DashCreate from '../components/DashCreate';

export default function Home() {
  const location = useLocation()
  const [ tab, setTab ] = useState('')
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if(tabFromUrl)
    {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        <DashSlider />
      </div>
      {tab === 'notes' && <DashNotes />}
      {tab === 'profile' && <DashProfile />}
      {tab === 'create' && <DashCreate />}
    </div>
  )
}
