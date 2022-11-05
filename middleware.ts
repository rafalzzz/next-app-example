import { NextRequest, NextResponse } from "next/server";
import { Paths } from "enums/paths";

const DISALLOWED_PATH_WITH_TOKEN = [Paths.SIGN_IN, Paths.SIGN_UP];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const origin = process.env.API_URL;

  if (!token && req.url.includes(Paths.DASHBOARD)) {
    const url = `${origin}${Paths.SIGN_IN}`;
    return NextResponse.redirect(new URL(url));
  }

  const isDisallowedUrlsWithToken = DISALLOWED_PATH_WITH_TOKEN.some((path) =>
    req.url.includes(path)
  );

  if ((token && isDisallowedUrlsWithToken) || req.url.includes(Paths.SIGN_UP)) {
    const url = `${origin}${Paths.DASHBOARD}`;
    return NextResponse.redirect(new URL(url));
  }

  const basicURL = `${origin}/`;

  if (req.url === basicURL) {
    const url = `${origin}${Paths.DASHBOARD}`;
    return NextResponse.redirect(new URL(url));
  }
}
