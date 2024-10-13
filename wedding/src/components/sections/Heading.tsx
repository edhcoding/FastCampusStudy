import styles from './Heading.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'
import { format, getDay, parseISO } from 'date-fns'

interface HeadingProps {
  date: string
}

const cx = classNames.bind(styles)

const DAYS = [
  '일요일(Sunday)',
  '월요일(Monday)',
  '화요일(Tuesday)',
  '수요일(Wednesday)',
  '목요일(Thursday)',
  '금요일(Friday)',
  '토요일(Saturday)',
]

export default function Heading({ date }: HeadingProps) {
  // props로 받는 date string을 date 형식으로 바꿔줘야함 (date-fns 라이브러리 이용) (parseISO)
  // date 형식으로 바꿨으면 이제 date-fns의 format을 사용해서 변환, 첫번째 인자는 변환 할 Date , 두번째 인자는 포맷 형식
  // 요일 같은 경우에는 date-fns의 getDay 사용 리턴값으로 숫자가 반환됨, 0부터 일요일 시작
  const weddingDate = parseISO(date)

  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}
