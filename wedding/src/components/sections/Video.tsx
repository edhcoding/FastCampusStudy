import styles from './Video.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'

const cx = classNames.bind(styles)

export default function Video() {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/assets/poster.jpg"
      >
        {/* source를 따로 뺀 상태에서 autoPlay를 주면 자동재생이 안되는데 muted를 주면 자동재생이 됨 */}
        <source src="/assets/main.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}
