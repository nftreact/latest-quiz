import { parseQueryParams } from '@/utils/insdex';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const Authorization = request.cookies.get('Authorization');
  const type = request.cookies.get('type')?.value;
  const { pathname } = request.nextUrl;
  const queryParams = request.nextUrl.href.split('/')[4];
  const quesryObject = parseQueryParams(queryParams);
  const queryStr = request.nextUrl.href.split('/')[3];
  const consent = request.cookies.get('consent')?.value;

  if (!consent) {
    let response = NextResponse.redirect(request.url);
    response.cookies.set('consent', 'GIVE_CONSENT');
    return response;
  }

  if (pathname === '/') {
    if (!queryParams) {
      return NextResponse.redirect(new URL('https://matchadiet.com/', request.url).toString());
    } else {
      return NextResponse.redirect(new URL(`/question/${queryStr.slice(1, queryStr.length)}`, request.url).toString());
    }
  }

  if ((pathname.includes('question') && !quesryObject.type) || !quesryObject.aid) {
    return NextResponse.redirect(new URL('https://matchadiet.com/', request.url).toString());
  }

  if (pathname.includes('question') && quesryObject.aid !== 'start') {
    if (!Authorization || Authorization.value === 'undefined') {
      return NextResponse.redirect(new URL(`/question/aid=start&type=${type}`, request.url).toString());
    }
  }

  return NextResponse.next();
};

export const config = {
  unstable_allowDynamic: ['/node_modules/lodash/**'],
  matcher: ['/', '/question/:path*'],
};
