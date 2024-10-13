import styles from './Section.module.scss'
import classNames from 'classnames/bind'

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
}

const cx = classNames.bind(styles)

export default function Section({ children, className, title }: SectionProps) {
  return (
    <section className={cx(['container', className])}>
      {title !== null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}
