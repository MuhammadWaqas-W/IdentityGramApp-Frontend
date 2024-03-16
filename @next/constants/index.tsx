import { DefaultConfigProps } from '@types';
import {
  Dashboard,
  Teams,
  Users,
  Notifications,
  Apis,
  Integrations,
  Verifications,
  Reports,
  Help,
  notifyIcon,
  Faq,
  TermConnditions,
  support,
  privacyticon,
  UserPlus,
  UploadCloud,
  CheckSquare,
  WorldIcon,
  DrivingLicenseIcon,
  ResidencePermitIcon,
  ProofOfAddressIcon,
  ProductsIcon,
  removeIcon,
  successIcon,
} from '@icons';
import {
  Bag,
  License,
  passport,
  permit,
  proof,
  proofnotification,
  Wallet,
  Walletverification,
  profilePic,
  BarGraphImage,
  CancelImage,
  SecuredImage,
  LicenceIcon,
  ResidencePermitImage,
  AddressProofIcon,
  PassportIcon,
  notVisible,
  outOfFrame,
  visible,
  bill3Img,
  bill2Img,
  bill1Img,
} from '@images';

import { Autoplay, Pagination, Navigation } from 'swiper';

import { Typography } from '@mui/material';
import { tickGif } from 'public/images';

export const PERMISSIONS = {
  teams: { create: true, view: true, delete: true, edit: true },
  notifications: true,
  users: { create: true, view: true, delete: true, edit: true },
};

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const REQUEST_STATUS = {
  IDEL: 'idel',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
  NOCONTENT: 'nocontent',
};

export const themeConfig: DefaultConfigProps = {
  defaultPath: '/dashboard',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
};

export const permissionsTableRoles = [
  {
    id: 1,
    label: 'Users',
    create: 'createUsers',
    view: 'viewUsers',
    edit: 'editUsers',
    delete: 'deleteUsers',
  },
  {
    id: 2,
    label: 'Notifications',
    create: 'createNotifications',
    view: 'viewNotifications',
    edit: 'editNotifications',
    delete: 'deleteNotifications',
  },
  {
    id: 3,
    label: 'APIs',
    create: 'createAPIs',
    view: 'viewAPIs',
    edit: 'editAPIs',
    delete: 'deleteAPIs',
  },
  {
    id: 4,
    label: 'Verifications',
    create: 'createVerifications',
    view: 'viewVerifications',
    edit: 'editVerifications',
    delete: 'deleteVerifications',
  },
  {
    id: 5,
    label: 'Reports',
    create: 'createReports',
    view: 'viewReports',
    edit: 'editReports',
    delete: 'deleteReports',
  },
];

export const integrationType = [
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        Test intergration
      </Typography>
    ),
    value: 'Test',
  },
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        Live intergration
      </Typography>
    ),
    value: 'Live',
  },
];

export const identityList = [
  {
    data: 'Dont  lose on your customer acquisition costs and convert more real customers',
    icon: UserPlus,
  },
  {
    data: 'Make identity verifitcation seamless with our simple integration',
    icon: UploadCloud,
  },
  {
    data: 'Stand up to fraud and comply with regulations',
    icon: CheckSquare,
  },
];

export const navConfig = [
  {
    id: 1,
    title: 'Dashboard',
    value: 'Dashboard',
    icon: Dashboard,
    href: '/app/dashboard',
  },
  {
    id: 2,
    title: 'Users',
    value: 'User',
    icon: Users,
    href: '/app/users',
  },
  {
    id: 3,
    title: 'Notifications',
    value: 'Notification',
    icon: Notifications,
    href: '/app/notifications',
  },
  {
    id: 4,
    title: 'APIs',
    value: 'API',
    icon: Apis,
    href: '/app/apis',
  },
  {
    id: 5,
    title: 'Verifications',
    value: 'Verification',
    icon: Verifications,
    href: '/app/verifications',
  },
  {
    id: 6,
    title: 'Reports',
    value: 'Report',
    icon: Reports,
    href: '/app/reports',
  },
  {
    id: 7,
    title: 'Help',
    value: 'Help',
    icon: Help,
    href: '/app/help',
  },
];
export const navConfigCompany = [
  {
    id: 1,
    title: 'Dashboard',
    value: 'Dashboard',
    icon: Dashboard,
    href: '/app/dashboard',
  },
  {
    id: 2,
    title: 'Teams',
    value: 'Team',
    icon: Teams,
    href: '/app/teams',
  },
  {
    id: 3,
    title: 'Notifications',
    value: 'Notification',
    icon: Notifications,
    href: '/app/notifications',
  },
  {
    id: 4,
    title: 'Integrations',
    value: 'Integration',
    icon: Integrations,
    href: '/app/integration',
  },
  {
    id: 5,
    title: 'Verifications',
    value: 'Verification',
    icon: Verifications,
    href: '/app/verifications',
  },
  {
    id: 6,
    title: 'Reports',
    value: 'Report',
    icon: Reports,
    href: '/app/reports',
  },
  {
    id: 7,
    title: 'Help',
    value: 'Help',
    icon: Help,
    href: '/app/help',
  },
];
export const navConfigUser = [
  {
    id: 1,
    title: 'Dashboard',
    value: 'Dashboard',
    icon: Dashboard,
    href: '/app/dashboard',
  },
  {
    id: 2,
    title: 'Verifications',
    value: 'Verification',
    icon: Verifications,
    href: '/app/verifications',
  },

  {
    id: 3,
    title: 'Notifications',
    value: 'Notification',
    icon: Notifications,
    href: '/app/notifications',
  },
  {
    id: 4,
    title: 'Reports',
    value: 'Report',
    icon: Reports,
    href: '/app/reports/all',
  },
  {
    id: 5,
    title: 'Help',
    value: 'Help',
    icon: Help,
    href: '/app/help',
  },
];

//Roles and Right table data
export const RolesAndRightTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'Cody Fisher',
    },
    userType: 'Admin',
    assignedDate: '22 Aug 19:15',
    status: 'on',
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'Joeorg',
    },
    userType: 'Admin',
    assignedDate: '22 Aug 19:15',
    status: 'off',
  },
  {
    id: 3,
    userName: {
      img: profilePic,
      name: 'Esther Howard',
    },
    userType: 'Admin',
    assignedDate: '22 Aug 19:15',
    status: 'on',
  },
];
// Reports
export const cardDataList = [
  {
    image: WorldIcon,
    heading: 'Passport',
    subheading:
      'This Report Section Includes Document Type Verified Under Passport Selection',
    bgColor: '#FFF9EC',
    textColor: '#FAA31E',
    type: 'Passport',
  },

  {
    image: DrivingLicenseIcon,
    heading: 'Driving License',
    subheading:
      'This Report Section Includes Document Type Verified Under Passport Selection',
    bgColor: '#F6F5FE',
    textColor: '#5B59A7',
    type: 'License',
  },
  {
    image: ResidencePermitIcon,
    heading: 'Residence Permit',
    subheading:
      'This Report Section Includes Document Type Verified Under Passport Selection',
    bgColor: '#EFFAFF',
    textColor: '#0E918C',
    type: 'Address-Permit',
  },
  {
    image: ProofOfAddressIcon,
    heading: 'Proof of Address',
    subheading:
      'This Report Section Includes Document Type Verified Under Passport Selection',
    bgColor: '#EFF9FF',
    textColor: '#3E96D1',
    type: 'Proof-Address',
  },
  // {
  //   image: ProductsIcon,
  //   heading: 'Products',
  //   subheading:
  //     'This Report Section Includes Document Type Verified Under Passport Selection',
  //   bgColor: '#FFF4F0',
  //   textColor: '#FE6230',
  //   type: 'Products',
  // },
];

// user dashboard Notification data
export const userTempNotification = [
  {
    id: 0,
    name: 'Passport',
    profilePic: proofnotification,
    description: `Your passport has been successfully verified.`,
    time: '1 hour ago',
  },
  {
    id: 1,
    name: 'Driving License',
    profilePic: Wallet,
    description: 'Your driving license is declined. ',
    time: '1 hour ago',
  },
  {
    id: 2,
    name: 'Residence Permit',
    profilePic: Walletverification,
    description:
      'You can see all recommended profiles in the “Profile Matches”',
    time: '1 hour ago',
  },
  {
    id: 3,
    name: 'Driving License',
    profilePic: Bag,
    description: 'Your driving license is declined. ',
    time: '1 hour ago',
  },
  {
    id: 4,
    name: 'Residence Permit',
    profilePic: Walletverification,
    description: 'Your driving license is declined.',
    time: '1 hour ago',
  },
  {
    id: 5,
    name: 'Driving License',
    profilePic: Bag,
    description: 'Your driving license is declined. ',
    time: '1 hour ago',
  },
];
// user dashboard Testimonials

export const userTestimonials = [
  { id: 1, title: 'Faq', icon: Faq, Alt: 'Faq', bgColor: ' #FFF9EC' },
  {
    id: 2,
    title: 'Terms & Conditions',
    icon: TermConnditions,
    Alt: 'Terms & Conditions',
    bgColor: '#FFF3F1',
  },
  {
    id: 3,
    title: 'Privacy Policy',
    icon: support,
    Alt: 'Privacy Policy',
    bgColor: '#FAF9FD',
  },

  {
    id: 4,
    title: 'Support',
    icon: privacyticon,
    Alt: 'Support-icon',
    bgColor: '#EEFCF4',
  },
];

export const VerificationList = [
  {
    id: 1,
    logoIcon: BarGraphImage,
    name: 'Total Verification',
    type: 'Total',
    imgAlt: '',
  },
  {
    id: 2,
    logoIcon: CancelImage,
    name: 'Declined',
    type: 'Declined',
    imgAlt: 'Declined',
  },
  {
    id: 3,
    logoIcon: SecuredImage,
    name: 'Approved',
    type: 'Approved',
    imgAlt: 'Approved',
  },
];
export const VerificationStatusList = [
  {
    id: 1,
    name: 'Declined',
    type: 'Declined',
    color: '#FF624E',
  },
  {
    id: 2,
    name: 'Approved',
    type: 'Approved',
    color: '#0BAB52',
  },
  {
    id: 3,
    name: 'Not Started',
    type: 'NotStarted',
    color: '#BFACE0',
  },
];

export const APIList = [
  {
    id: 1,
    name: 'Total APIs',
    color: '#645CAA',
    bgColor: '#F4F6F6',
    key: 'total',
    path: 'total-apis',
  },
  {
    id: 3,
    name: 'Calls Hits',
    color: '#0A8D44',
    bgColor: '#E0FBEC',
    key: 'success',
    path: 'call-hits',
  },
  {
    id: 4,
    name: 'Failure Hits',
    color: '#FF0000',
    bgColor: 'rgba(255, 0, 0, 0.1);',
    key: 'failed',
    path: 'failure-hits',
  },
];

export const assignRole = [
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        Developer
      </Typography>
    ),
    value: 'DEVELOPER',
  },
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        Support Specialist
      </Typography>
    ),
    value: 'SUPPORT_SPECIALIST',
  },
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        DevOps
      </Typography>
    ),
    value: 'DEVOPS',
  },
  {
    label: (
      <Typography variant="h5" color="#2E285C" sx={{ fontWeight: 500 }}>
        Administrator
      </Typography>
    ),
    value: 'COMPANY_ADMIN',
  },
];

export const DocumenttypeData = [
  {
    id: 1,
    title: 'Passport',
    img: passport,
    Alt: 'Support-icon',
    bgColor: ' rgba(218, 248, 231, 0.46)',
  },
  {
    id: 2,
    title: 'Proof of Address',
    img: proof,
    Alt: 'proof-icon',
    bgColor: ' rgba(255, 98, 78, 0.08)',
  },
  {
    id: 3,
    title: 'Residence Permit',
    img: permit,
    Alt: 'Support-icon',
    bgColor: ' rgba(191, 172, 224, 0.08)',
  },
  {
    id: 4,
    title: 'Driving License',
    img: License,
    Alt: 'Driving-icon',
    bgColor: ' rgba(254, 170, 16, 0.08)',
  },
];
//Teams Table Data
export const TeamsTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
    },
    role: 'Admin',
    lastUpdate: '22 Aug 19:15',
    status: 'Active',
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
    },
    role: 'Admin',
    lastUpdate: '22 Aug 19:15',
    status: 'Inactive',
  },
  {
    id: 3,
    userName: {
      img: profilePic,
      name: 'Esther Howard',
      email: 'esther.howard@example.com',
    },
    role: 'Admin',
    lastUpdate: '22 Aug 19:15',
    status: 'Active',
  },
];

// verification Data
export const VerificationTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    productTitle: 'Check My DBS',
    status: 'Approved',
    documentType: 'passport',
    lastUpdate: '20 Aug 19:15',
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    productTitle: 'Check My DBS',
    status: 'Approved',
    documentType: 'passport',
    lastUpdate: '20 Aug 19:15',
  },
  {
    id: 4,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    productTitle: 'Check My DBS',
    status: 'Declined',
    documentType: 'passport',
    lastUpdate: '20 Aug 19:15',
  },
];

// Recent Verifications Data
export const RecentVerificationTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    status: 'Approved',
    documentType: 'passport',
    lastUpdate: '20 Aug 19:15',
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    status: 'Declined',
    documentType: 'passport',
    lastUpdate: '20 Aug 19:15',
  },
];

// Users Data
export const UsersTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
      email: 'zubair@ceative.co.uk',
    },
    userType: 'Admin',
    productTitle: 'Check My DBS',
    createdDate: '20 Aug 19:15',
    status: true,
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
      email: 'zubair@ceative.co.uk',
    },
    userType: 'Admin',
    productTitle: 'Check My DBS',
    createdDate: '20 Aug 19:15',
    status: false,
  },
];

// Integrations
export const IntegrationsTableData = [
  {
    id: 1,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    status: 'Live Integrations',
    documentType: 'Driving License',
    lastUpdate: '20 Aug 19:15',
  },
  {
    id: 2,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    status: 'Test Integrations',
    documentType: 'Passport',
    lastUpdate: '20 Aug 19:15',
  },
  {
    id: 3,
    userName: {
      img: profilePic,
      name: 'jenny Wilsom',
    },
    status: 'Live Integrations',
    documentType: 'Passport',
    lastUpdate: '20 Aug 19:15',
  },
];

export const ApiPerformanceSummaryData = [
  {
    id: 0,
    name: 'Total APIs',
    color: '#645CAA',
    bgColor: '#F4F6F6',
    currentCount: 0,
    data: [],
    type: 'total-apis',
  },
  {
    id: 2,
    name: 'Call Hits',
    color: '#0A8D44',
    bgColor: '#E0FBEC',
    currentCount: 0,
    data: [],
    type: 'call-hits',
  },
  {
    id: 3,
    name: 'Failure Hits',
    color: '#FF0000',
    bgColor: '#FCE8E8',
    currentCount: 0,
    data: [],
    type: 'failure-hits',
  },
];

export const userTypesValues = [
  { label: 'Company Admin', value: 'COMPANY_ADMIN' },
  { label: 'Single User', value: 'SINGLE USER' },
];

export const VerificationStatusGraphData = [
  {
    id: 1,
    name: 'Declined',
    type: 'Declined',
    color: '#FF624E',
  },
  {
    id: 2,
    name: 'Approved',
    type: 'Approved',
    color: '#0BAB52',
  },
  {
    id: 3,
    name: 'Submitted',
    type: 'Submitted',
    color: '#BFACE0',
  },
];
export const chooseDocumentForVerificationData = [
  {
    name: 'Passport',
    icon: PassportIcon,
    keyword: 'Passport',
  },
  {
    name: 'Driving License',
    icon: LicenceIcon,
    keyword: 'License',
  },
  {
    name: 'Residence Permit',
    icon: ResidencePermitImage,
    keyword: 'Address Permit',
  },
  {
    name: 'Proof of Address',
    icon: AddressProofIcon,
    keyword: 'Proof Address',
  },
];

export const SessionStartData = [
  {
    name: 'Please prepare a valid government issued identity document',
    icon: tickGif,
  },
  {
    name: 'Check if your device camera is active and working',
    icon: tickGif,
  },
  {
    name: 'Be Prepared to take a selfie and photo of your ID',
    icon: tickGif,
  },
];

const verfiicationDocuemntData = [
  {
    passport: {
      front: [
        {
          name: 'Not visible',
          image: notVisible,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: outOfFrame,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: visible,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
    },
    license: {
      front: [
        {
          name: 'Not visible',
          image: notVisible,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: outOfFrame,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: visible,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
      back: [
        {
          name: 'Not visible',
          image: notVisible,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: outOfFrame,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: visible,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
    },
    addressPermit: {
      front: [
        {
          name: 'Not visible',
          image: notVisible,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: outOfFrame,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: visible,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
      back: [
        {
          name: 'Not visible',
          image: notVisible,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: outOfFrame,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: visible,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
    },
    proofAddress: {
      front: [
        {
          name: 'Not visible',
          image: bill1Img,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Out of frame',
          image: bill2Img,
          color: 'error.main',
          icon: removeIcon,
        },
        {
          name: 'Clearly Visible',
          image: bill3Img,
          color: '#0BAB52',
          icon: successIcon,
        },
      ],
    },
  },
];
export const RegisterProductsSwiperProps = {
  slidesPerView: 7,
  spaceBetween: 20,
  grabCursor: true,
  pagination: {
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 500,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
  speed: 2000,
  modules: [Autoplay, Pagination, Navigation],
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1536: {
      slidesPerView: 7,
    },
  },
  className: 'mySwiper',
};

export const realtimeChartFilters: any = {
  '1S': ['00', '10', '20', '30', '40', '50', '59'],
  '1H': ['00', '10', '20', '30', '40', '50', '59'],
  '1W': ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  '1D': ['00', '03', '05', '09', '12', '15', '18', '21', '23'],
  '1M': ['01', '05', '10', '15', '20', '25', '30'],
  '1Y': [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};
export const realtimeChartdataFetchObj: any = {
  '1S': 'minuteHitsCount',
  '1H': 'hourHitsCount',
  '1W': 'weeklyHitsCount',
  '1D': 'dayHitsCount',
  '1M': 'dailyHitsCount',
  '1Y': 'monthlyHitsCount',
};
export const apisTableLoaderSX = {
  '.MuiTableHead-root': {
    bgcolor: 'transparent !important',
    border: 'none !important',
    '.MuiTableCell-root::after': { position: 'relative' },
  },
  '.MuiTableCell-root': { border: 'none !important', pl: '0 !important' },
  '.MuiTableRow-root:hover': { bgcolor: 'transparent !important' },
  '.MuiTableCell-head': {
    fontWeight: 400,
    fontSize: { sm: '15px !important', xs: '13px !important' },
    color: '#6E7191 !important',
  },
  '.MuiTableCell-root ': {
    fontWeight: 400,
    fontSize: { sm: '16px', xs: '11px' },
    color: 'secondary.lighter',
  },
};
export const apisCatalougeTableSX = {
  '.MuiTableHead-root': {
    bgcolor: 'transparent !important',
    border: 'none !important',
    '.MuiTableCell-root::after': { position: 'relative' },
  },
  '.MuiTableCell-root': { border: 'none !important', pl: '0 !important' },
  '.MuiTableRow-root:hover': { bgcolor: 'transparent !important' },
  '.MuiTableCell-head': {
    fontWeight: 400,
    fontSize: { sm: '16px !important', xs: '13px !important' },
    textTransform: 'uppercase',
    color: '#6E7191 !important',
  },
  '.MuiTableCell-root ': {
    fontWeight: 400,
    fontSize: { sm: '16px', xs: '11px' },
    color: 'secondary.lighter',
    whiteSpace: 'nowrap',
  },
};

export const companyRoles = [
  'DEVELOPER',
  'DEVOPS',
  'ADMINISTRATOR',
  'SUPPORT_SPECIALIST',
  'COMPANY_ADMIN',
];

export * from './chart-options';
