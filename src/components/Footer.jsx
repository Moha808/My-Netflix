import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer-container py-16 px-4 md:px-[4%] mt-auto bg-[#141414] text-[#808080] border-t-8 border-[#232323]">
      <div className="max-w-[980px] mx-auto">
        {/* Contact Info - Top Priority */}
        <div className="mb-8">
          <p className="text-[16px] mb-4 hover:underline cursor-pointer">
            Questions? Call{" "}
            <a href="tel:+2349156151191" className="hover:underline">
              +2349156151191
            </a>
          </p>
        </div>

        {/* Links Grid - 4 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-[13px] mb-8">
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investor Relations
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Speed Test
              </a>
            </li>
          </ul>

          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie Preferences
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Legal Notices
              </a>
            </li>
          </ul>

          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="hover:underline">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ways to Watch
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Corporate Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Only on Netflix
              </a>
            </li>
          </ul>

          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="hover:underline">
                Media Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Utility Block - Language & Service Code */}
        <div className="flex flex-col gap-6 mb-8 items-start">
          <div className="relative">
            <div className="flex items-center gap-2 border border-[#808080] px-4 py-2 rounded-sm text-sm hover:border-white transition-colors cursor-pointer min-w-[120px]">
              <MdLanguage className="text-lg" />
              <select className="bg-transparent text-[#808080] border-none outline-none appearance-none flex-grow cursor-pointer pr-4">
                <option className="bg-[#141414]">English</option>
                <option className="bg-[#141414]">Español</option>
              </select>
              <span className="text-[10px] pointer-events-none">▼</span>
            </div>
          </div>

          <button className="border border-[#808080] text-[13px] px-2 py-1 hover:text-white hover:border-white transition-colors cursor-pointer">
            Service Code
          </button>
        </div>

        {/* Footer Bottom - Social & Branding */}
        <div className="pt-4 flex flex-col items-start gap-4 border-t border-transparent">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white text-2xl hover:text-netflix-red transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-white text-2xl hover:text-netflix-red transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-white text-2xl hover:text-netflix-red transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-white text-2xl hover:text-netflix-red transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="text-[12px] opacity-60">Netflix Clone Nigeria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
