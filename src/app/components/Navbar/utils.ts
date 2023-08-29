export const getAvatarInitials = (firstName: string, lastName: string): string => {
  let initials = "";

  if (firstName && lastName) {
    initials = firstName.charAt(0) + lastName.charAt(0);
  } else if (firstName) {
    initials = firstName.charAt(0);
  } else if (lastName) {
    initials = lastName.charAt(0);
  }

  return initials.toUpperCase();
};