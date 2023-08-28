import { createSlice, configureStore } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		verified: false,
		userName: "guest",
	},
	reducers: {
		verify: (state) => {
			state.verified = true;
			state.userName = "Admin";
		},
		unverify: (state) => {
			state.verified = false;
			state.userName = "Guest";
		},
	},
});

export const { verify, unverify } = userSlice.actions;

export default userSlice.reducer;
