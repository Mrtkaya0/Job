import React, { useEffect, useState } from "react"
import { typeOpt,statusOpt, sortOpt, } from "./constants"
import { useDispatch } from "react-redux"
import { filterBySearch, sortJobs
 } from "../redux/slices/jobSlice";


const Filter = ({jobs}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("")



     useEffect(() => {
        const timer = setTimeout(
            () => dispatch(filterBySearch({ field: 'company', text })),
            500
          );
    //   süre bitmeden tekrar useEffect çalışırısa bir önceki sayacı sıfırla
     return () => clearTimeout(timer);
    },[text]);

    return (
        <div>
        <section className="filter-sec">
        <h2>Filtreleme Formu</h2>
        <form>
          <div>
            <label>Şirket İsmine Göre ara</label>
            <input onChange={(e) => setText(e.target.value)} 
            list="positions" name="position" type="text"
              
            />

            <datalist id="positions">
              {jobs.map((job) => (
                <option value={job.company} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select onChange={(e) =>
            dispatch(
              filterBySearch({
                field:'status',
                text: e.target.value
              })
            )} name="status" >

              <option  hidden>
                Seçiniz
              </option>
              {statusOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select onChange={(e) => 
            dispatch(
              filterBySearch({
                field:'type',
                text: e.target.value
              })
            )} name="type">


              <option hidden>Seçiniz</option>
              {typeOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sırala</label>
            <select onChange={(e) => dispatch(sortJobs(e.target.value))} name="type" >
              {sortOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>
          <div>
          <button
            className="add-button"
            onClick={() => dispatch(clearFilters())}
            type="reset"
          >
              <span className="button_top">Sıfırla</span>
            </button>
          </div>
          </form>
          </section>
          </div>
    )
}

export default Filter