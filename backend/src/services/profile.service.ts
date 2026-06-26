import prisma from '../config/db';

export const getProfileByUserId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      profile: true,
    }
  });
};

export const updateProfile = async (userId: string, firstName: string, lastName: string) => {
  return await prisma.profile.update({
    where: { userId },
    data: {
      firstName,
      lastName,
    }
  });
};
