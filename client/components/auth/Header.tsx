import Image from 'next/image';
import Reveal from './Reveal';

const Header = () => {
  return (
    <Reveal delay={0}>
      <div className="mb-7 text-center">
        <div className="inline-flex items-center gap-2.5">
          <div className="to-rose h-px w-7 bg-linear-to-r from-transparent" />
          <Image src={'/logo.png'} alt={'logo'} height={50} width={50} />
          <span className="text-ink font-[Cormorant,serif] text-[30px] font-semibold">
            Ovi<em className="text-violet italic">ya</em>
          </span>

          <div className="to-rose h-px w-7 bg-linear-to-l from-transparent" />
        </div>
      </div>
    </Reveal>
  );
};

export default Header;
