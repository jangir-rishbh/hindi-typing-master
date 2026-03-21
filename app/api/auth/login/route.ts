import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

type LoginPayload = {
  identifier?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = (await request.json()) as LoginPayload;
    const identifier = body.identifier?.trim().toLowerCase() || '';
    const password = body.password || '';

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Email/Username and password are required.' }, { status: 400 });
    }

    const { data: users, error } = await supabaseAdmin
      .from('app_users')
      .select('id, full_name, username, email, password_hash')
      .or(`email.eq.${identifier},username.eq.${identifier}`);

    const user = users?.[0];

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid email/username or password.' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid email/username or password.' }, { status: 401 });
    }

    const secret = process.env.APP_JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Missing APP_JWT_SECRET.' }, { status: 500 });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, username: user.username },
      secret,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set('app_session', token, {
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
