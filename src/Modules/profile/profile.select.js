// Get User's Own Profile:
export const getProfile = {
  select: {
    // profilePic: {
    //   public_id: 0,
    // },
    password: 0,
    passwords: 0,
  },
};

// Update User's Own Profile:
export const updateProfile = {
  select: {
    _id: 1,
    profilePic: 1,
    email: 1,
    isDeactivated: 1,
  },
};

// Confirm E-mail:
export const confirmNewEmail = {
  select: {
    _id: 1,
    tempEmail: 1,
    isDeactivated: 1,
  },
};

// Toggle Private Profile:
export const togglePrivateProfile = {
  select: {
    _id: 1,
    privateProfile: 1,
    isDeactivated: 1,
  },
};

// Change Password:
export const changePassword = {
  select: {
    _id: 1,
    email: 1,
  },
};

// Delete User's Own Profile:
export const confirmNewPassword = {
  select: {
    _id: 1,
    password: 1,
    passwords: 1,
  },
};
