import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="w-full border-t-[1px] border-[#22222256] mt-20">
      <div className="flex mx-16 my-8">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex">
          <div className="w-1/4">
            <div className="flex-shrink-0 font-bold text-4xl text-black">FREEC</div>
          </div>
          <div className="w-1/4">
            <div className="font-semibold text-gray-600">About us</div>
            <ul className="mt-4 text-gray-500 text-[13px]">
              <li className="my-1">About us</li>
              <li className="my-1">Testimonials</li>
              <li className="my-1">Services</li>
              <li className="my-1">Our Experts</li>
              <li className="my-1">Latest</li>
              <li className="my-1">News</li>
              <li className="my-1">Contact</li>
            </ul>
          </div>
          <div className="w-1/4">
            <div className="font-semibold text-gray-600">Our services</div>
            <ul className="mt-4 text-gray-500 text-[13px]">
              <li className="my-1">Competition</li>
              <li className="my-1">Dispute support</li>
              <li className="my-1">Energy and climate</li>
              <li className="my-1">IP valuation</li>
              <li className="my-1">Life sciences</li>
              <li className="my-1">Trade and market</li>
            </ul>
          </div>
          <div className="w-1/4">
            <div className="font-semibold text-gray-600">Contact us</div>
            <ul className="mt-4 text-gray-500 text-[13px]">
              <li className="my-2 flex justify-start">
                <img
                  src="public/icons/address.svg"
                  alt="address-icon"
                />
                <span>18 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội</span>
              </li>
              <li className="my-2 flex justify-start">
                <img
                  src="public/icons/address.svg"
                  alt="address-icon"
                />
                <span>+ 0961 653 104</span>
              </li>
              <li className="my-2 flex justify-start">
                <img
                  src="public/icons/address.svg"
                  alt="address-icon"
                />
                <span>oanhphuc9699@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-800 px-16">
        <div className="max-w-7xl h-8 mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800">
          <div className="h-full flex items-center text-xs text-white">@ 2022 Cofree. All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

