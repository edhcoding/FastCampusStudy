import classNames from 'classnames/bind'
import Section from '@shared/Section'
import styles from './Map.module.scss'
import { useEffect, useRef } from 'react'
import { Location } from '@/models/wedding'

declare global {
  interface Window {
    kakao: any
  }
}

interface MapProps {
  location: Location
}

const cx = classNames.bind(styles)

export default function Map({ location }: MapProps) {
  const mapRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
    script.async = true
    // 우리는 카카오 지도를 비동기로 부르고 있음 아래를 보면 window.kakao.maps은 카카오맵이 준비가 될 때 사용할 수 있음
    // 그런데 위에 코드를 보면 외부코드를 비동기적으로 불러오다 보니까 아래의 script.onload 부분의 코드를 컨트롤 할 수가 없음
    // 따라서 autoload=false를 주어 미리 로드하는거를 방지하고 script로 불러온다음 아래 순서대로 진행할 수 있도록 안정적으로 제어할 수 있도록 설정함

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )

        const options = {
          center: position,
          level: 3,
        }

        const marker = new window.kakao.maps.Marker({
          position,
        })

        const map = new window.kakao.maps.Map(mapRef.current, options)
        marker.setMap(map)
      })
    }
  }, [location])

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapRef}></div>
        <a
          className={cx('btn-find-way')}
          href={location.link}
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome) => (
          <li>{waytocome}</li>
        ))}
      </ul>
    </div>
  )
}
