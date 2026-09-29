import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full py-10 md:py-16 px-6 md:px-[4%] mt-auto bg-black/75 text-[#737373]">
      <div className="max-w-[980px] mx-auto w-full">
        
        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-6">
          <a href="#" className="text-white text-2xl hover:text-[#b3b3b3] transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white text-2xl hover:text-[#b3b3b3] transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="text-white text-2xl hover:text-[#b3b3b3] transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="text-white text-2xl hover:text-[#b3b3b3] transition-colors">
            <FaYoutube />
          </a>
        </div>

        {/* Links Grid - perfectly aligned flowing columns */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 text-[13px] mb-8 w-full">
          <li><a href="#" className="hover:underline">Audio Description</a></li>
          <li><a href="#" className="hover:underline">Help Center</a></li>
          <li><a href="#" className="hover:underline">Gift Cards</a></li>
          <li><a href="#" className="hover:underline">Media Center</a></li>
          
          <li><a href="#" className="hover:underline">Investor Relations</a></li>
          <li><a href="#" className="hover:underline">Jobs</a></li>
          <li><a href="#" className="hover:underline">Terms of Use</a></li>
          <li><a href="#" className="hover:underline">Privacy</a></li>
          
          <li><a href="#" className="hover:underline">Legal Notices</a></li>
          <li><a href="#" className="hover:underline">Cookie Preferences</a></li>
          <li><a href="#" className="hover:underline">Corporate Information</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>

        {/* Utility Block - Service Code & Copyright */}
        <div className="flex flex-col gap-6 items-start">
          <button className="border border-[#737373] text-[#737373] text-[13px] px-2 py-1.5 hover:text-white hover:border-white transition-colors cursor-pointer">
            Service Code
          </button>
          <p className="text-[11px] text-[#737373] mt-2 mb-4">© 1997-2023 Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
