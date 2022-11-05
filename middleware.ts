import { NextRequest, NextResponse } from "next/server";
import { CookieNames } from "enums/cookie-names";
import { Paths } from "enums/paths";

const DISALLOWED_PATHS_WITH_TOKEN = [Paths.SIGN_IN, Paths.SIGN_UP];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(CookieNames.TOKEN);
  const origin = process.env.API_URL;

  if (!token && req.url.includes(Paths.DASHBOARD)) {
    const url = `${origin}${Paths.SIGN_IN}`;
    return NextResponse.redirect(new URL(url));
  }

  const isDisallowedUrlsWithToken = DISALLOWED_PATHS_WITH_TOKEN.some((path) =>
    req.url.includes(path)
  );

  if (token && isDisallowedUrlsWithToken) {
    const url = `${origin}${Paths.DASHBOARD}`;
    return NextResponse.redirect(new URL(url));
  }

  const basicURL = `${origin}/`;

  if (req.url === basicURL) {
    const url = `${origin}${Paths.DASHBOARD}`;
    return NextResponse.redirect(new URL(url));
  }
}
