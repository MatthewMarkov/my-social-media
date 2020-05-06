import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5695b80a-0241-44c0-8ae2-e291419df2a1',
  },
});


export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userID) {
    return instance.post(`follow/${userID}`);
  },
  unfollow(userID) {
    return instance.delete(`follow/${userID}`);
  },
};

export const authAPI = {
  authMe() {
    return instance.get('auth/me');
  },
  login(email, password, rememberMe) {
    return instance.post('auth/login', { email, password, rememberMe });
  },
  logout() {
    return instance.delete('auth/login');
  },
};


export const profileAPI = {
  getUserProfile(userID) {
    return instance.get(`profile/${userID}`);
  },
  getStatus(userID) {
    return instance.get(`profile/status/${userID}`);
  },
  updateStatus(status) {
    return instance.put('profile/status', { status });
  },
};



