import * as React from 'react';
import { SVGProps } from 'react';
const ArrowDownsvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={15} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='m12.45 6.094-4.075 4.075a1.241 1.241 0 0 1-1.75 0L2.55 6.094'
      stroke='#232323'
      strokeWidth={2.1}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default ArrowDownsvg;
