import styles from './Intro.module.scss'
import classNames from 'classnames/bind'
import Section from '@shared/Section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '@shared/Text'

interface IntroProps {
  groomName: string
  brideName: string
  locationName: string
  date: string
  intro: string
}

const cx = classNames.bind(styles)

export default function Intro({
  groomName,
  brideName,
  locationName,
  date,
  intro,
}: IntroProps) {
  return (
    <Section className={cx('container')}>
      <div className={cx('wrap-persons')}>
        <span>{groomName}</span>
        <IconHeart className={cx('ico-heart')} />
        <span>{brideName}</span>
      </div>

      <div className={cx('wrap-location')}>
        <span>
          {format(parseISO(date), 'yyyy년 M월 d일 eeee', { locale: ko })}
        </span>
        <span>{locationName}</span>
      </div>

      <IconFlower className={cx('ico-flower')} />
      {/* <div dangerouslySetInnerHTML={{ __html: intro }}>{intro}</div> */}
      <Text>{intro}</Text>
    </Section>
  )
}

function IconHeart({ className }: { className: string }) {
  return (
    <svg
      className={className}
      height="512px"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
        <g>
          <path d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z" />
        </g>
      </g>
      <g id="Layer_1" />
    </svg>
  )
}

function IconFlower({ className }: { className: string }) {
  return (
    <svg
      className={className}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style type="text/css"></style>
      <path d="M57.4,114.6c4-4.6,6.9-4.1,10.5,0.7c9.7,12.8,22.8,14.1,37,8c13.1-5.7,21.9-22.3,19.2-35.8  c-2.2-11.1-9.9-18-19.9-22.5c0.2-0.7,0.4-1.4,0.5-2.2l0,0c12.2-5.2,20.9-18.3,19.1-30.2c-1.8-11.8-10-19.3-20.3-23.8  c-8.7-3.8-17.9-2.2-25.4,4c-4.9,4.1-8,5.3-13.3-0.2C50.3-2.4,31.4-2.9,18.3,10.5C2.4,26.7,1.6,48.3,16.7,62.9  c3.7,3.6,2.4,5.6-0.3,8.8c-7.9,9.5-13,19.7-7.3,32.5C15.6,118.6,42.6,131.5,57.4,114.6z" />
    </svg>
  )
}
