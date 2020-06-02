import axios from 'axios';
import {
  profileType, userType, photosType, newMessageType, dialogType, messageType,
} from '../redux/reducerTypes';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5695b80a-0241-44c0-8ae2-e291419df2a1',
  },
});

type ItemsType<I> = {
  items: Array<I>
  totalCount: number
  error: null | string
}
type OperationResultObject<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}
type CaptchaType = {
  url: string
}
type SavePhotoResponseType = {
  resultCode: number
  messages: Array<string>
  photos: photosType
}
type SendMessageType = {
    message: newMessageType
}

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get<ItemsType<userType>>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getUsersForSearch(term: string) {
    return instance.get<ItemsType<userType>>(`users?term=${term}`)
      .then((response) => response.data);
  },
  follow(userID: number) {
    return instance.post<OperationResultObject>(`follow/${userID}`);
  },
  unfollow(userID: number) {
    return instance.delete<OperationResultObject>(`follow/${userID}`);
  },
};

export const authAPI = {
  authMe() {
    return instance.get<OperationResultObject<{ id: number, email: string, login: string }>>('auth/me').then((res) => res.data);
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
    return instance.post<OperationResultObject<{ userId : number }>>('auth/login', {
      email, password, rememberMe, captcha,
    }).then((res) => res.data);
  },
  logout() {
    return instance.delete('auth/login').then((res) => res.data);
  },
  getCaptcha() {
    return instance.get<CaptchaType>('security/get-captcha-url').then((res) => res.data);
  },

};


export const profileAPI = {
  getUserProfile(userID: number) {
    return instance.get<profileType>(`profile/${userID}`).then((res) => res.data);
  },
  getStatus(userID: number) {
    return instance.get<string>(`profile/status/${userID}`).then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance.put<OperationResultObject>('profile/status', { status }).then((res) => res.data);
  },
  updateUserProfileInformation(userInfo: profileType) {
    return instance.put<OperationResultObject>('profile', userInfo).then((res) => res.data);
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put<SavePhotoResponseType>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
};

export const dialogsAPI = {
  sendMessage(userId: number, body: string) {
    return instance.post<OperationResultObject<SendMessageType>>(`dialogs/${userId}/messages`, body).then((res) => res.data);
  },
  getDialogs() {
    return instance.get<Array<dialogType>>('dialogs');
  },
  geExactDialog(userId: number) {
    return instance.get<ItemsType<messageType>>(`dialogs/${userId}/messages`);
  },
  startChatting(userId: number) {
    return instance.put(`dialogs/${userId}`);
  },
  viewedMessage(messageId: string) {
    return instance.get<boolean>(`dialogs/messages/${messageId}/viewed`);
  },
};
