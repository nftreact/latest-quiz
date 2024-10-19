'use client'

import type { Value } from 'react-multi-date-picker'
import { DateObject } from 'react-multi-date-picker'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import persian from 'react-date-object/calendars/persian'
import gregorian from 'react-date-object/calendars/gregorian'
import styled from 'styled-components'
import { Answer } from '../type'
import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { createQueryString, filterObject } from '@/utils/insdex'
import RadixButton from '@/primitives/RadixButton'
// import { convertToLatinDigits } from '@/utils/question/convertToLatinDigits';

export const convertToLatinDigits = (persianDateStr: string): string => {
  const latinDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  const latinDateStr = persianDateStr
    .split('')
    .map((digit) => (latinDigits.indexOf(digit) !== -1 ? String(latinDigits.indexOf(digit)) : digit))
    .join('')

  return latinDateStr
}
/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  error: string
  answer: Answer
}

const CalendarQuestion = ({ error, answer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const queryClient = useQueryClient()
  const { push } = useRouter()
  const { locale, colors } = global.config
  const today = new Date()
  const thisCalendar = locale === 'fa_IR' ? persian : gregorian
  const thisLocale = locale === 'fa_IR' ? persian_fa : gregorian_en
  const [value, setCalendarValue] = useState<Value>(new DateObject({ calendar: thisCalendar, locale: thisLocale }))
  const [calendarError, setCalendarError] = useState(error ?? '')
  const { watch, setValue } = useFormContext()

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (error) setCalendarError(error)
  }, [error])

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleclick = () => {
    const newDate = value?.toLocaleString()
    setValue('aid', answer.aid)
    setValue('calendar', convertToLatinDigits(String(newDate)))
    const filteredParams = filterObject(watch())
    const parmas = createQueryString(filteredParams)
    push(`/question?${parmas}`)
    queryClient.invalidateQueries({ queryKey: ['question'] })
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Root style={{ marginBottom: '10px' }}>
        <Text>{calendarError}</Text>
        <Calendar
          currentDate={today.toLocaleDateString('en') as any}
          minDate={today}
          calendar={thisCalendar}
          locale={thisLocale}
          value={value}
          onChange={(dateObject: DateObject | DateObject[] | any) => {
            setCalendarError('')
            setCalendarValue(dateObject.format())
          }}
        />
      </Root>

      <ButtonStyle
        size={'4'}
        variant='soft'
        onClick={handleclick}
        className='button'
        style={{
          position: 'fixed',
          bottom: '20px',
        }}
      >
        {watch('isLoading') ? (
          <ReactLoading type={'bubbles'} color={colors.background} height={'25px'} width={'25px'} />
        ) : (
          answer.text
        )}
      </ButtonStyle>
    </>
  )
}

export default CalendarQuestion

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  display: flex;
  align-items: center;
  gap: 20;
  flex-direction: column;
`

const ButtonStyle = styled(RadixButton)`
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 450px;
  left: 50%;
`
