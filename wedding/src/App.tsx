import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './App.module.scss'
import FullScreenMessage from './components/shared/FullScreenMessage'

const cx = classNames.bind(styles)
// bind를 해주지 않으면 styles.을 계속 붙여 줘야 한다. 꼭 bind 해서 쓸 것!

function App() {
  const [wedding, setWedding] = useState(null)
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

  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>
}

export default App
