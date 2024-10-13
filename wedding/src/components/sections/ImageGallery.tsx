import styles from './ImageGallery.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'

interface ImageGalleryProps {
  galleryImages: string[]
}

const cx = classNames.bind(styles)

export default function ImageGallery({ galleryImages }: ImageGalleryProps) {
  return (
    <Section title="사진첩">
      <ul className={cx('wrap-images')}>
        {galleryImages.map((src, i) => (
          <li key={i} className={cx('wrap-image')}>
            <img src={src} alt="사진첩 이미지" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
