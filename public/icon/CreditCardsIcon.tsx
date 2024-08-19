import Image from "next/image"

const CreditCardsIcon = () => {

  return (
    <Image
    src='/images/credit-cards.png'
    width={100}
    height={15}
    alt='credit cards as payment method'
    style={{filter:'inherit'}}
    />
  )
}

export default CreditCardsIcon