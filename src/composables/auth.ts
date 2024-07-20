import { auth } from '@/configs/firebase';
import { signInWithEmailAndPassword, type User } from 'firebase/auth';
import { computed, ref } from 'vue';
import { useAuth as useVueUseAuth } from '@vueuse/firebase';

const getUser = computed<User | null>({
  get: () => useVueUseAuth(auth).user,
  set: (newVal: User | null) => {
    user.value = newVal;
  }
});
const user = ref(getUser.value);
const useAuth = () => {
  // login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(`Erreur ${error.Code}: ${error.message}`);
      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };

  // Register
  const register = async () => {};

  // logout
  const logout = async () => {};

  return {
    user,
    login,
    register,
    logout
  };
};

export { useAuth };
