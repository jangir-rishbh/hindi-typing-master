import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

type TokenPayload = {
  sub: string;
  email: string;
  username: string;
};

type Body = {
  fullName?: string;
  username?: string;
};

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }

    const secret = process.env.APP_JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Missing APP_JWT_SECRET.' }, { status: 500 });
    }

    const payload = jwt.verify(token, secret) as TokenPayload;
    const body = (await request.json()) as Body;
    const fullName = body.fullName?.trim() || '';
    const username = body.username?.trim() || '';

    if (!fullName || !username) {
      return NextResponse.json({ error: 'Full name and username are required.' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: otherUsername } = await supabaseAdmin
      .from('app_users')
      .select('id')
      .eq('username', username)
      .neq('id', payload.sub)
      .maybeSingle();

    if (otherUsername) {
      return NextResponse.json({ error: 'Username is already taken.' }, { status: 409 });
    }

    const { data: user, error } = await supabaseAdmin
      .from('app_users')
      .update({
        full_name: fullName,
        username,
      })
      .eq('id', payload.sub)
      .select('id, full_name, username, email')
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ error: error?.message || 'Could not update profile.' }, { status: 500 });
    }

    const newToken = jwt.sign(
      { sub: user.id, email: user.email, username: user.username },
      secret,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set('app_session', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
