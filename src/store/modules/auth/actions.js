import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default {
  async login(context, payload) {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Firebase tokens expire in 1 hour (3600 seconds)
      const expirationDate = new Date().getTime() + 3600 * 1000;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('tokenExpiration', expirationDate);

      context.commit('setUser', {
        token: token,
        userId: user.uid,
        tokenExpiration: expirationDate
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to authenticate.');
    }
  },

  async signup(context, payload) {

    console.log('sigup: ', payload);

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      console.log('sigup : userCredential: ', userCredential);

      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log('sigup : token: ', token);

      // Firebase tokens expire in 1 hour (3600 seconds)
      const expirationDate = new Date().getTime() + 3600 * 1000;

      console.log('sigup : expirationDate: ', expirationDate);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('tokenExpiration', expirationDate);

      context.commit('setUser', {
        token: token,
        userId: user.uid,
        tokenExpiration: expirationDate
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to authenticate.');
    }
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const isTokenExpired = +tokenExpiration - new Date().getTime();

    if (isTokenExpired < 0) {
      context.dispatch('logout');
      return;
    }

    if (token && userId && tokenExpiration) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
