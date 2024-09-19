import { Session } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,15}$/;

export const validateEmail = (email: string) => {
  return validEmailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return validPasswordRegex.test(password);
};

export async function register({ email, password }: { email: string; password: string }) {
  const { error, data } = await supabase.auth.signUp({ email, password });

  return { error, data };
}

export async function login({ email, password }: { email: string; password: string }) {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  return { error, data };
}
export async function signOut() {
  await supabase.auth.signOut();
}

export async function getProfile(session: Session) {
  const { error, data } = await supabase.from("profiles").select("*").eq("id", session?.user.id).single();

  return { error, data };
}

export async function getSession(): Promise<Session | null> {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session;
}
