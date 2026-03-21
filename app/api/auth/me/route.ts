import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

type TokenPayload = {
  sub: string;
  email: string;
  username: string;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = process.env.APP_JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Missing APP_JWT_SECRET.' }, { status: 500 });
    }

    const payload = jwt.verify(token, secret) as TokenPayload;
    const supabaseAdmin = getSupabaseAdmin();

    const { data: user, error } = await supabaseAdmin
      .from('app_users')
      .select('id, full_name, username, email')
      .eq('id', payload.sub)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          fullName: user.full_name,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
