'use client'

import { Grid } from '@radix-ui/themes'
import SelectItem from './SelectItem'
import { Controller, useFormContext } from 'react-hook-form'
import { Answer } from '@/types/questions'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  items: Answer[]
  hasborderimage: boolean
}

const SingleSelect = ({ items, hasborderimage }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { control } = useFormContext()

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Grid gap={'16px'} style={{ width: hasborderimage ? '65%' : '100%' }}>
      <Controller
        name='aid'
        control={control}
        render={({ field }) => (
          <>
            {items.map((item) => {
              return (
                <SelectItem
                  onClick={() => {
                    field.onChange(item.aid)
                  }}
                  description={item.description}
                  title={item.text}
                  key={item.aid}
                  image={item.image}
                />
              )
            })}
          </>
        )}
      />
    </Grid>
  )
}

export default SingleSelect

/**
 * styled-component
 * _______________________________________________________________________________
 */
