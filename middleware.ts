import { THISPROJECT, thisLanguage, thisLocale } from '@/constants/projects';
import { Decode, DecodeBase64, Encode, parseQueryParams } from '@/utils/insdex';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (request: NextRequest, res: NextApiResponse) => {
  const basePath = thisLanguage;
  const locale = thisLocale;
  const Authorization = request.cookies.get('Authorization');
  const noRedirect: any = request.cookies.get('noRedirect')?.value;
  const discount: any = request.cookies.get('discount')?.value;
  const offer: any = request.cookies.get('offer')?.value;
  const type = request.cookies.get('type')?.value;
  const { pathname } = request.nextUrl;
  const queryParams = request.nextUrl.href.split('/')[5];
  const quesryObject = parseQueryParams(queryParams);
  const queryStr = request.nextUrl.href.split('/')[3];
  const projectStatus = request.nextUrl.href.split('?');
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  let response = NextResponse.next();
  response.cookies.set('user-ip-address', ip);

  // if (noRedirect && noRedirect === 'true') {
  //   if (pathname === '/' || pathname.includes('preCheckout') || pathname.includes('question')) {
  //     if (discount === 'false' && offer === 'false') {
  //       return NextResponse.redirect(
  //         new URL(`/${locale}/checkout/?discount=ZmFsc2U%3D&offer=ZmFsc2U%3D`, request.url).toString(),
  //       );
  //     }
  //     if (discount === 'true' && offer === 'false') {
  //       return NextResponse.redirect(new URL(`/${locale}/checkout/?discount=dHJ1ZQ==&show=true`, request.url).toString());
  //     }

  //     if (discount === 'true' && offer === 'true') {
  //       return NextResponse.redirect(new URL(`/${locale}/checkout/?discount=dHJ1ZQ==&offer=dHJ1ZQ==`, request.url).toString());
  //     }
  //   }
  // }

  // if (pathname === '/') {
  //   if (!queryParams) {
  //     return NextResponse.redirect(new URL(THISPROJECT.LANDING, request.url).toString());
  //   } else {
  //     return NextResponse.redirect(new URL(`/question/${queryStr.slice(1, queryStr.length)}`, request.url).toString());
  //   }
  // }

  // if (pathname.includes('question')) {
  //   if (pathname === '/') {
  //     ``;
  //     if (!queryParams) {
  //       return NextResponse.redirect(new URL(THISPROJECT.LANDING, request.url).toString());
  //     } else {
  //       return NextResponse.redirect(
  //         new URL(`/question/${queryStr.slice(1, queryStr.length)}`, request.url).toString(),
  //       );
  //     }
  //   }

  //   if ((pathname.includes('question') && !quesryObject.type) || !quesryObject.aid) {
  //     return NextResponse.redirect(new URL(THISPROJECT.LANDING, request.url).toString());
  //   }

  //   if (pathname.includes('question') && quesryObject.aid !== 'start') {
  //     if (!Authorization || Authorization.value === 'undefined') {
  //       return NextResponse.redirect(
  //         new URL(`${thisLanguage}/question/aid=start&type=${type}`, request.url).toString(),
  //       );
  //     }
  //   }

  //   return response;
  // }

  // const parseQueryStringToObject = (queryString: string): Record<string, string> => {
  //   const queryParams = queryString.split('&');
  //   const parsedObject: Record<string, string> = {};
  //   queryParams.forEach((param) => {
  //     const [key, value] = param.split('=');
  //     parsedObject[key] = decodeURIComponent(value);
  //   });

  //   return parsedObject;
  // };

  // if (pathname.includes('preCheckout') && projectStatus.length > 1) {
  //   const { type, code, token, project } = parseQueryStringToObject(projectStatus[1]);

  //   if (Boolean(type) && Boolean(token) && Boolean(code) && Boolean(project)) {
  //     response.cookies.set('Authorization', DecodeBase64(token));
  //     response.cookies.set('type', DecodeBase64(type));
  //     response.cookies.set('project', DecodeBase64(project));
  //     response.cookies.set('code', DecodeBase64(code));

  //     return response;
  //   }
  // }
};

export const config = {
  unstable_allowDynamic: ['/node_modules/lodash/**'],
  matcher: ['/', '/question/:path*', '/checkout', '/question', '/checkout:path*'],
};
