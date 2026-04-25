import Reveal from './Reveal';

const Header = () => {
  return (
    <Reveal delay={0}>
      <div className="mb-7 text-center">
        <div className="inline-flex items-center gap-2.5">
          <div className="h-px w-7 bg-linear-to-r from-transparent to-(--rose)" />

          <span className="font-[Cormorant,serif] text-[30px] font-medium text-(--ink)">
            Ovi<em className="text-(--rose) not-italic">ya</em>
          </span>

          <div className="h-px w-7 bg-linear-to-l from-transparent to-(--rose)" />
        </div>
      </div>
    </Reveal>
  );
};

export default Header;
