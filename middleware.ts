import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = async (request: NextRequest, res: NextApiResponse) => {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  let response = NextResponse.next()
  response.cookies.set('user-ip-address', ip)
}

export const config = {
  unstable_allowDynamic: ['/node_modules/lodash/**'],
  matcher: ['/', '/question/:path*', '/checkout', '/question', '/checkout:path*'],
}
