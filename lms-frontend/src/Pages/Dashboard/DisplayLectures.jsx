import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/slices/lectureSlice.js";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(cid, lid) {
    await dispatch(deleteCourseLecture({ courseId: cid, lectureId: lid }));
    await dispatch(getCourseLecture(cid));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>
        {(lectures && lectures.length > 0) ? (
          <div className="flex justify-center gap-10 w-full">
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg w-full rounded-tr-lg"
                controls
                disablePictureInPicture
                controlsList="nodownload"
                muted
              ></video>
              <h1>
                <span className="text-yellow-500">Title: </span>
                {lectures[currentVideo]?.title}
              </h1>
              <p>
                <span className="text-yellow-500">Description: </span>
                {lectures[currentVideo]?.description}
              </p>
            </div>

            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                Lectures List
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="bg-yellow-500 text-black rounded-md font-semibold px-5 py-2 hover:bg-yellow-600 transition-all ease-in-out duration-300"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures.map((lecture, idx) => {
                return (
                  <li className="space-y-2" key={lecture._id}>
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span>Lecture {idx + 1} : </span> {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>{
                        // console.log(state?._id, lecture?._id)
                          onLectureDelete(state?._id, lecture?._id)
                        }}
                        className="border border-yellow-500 text-yellow-500 rounded-md font-semibold px-5 py-2 hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-300"
                      >
                        Delete lecture
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (role === "ADMIN") && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="bg-yellow-500 text-black rounded-md font-semibold px-5 py-3 hover:bg-yellow-600 transition-all ease-in-out duration-300"
                  >
                    Add new lecture
                  </button>
                )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
