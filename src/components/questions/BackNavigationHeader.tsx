'use client'

import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { QUESTION } from './type'
import { useRouter } from 'next/navigation'

type Props = {
  question: QUESTION
}

const BackNavigationHeader = ({ question }: Props) => {
  const { locale } = global.config
  const { back } = useRouter()
  return (
    <>
      {locale === 'fa_IR' && (
        <FaArrowRightLong
          onClick={back}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: Number(question.currentQuestion) > 1 ? 'block' : 'none',
          }}
        />
      )}
      {locale !== 'fa_IR' && (
        <FaArrowLeftLong
          onClick={back}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: Number(question.currentQuestion) > 1 ? 'block' : 'none',
          }}
        />
      )}
    </>
  )
}

export default BackNavigationHeader
