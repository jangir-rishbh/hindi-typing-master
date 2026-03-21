import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

type SignupPayload = {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = (await request.json()) as SignupPayload;
    const fullName = body.fullName?.trim() || '';
    const username = body.username?.trim() || '';
    const email = body.email?.trim().toLowerCase() || '';
    const password = body.password || '';
    const confirmPassword = body.confirmPassword || '';

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const { data: existingEmail } = await supabaseAdmin
      .from('app_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }

    const { data: existingUsername } = await supabaseAdmin
      .from('app_users')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (existingUsername) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { error } = await supabaseAdmin.from('app_users').insert({
      full_name: fullName,
      username,
      email,
      password_hash: passwordHash,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Account created successfully.' }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
