import { Mode } from '@/app/auth/page';
import Reveal from './Reveal';

const ModeToggle = ({
  mode,
  switchMode,
}: {
  mode: Mode;
  switchMode: (mode: Mode) => void;
}) => {
  return (
    <Reveal delay={310}>
      <p className="text-muted mt-5 text-center text-[13px]">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => switchMode('register')}
              className="text-violet cursor-pointer border-none bg-none text-[13px] font-medium"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => switchMode('login')}
              className="text-violet cursor-pointer border-none bg-none text-[13px] font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </Reveal>
  );
};

export default ModeToggle;
