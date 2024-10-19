import { ApiData, ApiManager } from '@/utils/axios.config'
import { QUESTION } from './type'
import { stringify } from 'qs'

type FormData = {
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

export const getQuestion = async (params: FormData, type: string) => {
  const serializedParams = stringify(params)
  const res = await ApiManager.get<ApiData<QUESTION>>(`/main/question.php?${serializedParams}`, {
    params: {
      type: type,
      version: 'v3',
    },
  })

  return res.data.data
}
