'use client'

import { Grid } from '@radix-ui/themes'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import '@/constants/GlobalVariables'
import Cookies from 'universal-cookie'
import QuestionLoading from '@/components/questions/QuestionLoading'
import BackNavigationHeader from '@/components/questions/BackNavigationHeader'
import ParasiteQuestionRoot from '@/components/questions/parasiteQuestion/ParasiteQuestionRoot'
import ImageQuestionPage from '@/components/questions/ImageQuestionPage'
import Hint from '@/components/questions/Hint'
import { filterObject } from '@/utils/question/filterObject'
import { createQueryString } from '@/utils/question/createQueryString'
import { QUESTION } from '@/types/questions'
import NormalQuestionRoot from '@/components/questions/NormalQuestion/NormalQuestionRoot'
import QuestionProgressBar from '@/components/questions/QuestionProgressBar'
import { getQuestion } from '@/components/questions/question-services'

/**
 * props
 * _______________________________________________________________________________
 */

type FormData = {
  isLoading: boolean
  aid?: string
  height_cm?: string
  height_ft?: string
  height_in?: string
  weight_current_kg?: string
  weight_current_lbs?: string
  weight_goal_lbs?: string
  weight_goal_kg?: string
  type?: string
  calendar?: string
  email?: string
}

export default function LandingPage({ searchParams }: { searchParams: FormData }) {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const methods = useForm<FormData>({
    defaultValues: {
      aid: searchParams.aid ?? undefined,
      type: searchParams.type ?? undefined,
      isLoading: false,
    },
  })

  const { handleSubmit, watch, setValue } = methods
  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    setValue('aid', searchParams.aid)
    queryClient.invalidateQueries({ queryKey: ['question'] })
  }, [searchParams])

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const onSubmit = async (data: FormData) => {
    const filteredParams = filterObject(data)
    const parmas = createQueryString(filteredParams)
    push(`/question?${parmas}`)
    queryClient.invalidateQueries({ queryKey: ['question'] })
  }

  const { data, isFetching } = useQuery({
    queryKey: ['question'],
    queryFn: async () => getQuestion(watch(), searchParams.type as string),
    staleTime: 1000 * 60 * 10,
    retry: 3,
  })

  useEffect(() => {
    setValue('isLoading', isFetching)
  }, [isFetching])

  
  if (!data) return <QuestionLoading />

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Grid style={{ backgroundColor: data.parasite.bgColor }} gap={'24px'}>
      <BackNavigationHeader question={data} />
      <QuestionProgressBar
        allQuestions={data.allQuestions}
        currentQuestion={data.currentQuestion}
        questionType={data.questionType}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            px={'16px'}
            maxWidth={'600px'}
            minHeight={'calc(100vh - 103px)'}
            m={'auto'}
            position={'relative'}
            style={{ paddingBottom: '70px' }}
          >
            <Grid gap={'24px'} height={'fit-content'}>
              {data?.questionType == 'parasite' && <ParasiteQuestionRoot question={data as QUESTION} />}
              {data?.questionType !== 'parasite' && <NormalQuestionRoot question={data} />}
              {Boolean(data?.hint.caption) && <Hint question={data} />}
            </Grid>
            {Boolean(data?.borderImage) && <ImageQuestionPage question={data} />}
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  )
}
