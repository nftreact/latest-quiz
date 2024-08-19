import { THISPROJECT } from "@/constants/projects"

const SideTriangle = ({thisClassName}: {thisClassName:string}) => {
  return(
    <svg
      width="110"
      height="398"
      viewBox="0 0 110 398"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={thisClassName}
      style={THISPROJECT.DEFAULT_LOCALE === 'fa_IR'? {right:'-12px'}: {left:'-12px', rotate:'180deg'}}
    >
    <path
      opacity="0.8"
      d="M114.991 6.89818C116.728 3.81361 114.499 0 110.959 0C109.288 0 107.747 0.90063 106.927 2.35631L4.72836 183.793C-0.434799 192.959 -0.435593 204.157 4.72625 213.324L106.928 394.826C107.747 396.281 109.288 397.182 110.959 397.182C114.499 397.182 116.727 393.368 114.989 390.285L15.3112 213.407C10.1444 204.239 10.1432 193.037 15.3082 183.867L114.991 6.89818Z"
      fill="#fde3e6"
    ></path>
  </svg>
  )
}

export default SideTriangle