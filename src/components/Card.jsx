import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { deleteJob } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  // başvuru tipine karşılık gelen renkler
  const color = {
    'Devam Ediyor': 'green',
    Mülakat: 'orange',
    Reddedildi: 'red',
  };

  const handelDelete = () => {
    axios.delete(`http://localhost:4500/jobs/${job.id}`)
    .then(() => {toast.info('Silme İşlemi başarılı')
    dispatch(deleteJob(job.id));
  })
    .catch(() =>{
      toast.err('Silme İşlemi Başarısız')
    })
  }

  return (
    <div className="card">
      {/* üst kısım */}
      <div className="top-area">

        <div className="head">
          <div className="letter">
            <span>{job.company[0]} </span>
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div>
          <button onClick={handelDelete} class="bin-button">
            <svg
              class="bin-top"
              viewBox="0 0 39 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
              <line
                x1="12"
                y1="1.5"
                x2="26.0357"
                y2="1.5"
                stroke="white"
                stroke-width="3"
              ></line>
            </svg>
            <svg
              class="bin-bottom"
              viewBox="0 0 33 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_8_19" fill="white">
                <path
                  d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                ></path>
              </mask>
              <path
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                fill="white"
                mask="url(#path-1-inside-1_8_19)"
              ></path>
              <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
              <path d="M21 6V29" stroke="white" stroke-width="4"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* alt Kısım */}
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location} </p>
        </div>

        <div className="field">
          <FaSuitcase />
          <p>{job.type} </p>
        </div>

        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date} </p>
        </div>

        <div
          style={{
            background: color[job.status],
          }}
          className="status">
          <p>{job.status} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;