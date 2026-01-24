const Footer = () => {
  return (
    <footer className="bg-[#E8E2D6] py-10 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Copyright */}
        <p className="text-[#788991] text-xs tracking-wide">
          Copyright © {new Date().getFullYear()} Off White Design — Hospitality Interior Design Studio in India.
          All rights reserved.
        </p>
      </div>

      {/* Crafted by */}
      <div
        className="
          mt-6
          flex justify-center
          sm:absolute sm:bottom-4 sm:right-6 sm:mt-0
          sm:justify-end
          group
        "
      >
        <div className="text-center sm:text-right">
          <p className="text-[11px] text-[#5F6F75] tracking-wide flex items-center gap-1 justify-center sm:justify-end">
            Crafted with
            <span className="text-purple-600 transition-transform duration-300 group-hover:scale-110">
              💜
            </span>
            by
            <a
              href="https://purplemindstech.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PurpleMinds Tech website"
              className="font-medium text-[#3F4A4E] group-hover:text-black transition-colors duration-300"
            >
              PurpleMinds Tech
            </a>
          </p>

          {/* Fancy underline */}
          <span className="block mt-1 h-[1px] w-10 sm:w-0 bg-purple-500/60 transition-all duration-500 group-hover:w-full mx-auto sm:ml-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
