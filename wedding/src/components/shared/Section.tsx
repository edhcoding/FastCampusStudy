import styles from './Section.module.scss'
import classNames from 'classnames/bind'

interface SectionProps {
  children: React.ReactNode
  className?: string
}

const cx = classNames.bind(styles)

export default function Section({ children, className }: SectionProps) {
  return <section className={cx(['container', className])}>{children}</section>
}
