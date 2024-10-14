import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import FullScreenMessage from '@shared/FullScreenMessage'
import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import { Wedding } from '@models/wedding'
import ImageGallery from '@components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/Invitation'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'

const cx = classNames.bind(styles)
// bind를 해주지 않으면 styles.을 계속 붙여 줘야 한다. 꼭 bind 해서 쓸 것!

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // 1. wedding 데이터 호출
  useEffect(() => {
    setIsLoading(true)
    // callback, promise, async/await
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('데이터를 불러오지 못했습니다.')
        }

        return res.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((e) => {
        console.log('Error 발생:', e)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <FullScreenMessage type="loading" />
  }

  if (isError) {
    return <FullScreenMessage type="error" />
  }

  if (wedding === null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        intro={intro}
      />
      <Invitation invitation={invitation} />
      <ImageGallery galleryImages={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      {JSON.stringify(wedding)}
    </div>
  )
}

export default App
