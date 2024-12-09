'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export async function deleteToken() {
  (await cookies()).delete("token"); // Acessando o valor do token nos cookies
}