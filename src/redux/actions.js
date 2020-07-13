export const ADD_SCHEDULED_GOALS = "ADD_SCHEDULED_GOALS";
export const ADD_USER_DATA = "ADD_USER_DATA";
export const ADD_MERGED_GOALS = "ADD_MERGED_GOALS";
export const SHOW_RESULTS = "SHOW_RESULTS";
export const ADD_KEY = "ADD_KEY";
export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER";
export const ADD_PIRATE = "ADD_PIRATE";
export const ADD_SERVER = "ADD_SERVER";

export function addScheduledGoals(data) {
  return { type: ADD_SCHEDULED_GOALS, data: data };
}

export function addUserData(data) {
  return { type: ADD_USER_DATA, data: data };
}

export function addServer(data) {
  return { type: ADD_SERVER, data: data };
}

export function addUser(data) {
  return { type: ADD_USER, data: data };
}

export function addPirate(data) {
  return { type: ADD_PIRATE, data: data };
}

export function addMergedGoals(data) {
  return { type: ADD_MERGED_GOALS, data: data };
}

export function showResults(data) {
  return { type: SHOW_RESULTS, data: data };
}

export function addKey(data) {
  return { type: ADD_KEY, data: data };
}
