import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // api yüklenme durumunu günceller
    setLoading: (state) => {
      state.isLoading = true;
    },

    // apiden gelen verileri state aktarır
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload; // action parametresini burada tanımlamış olduk
      state.mainJobs = action.payload;
    },

    // gelen veri hata durumunu günceller
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    // yeni iş Ekler

    createJob: (state, action) => {
      state.jobs.push(action.payload)
    },

    // aratılan şirket ismine göre filtrelem yapma

    filterBySearch: (state, action) => {

      // arama terimi küçük harf
      const query = action.payload.text.toLowerCase();


      // arama terimini içeren işleri filtrele
      const filtred = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );

      // state güncelle
      state.jobs = filtred;
    },
    // a-z sıralama 
    sortJobs: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case 'z-a':
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case 'En Yeni':
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date))
          break;
        case 'En Eski':
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date))
          break;
        default:
          break;
      }
    },
    // sıfırlama
    // sıfırlama
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    // iş silme
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((i) => i.id !== action.payload);
    },

  },
});

export const { setLoading, setJobs, setError, createJob, clearFilters,deleteJob, filterBySearch, sortJobs } = jobSlice.actions;

export default jobSlice.reducer;