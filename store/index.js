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
    todaysMatches: null
})

export const mutations = {
    
    // Get results of all maches from previos year
    getPLHistory(state) {
        axios.get( `${baseURL}/competitions/PL/matches?status=FINISHED&dateFrom=2019-09-01&dateTo=${dates.today}` , CONFIG )
        .then(res => { state.matchData = res });
    },
    
    // Get todays matches
    getTodaysMatches(state){
        // axios.get( `${baseURL}/competitions/PL/matches?status=SCHEDULED&dateFrom=${dates.today}&dateTo=${dates.tomorrow}`, CONFIG )
        // .then(res => { state.todaysMatches = res });
        axios.get( `${baseURL}/competitions/PL/matches?status=SCHEDULED`, CONFIG )
        .then(res => { state.todaysMatches = res });
    }

}


export const strict = false;