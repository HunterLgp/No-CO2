import { css, cx } from "@emotion/css";
import { FC, useState, useEffect } from "react";
import { CheckBox } from "../../components/global/groupCheckBox";
import { updateProfile } from "../../services/apis/auth";
import { optionsGender } from "../Auth/register";
import { Gender, User } from "./index";
interface Props {
  profile: User;
  setProfile: (params: User) => void;
  setVisiable: (params: boolean) => void;
}

const EditProfile: FC<Props> = ({ profile, setProfile, setVisiable }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<Gender>(0);
  const [lastName, setLastName] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string>("");

  const handleSubmit = async () => {
    if (firstName.trim() && lastName.trim() && email.trim() && urlImage.trim()) {
      const res = await updateProfile(profile._id, firstName, lastName, email, gender, urlImage);
      if (res.status === 200) {
        setProfile(res.data.value);
        setVisiable(false);
      }
    }
  };
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setEmail(profile.email);
      setGender(profile.gender);
      profile.url_image && setUrlImage(profile.url_image);
    }
  }, [profile]);
  return (
    <div
      className={cx(
        "bg-white px-6 py-10 rounded-lg w-full flex flex-wrap mt-6",
        css`
          box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
        `,
      )}
    >
      <div className="mb-4 w-1/2">
        <label className="text-[#333] text-lg">First Name:</label>
        <input
          type="text"
          className="w-11/12 h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4 w-1/2">
        <label className="text-[#333] text-lg">LastName:</label>
        <input
          type="text"
          className="w-11/12 h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4 w-1/2">
        <label className="text-[#333] text-lg">Email:</label>
        <input
          type="text"
          className="w-11/12 h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4 w-1/2">
        <label className="text-[#333] text-lg">URL Image:</label>
        <input
          type="text"
          value={urlImage}
          className="w-11/12 h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
          onChange={(e) => setUrlImage(e.target.value)}
        />
      </div>
      <div className="mb-4 w-full">
        <label className="text-[#333] text-lg">Gender:</label>
        <CheckBox
          value={gender}
          setValue={setGender}
          options={optionsGender}
        />
      </div>
      <div className="w-full flex justify-end items-center mt-8">
        <button className="w-32 h-10 text-teal-500 bg-white border-[1px] border-gray-500 rounded-md">Cancle</button>
        <button
          className="w-32 h-10 text-white bg-gray-800 rounded-md ml-4"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default EditProfile;

