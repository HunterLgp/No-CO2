import { StarFilled } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { User } from "../../app/InformationUser";
import { getUserAPI } from "../../services/apis/auth";
import Avatar from "./avatar";

export interface ReviewProps {
  user_id: string;
  rate: 1 | 2 | 3 | 4 | 5;
  comment: string;
  key: number;
}

const Review: FC<ReviewProps> = ({ user_id, rate, comment, key }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const res = await getUserAPI(user_id).then((value) => value.data);
      setUser(res);
    };
    getUser();
  }, [user_id]);
  return (
    <div
      className="w-full"
      key={key}
    >
      <div className="flex justify-start">
        <Avatar
          urlImage={user && user.url_image}
          firstName={user ? user.first_name : "-"}
        />
        <div className="ml-4">
          <StarFilled className={`text-sm ${rate >= 1 ? "text-yellow-400" : "text-gray-400"}`} />
          <StarFilled className={`text-sm ${rate >= 2 ? "text-yellow-400" : "text-gray-400"}`} />
          <StarFilled className={`text-sm ${rate >= 3 ? "text-yellow-400" : "text-gray-400"}`} />
          <StarFilled className={`text-sm ${rate >= 4 ? "text-yellow-400" : "text-gray-400"}`} />
          <StarFilled className={`text-sm ${rate >= 5 ? "text-yellow-400" : "text-gray-400"}`} />
        </div>
      </div>
      <div>{comment}</div>
    </div>
  );
};

export default Review;

