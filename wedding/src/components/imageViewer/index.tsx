import styles from './ImageViewer.module.scss'
import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './swiper.css'

interface ImageViewerProps {
  galleryImages: string[]
  open: boolean
  selectedIdx: number
  handleClose: () => void
}

const cx = classNames.bind(styles)

export default function ImageViewer({
  galleryImages,
  open = false,
  selectedIdx,
  handleClose,
}: ImageViewerProps) {
  if (open === false) {
    return null
  }

  // className 으로 dimmed 지은 이유가 carousel이나 뒤에 배경 흐릿하게 해주는 부분을 dimmed 라고 부름
  return (
    <div className={cx('dimmed')}>
      <CloseButton className={cx('icon-close')} handleClose={handleClose} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        initialSlide={selectedIdx}
      >
        {galleryImages.map((src, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={src} alt="이미지 뷰어" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function CloseButton({
  handleClose,
  className,
}: {
  handleClose: () => void
  className: string
}) {
  return (
    <svg
      className={className}
      version="1.1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClose}
    >
      <g id="info" />
      <g id="icons">
        <path
          d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
          id="exit"
        />
      </g>
    </svg>
  )
}
