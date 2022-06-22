import { FC } from "react";
import { Gender, User } from ".";
import Avatar from "../../components/individual/avatar";

const ViewProfile: FC<{ profile: User | undefined }> = ({ profile }) => {
  return (
    <div className="w-full h-40 flex justify-start items-center mb-8">
      <Avatar
        size="150px"
        textSize="85px"
        urlImage={profile?.url_image}
        firstName={profile?.first_name}
      />
      <div className="h-full pl-3 text-lg text-zinc-700 flex justify-center flex-col">
        <div className="">Name: {`${profile?.first_name} ${profile?.last_name}`}</div>
        <div className="">Email: {profile?.email}</div>
        <div className="">
          Gender:
          {profile?.gender === Gender.FEMALE ? "Female" : profile?.gender === Gender.MALE ? "Male" : "Other"}
        </div>
      </div>
    </div>
  );
};
export default ViewProfile;

