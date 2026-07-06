import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null) // Cleaned up React. prefix
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    if (!doctors) return;
    const info = doctors.find(doc => doc._id == docId)
    setDocInfo(info)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // FIXED: Set endTime relative to the loop's specific day (i) instead of a hardcoded +1
      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12:true })

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
    
      setDocSlots(prevSlots => [...prevSlots, timeSlots])
    }
  } // FIXED: Added missing closing bracket for getAvailableSlots function

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  useEffect(() => {
    if (docInfo) {
      console.log(docInfo);
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  console.log("Current Doctor Info:", docInfo);
  
  return docInfo && (
    <div>
      {/* -----Doctor Details Main Flex Container ----- */}
      <div className='flex flex-col sm:flex-row gap-4 items-start'>
        
        {/* 1. Doctor Image Container */}
        <img className='bg-blue-600 w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />

        {/* 2. White Info Box Container */}
        <div className='flex-1 border border-gray-400 rounded-lg px-8 py-7 bg-white mx-2 sm:mx-0'>
          
          {/* Doc Info : name, degree, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo?.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo?.degree} - {docInfo?.speciality}</p> 
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
          </div>

          {/* Doctor About Section */}
          <div className='mt-4'>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.Info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo?.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className='mt-4 text-gray-500 font-medium'>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo?.fee}</span>
          </p>
          
        </div> 
        
      </div> 
          {/*-----Booking slots ----- */}
          <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
            <p>Booking Slots</p>
            <div className='flex gap-3 items-center w-full scroll mt-4'>
              {
              docSlots.length > 0 && docSlots.map((item, index) => (
                <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white ' : 'border border-gray-200'}`} key={index} >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
                ))
              }
            </div>

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
              {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-xm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-300'}`} key={index} >
                    {item.time.toLowerCase()}
                </p>
              ))}
            </div>
            <button className='bg-blue-600 text-white text-sm font-light  px-14 py-3 rounded-full my-6'>Book an appointment</button>
          </div>

          {/* ----Listing Related Doctors */}
          <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
          </div>
  )
}


export default Appointment