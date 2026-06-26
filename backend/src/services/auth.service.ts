import { supabase } from '../config/supabase';
import prisma from '../config/db';
import { AppError } from '../middlewares/error.middleware';

export const signupUser = async (email: string, password: string, firstName: string, lastName: string) => {
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError || !authData.user) {
    const error: AppError = new Error(authError?.message || 'Failed to create user in Supabase');
    error.statusCode = 400;
    throw error;
  }

  // 2. Create user in Prisma DB
  const user = await prisma.user.create({
    data: {
      id: authData.user.id,
      email: email,
      profile: {
        create: {
          firstName,
          lastName,
        }
      }
    },
    include: {
      profile: true
    }
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    const err: AppError = new Error(error?.message || 'Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: data.user.id },
    include: { profile: true }
  });

  if (!dbUser) {
    const err: AppError = new Error('User not found in database');
    err.statusCode = 404;
    throw err;
  }

  return {
    user: dbUser,
    session: data.session
  };
};

export const logoutUser = async (token: string) => {
  const { error } = await supabase.auth.admin.signOut(token);
  if (error) {
    const err: AppError = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
  return true;
};
