export const endpoints = {
  signup: `auth/signup`,
  tempPassword: 'auth/set-new-password',
  authLogin: `auth/signin`,
  changePassword: 'auth/change-password',
  forgotPassword: 'auth/forgot-password',
  resetPassword: 'auth/confirm-forgot-password',
  silentLogin: `auth/me`,
  addUser: `auth/signup/add-user`,
  editUser: `users`,
  editUserStatus: `users/change-status`,
  getCompanies: 'company/get-all-companies',
  getIntegrationByCompany: 'integration/by-company',
  getProductName: 'company/get',
  verificationCount: 'verification/verification-count',
  teams: 'users/get-all-users',
  latestNotification: '/user-notifications/latest',
  notification: '/user-notifications',

  // Profile Section
  updateProfileData: 'user-profile/update',
  getProfileData: 'user-profile/my-profile',
  getProfilePic: 'user-profile/get',
  putProfilePic: 'user-profile/update-profile-image',

  // Verification Section
  getVerifications: 'verification',
  verificationDocCount: 'verification/verified-documents-count',
  verificationLatest: 'verification/latest',

  //verification Section
  addVerification: 'verification/add-verification',
  addVerificationByAdmin: 'verification/add-verification-by-admin',
  verificationCompanyData: 'verification',
  verificationCounts: 'verification/verification-count',
  sendVerificationLink: 'verification/send-link',
  startVerification: 'verification/start',
  uploadDocument: 'verification/update-documents',
  uploadSelfie: 'verification/update-selfie',
  verificationLinkCode: 'verification/link',
  veiwVerificationDetail: 'verification/view',
  // Integration Section
  getIntegrationList: 'integration',
  getAllIntegrationS: 'integration/all',
  addIntegration: 'integration',
  // Reports
  getReports: '/reports',
  //Super Admin dashboard
  registeredProducts: '/company/get-all-companies',
  apisCount: '/api-logs/api-counts',
  usersCount: '/users/total-count',
  varifiedDocuments: '/verification/verified-doc-weekly-monthly-count',
  dashboardRecentNotification: '/user-notifications/latest',
  //Apis Module
  apisCountAndData: '/api-logs/latest-apis-and-count',
  apisLogs: '/api-logs',
  //Super admin
  addUserSuperAdmin: 'users/add-user',
  getUsersListSuperAdmin: 'users/get-all-users',
  editUserSuperAdmin: 'users',
  singleUserrecentVerification: '/user-notifications/latest',
};
