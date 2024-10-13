import styles from './Heading.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'

const cx = classNames.bind(styles)

export default function Video() {
  return (
    <Section>
      <div className={cx('')}></div>
    </Section>
  )
}
