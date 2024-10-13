import styles from './ImageGallery.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'
import ImageViewer from '../imageViewer'
import { useState } from 'react'

interface ImageGalleryProps {
  galleryImages: string[]
}

const cx = classNames.bind(styles)

export default function ImageGallery({ galleryImages }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(-1)

  const open = selectedIdx > -1

  const handleSelectedImage = (i: number) => {
    setSelectedIdx(i)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {galleryImages.map((src, i) => (
            <li
              key={i}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImage(i)}
            >
              <img src={src} alt="사진첩 이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        galleryImages={galleryImages}
        open={open}
        selectedIdx={selectedIdx}
        handleClose={handleClose}
      />
    </>
  )
}
