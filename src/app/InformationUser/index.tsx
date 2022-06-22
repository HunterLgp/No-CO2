import { FC, useEffect, useState } from "react";
import MainHeader from "../../components/common/MainHeader";
import { getMeAPI } from "../../services/apis/auth";
import EditProfile from "./editProfile";
import ViewProfile from "./viewProfile";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  user_id: string;
  url_image?: string;
}

const InformationUser: FC = () => {
  const [profile, setProfile] = useState<User>();
  const [visiable, setVisiable] = useState<boolean>(false);
  useEffect(() => {
    const getProfile = async () => {
      const res = await getMeAPI();
      setProfile(res.data);
    };
    getProfile();
  }, []);
  return (
    <>
      <MainHeader page="Information User" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ViewProfile profile={profile} />
            <button
              className="w-32 h-10 rounded-lg text-white bg-teal-500 flex items-center justify-center"
              onClick={() => setVisiable((pre) => !pre)}
            >
              Edit Profile
            </button>
            {visiable && profile ? (
              <EditProfile
                profile={profile}
                setProfile={setProfile}
                setVisiable={setVisiable}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default InformationUser;

