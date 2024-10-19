'use client'

import { Flex, Text } from '@radix-ui/themes'
import Image from 'next/image'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  image: string
  items: {
    icon: string
    label: string
    value: string
  }[]
}

const UserInfo = ({ image, items }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

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
    <Flex style={{ paddingInline: '20px' }} justify='between' align='center'>
      <Flex direction='column' gap='10px'>
        {items.map((item, inedex) => {
          return (
            <Flex key={inedex} gap='10px' align='center'>
              <Image src={item.icon} alt='' width={24} height={24} />
              <Flex direction='column'>
                <Text>{item.label}</Text>
                <Text>{item.value}</Text>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
      <div style={{ minHeight: '180px', width: '130px', position: 'relative' }}>
        <Image alt='userInfo-image' fill src={image} style={{ objectFit: 'scale-down' }} />
      </div>
    </Flex>
  )
}

export default UserInfo

/**
 * styled-component
 * _______________________________________________________________________________
 */
