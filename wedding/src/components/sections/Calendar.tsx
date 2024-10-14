import classNames from 'classnames/bind'
import Section from '@shared/Section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
import styles from './Calendar.module.scss'

interface CalendarProps {
  date: string
}

const cx = classNames.bind(styles)

export default function Calendar({ date }: CalendarProps) {
  const weddingDate = parseISO(date)

  // console.log(date) // 2024-10-15T13:00:00
  // console.log(weddingDate) // Tue Oct 15 2024 13:00:00 GMT+0900 (한국 표준시)

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
          {/* aaa는 영어로 오전/오후, eeee는 영어로 요일 */}
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <DayPicker
          locale={ko}
          mode="single"
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}
