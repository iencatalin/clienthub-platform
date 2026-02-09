import { signInAction } from '../actions/auth';

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-2xl font-bold'>Register</h1>
      <form action={signInAction} className='flex flex-col gap-4 w-64'>
        <input type='email' name='email' placeholder='email' required />
        <input type='password' name='password' placeholder='' required />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}
