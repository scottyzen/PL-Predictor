import axios from "axios";
const CONFIG = { headers: {  "X-Auth-Token": "20e725054df046f58355a43107606116" } };
const baseURL = `https://api.football-data.org/v2`;

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dates = {
    today: new Date().toISOString().slice(0,10),
    tomorrow: tomorrow.toISOString().slice(0,10)
}

export const state = () => ({
    matchData: null,
    todaysMatchesData: null
})

export const mutations = {
    setTodaysMatches (state, data) { state.todaysMatchesData = data },
    setMatchData (state, data2) { state.matchData = data2 },
}

export const actions = {
    async nuxtServerInit ({commit}) {
      let {data} = await axios.get( `${baseURL}/competitions/PL/matches?status=SCHEDULED`, CONFIG );
      commit('setTodaysMatches', data)
      
      let {data2} = await axios.get( `${baseURL}/competitions/PL/matches?status=FINISHED&dateFrom=2019-09-01&dateTo=${dates.today}` , CONFIG );
      commit('setMatchData', data2)

    }
  }


export const strict = false;