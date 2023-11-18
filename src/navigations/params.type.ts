import {Decorate, TVipTicket} from '@models';

// list name of routes of rootStack
export type ScreensName = keyof StackParamList;

// add route name and params every time you add new screen to rootStack
// if is non params set to undefined
export type StackParamList = {
  login: {email?: string; password?: string};
  forgotPassword: undefined;
  register: undefined;
  otpVerification: {
    verifyAction: 'login' | 'register' | 'forgotPass' | 'changePass';
    message: string;
    email: string;
  };
  changePassword: undefined;
  splash: undefined;
  message: {
    onOk: () => void;
    title: string;
    message: string;
    msgType: 'error' | 'success';
  };
  loading: undefined;
  // home: { registerSuccess?: boolean },
  bottomNavigation: undefined;
  setting: undefined;
  confirmMessage: {
    title: string;
    message: string;
    onOk: () => void;
    onCancel: () => void;
  };
  menu: undefined;
  notifications: undefined;
  profile: undefined;
  infomation: undefined;
  editAvtFrame: {avatarFrame: Decorate | null};
  editAvtTitle: {avatarTitle: Decorate | null};
  language: undefined;
  nighmode: undefined;
  editprofile: {
    typeAction: 'fullname' | 'birthday' | 'gender' | 'image' | 'nickname';
    value: any;
    message: string;
    label: string;
  };
  search: undefined;
  favorite: undefined;
  comicdetail: {
    id: string;
  };
  comments: {
    comicId: string;
    chapterIndex: number;
  };
  readcomic: {
    id: string;
    chapter: number;
    numOfChapter: number;
    image: string;
    name: string;
    needLoadComic?: boolean;
  };
  author: {
    id: string;
    type: string;
  };
  follow: {
    type: 'following' | 'follower' | 'comicfollowing';
  };
  level: {};
  buycoins: {};
  comicWorld: {};
  listCategory: {};
  categoryDetail: {
    title: string;
    categoryId: string;
    description: string;
    numOfComic: number;
  };
  authorFollowing: {};
  comicFollowing: {};
  readingHistory: {};
  success: {
    message: string;
  };
  commentdetail: {
    item: any;
  };
  rank: {};
  commented: {};
  listVipTicket: undefined;
  vipTicketDetail: {
    vipTicket: TVipTicket;
    listAvatarFrame: Decorate[];
    listAvatarTitle: Decorate[];
  };
  listCoinPackage: undefined;
  transactionStatus: {
    status: string;
    price: number;
    transactionName: string;
  };
  transactionHistory: {};
  transactionDetail: {};
  comicMore: {
    type: 'new' | 'hot' | 'done';
  };
  myVipTicket: {
    vipTicketId: string;
  };
};
