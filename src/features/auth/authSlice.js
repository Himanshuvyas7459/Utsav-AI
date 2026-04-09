import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// 🔹 REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const data = await authService.register(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      return { user: data, token: data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error"
      );
    }
  }
);

// LOGIN USER
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (formData, thunkAPI) => {
//     try {
//       const data = await authService.login(formData);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           _id: data._id,
//           name: data.name,
//           email: data.email,
//           role: data.role,
//         })
//       );

//       return { user: data, token: data.token };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error"
//       );
//     }
//   }
// );
// Login me user aur token dono save karna

export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      const data = await authService.login(formData);

      // Save token
      localStorage.setItem("token", data.token);

      // Save user info (without token)
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      return { user: userData, token: data.token };
    } catch (error) {
      const message = error.response?.data?.message || "Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      console.log("🔥 LOGOUT TRIGGERED");
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;









// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "./authService";

// // 🔥 LOCAL STORAGE SE DATA
// const user = JSON.parse(localStorage.getItem("user"));
// const token = localStorage.getItem("token");

// const initialState = {
//   user: user || null,
//   token: token || null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

// // ✅ REGISTER
// export const registerUser = createAsyncThunk(
//   "AUTH/REGISTER",
//   async (formData, thunkAPI) => {
//     try {
//       const data = await authService.register(formData);

//       // 🔥 SAVE USER
//       localStorage.setItem("user", JSON.stringify(data));

//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Error";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // ✅ LOGIN (🔥 MAIN FIX YAHI HAI)
// export const loginUser = createAsyncThunk(
//   "AUTH/LOGIN",
//   async (formData, thunkAPI) => {
//     try {
//       const data = await authService.login(formData);

//       // ✅ DIRECT TOKEN
//       const token = data.token;

//       // 🔥 SAVE TOKEN (MAIN FIX)
//       localStorage.setItem("token", token);

//       // 🔥 SAVE USER (WITHOUT TOKEN OPTIONAL)
//       const userData = {
//         _id: data._id,
//         name: data.name,
//         email: data.email,
//         role: data.role,
//       };

//       localStorage.setItem("user", JSON.stringify(userData));

//       return {
//         user: userData,
//         token: token,
//       };

//     } catch (error) {
//       const message = error.response?.data?.message || "Error";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // ✅ SLICE
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = "";
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // REGISTER
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // LOGIN
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset, logout } = authSlice.actions;
// export default authSlice.reducer;









// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "./authService";

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   user: user || null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };


// export const registerUser = createAsyncThunk(
//   "AUTH/REGISTER",
//   async (formData, thunkAPI) => {
//     try {
//       const data = await authService.register(formData);

//       // save user
//       localStorage.setItem("user", JSON.stringify(data));

//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Error";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   "AUTH/LOGIN",
//   async (formData, thunkAPI) => {
//     try {
//       const data = await authService.login(formData);

//       // save user
//       localStorage.setItem("user", JSON.stringify(data));

//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Error";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = "";
//     },
    
//     // LOGOUT
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userRole");
//     },
//   },
  
//   extraReducers: (builder) => {
//     builder
//     // REGISTER
//     .addCase(registerUser.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(registerUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user = action.payload;
//     })
//     .addCase(registerUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     })
    
//     // LOGIN
//     .addCase(loginUser.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(loginUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user = action.payload;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     });
//   },
// });

// export const { reset, logout } = authSlice.actions;
// export default authSlice.reducer;





















// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "./authService";

// let userExist = JSON.parse(localStorage.getItem("user"))


// const authSlice = createSlice({
//     name : "auth",
//     initialState : {
//         user : userExist || null,
//         isLoading : false,
//         isSuccess : false,
//         isError : false,
//         message : ""
//     },
//     reducers: {
//   reset: (state) => {
//     state.isLoading = false
//     state.isSuccess = false
//     state.isError = false
//     state.message = ""
//   }
// },
//     extraReducers : (builder) =>{
//         builder 
//         .addCase(registerUser.pending , (state , action) => {
//             state.isLoading = true
//             state.isSuccess = false
//             state.isError = false
//         })
//         .addCase(registerUser.fulfilled , (state , action) => {
//             state.isLoading = false
//             state.isSuccess = true
//             state.isError = false
//             state.user = action.payload
//         })
//         .addCase(registerUser.rejected , (state , action) => {
//             state.isLoading = false
//             state.isSuccess = false   
//             state.isError = true
//             state.message = action.payload
//         })
//         .addCase(loginUser.pending , (state) => {
//             state.isLoading = true
//             state.isSuccess = false
//             state.isError = false
//         })
//         .addCase(loginUser.fulfilled , (state , action) => {
//             state.isLoading = false
//             state.isSuccess = true
//             state.isError = false
//             state.user = action.payload
//         })
//         .addCase(loginUser.rejected , (state , action) => {
//             state.isLoading = false
//             state.isSuccess = false 
//             state.isError = true
//             state.message = action.payload
//         })
//     }
// })


// export const { reset, logout } = authSlice.actions;
// export default authSlice.reducer

// // REGISTER USER 
// export const registerUser = createAsyncThunk("AUTH/REGISTER" , async(formData , thunkAPI) =>{
//     try {
//         return await authService.register(formData)
//     } catch (error) {
//         let message = error.response.data.message
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // LOGIN USER 
// export const loginUser = createAsyncThunk("AUTH/LOGIN" , async(formData , thunkAPI) =>{
//     try {
//         return await authService.login(formData)
//     } catch (error) {
//         let message = error.response.data.message
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// // LOGOUT USER
// export const logoutUser = createAsyncThunk("AUTH/LOGOUT" , async()=>{
//     localStorage.removeItem("user")
// })




// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import authService from "./authService";

// // const user = JSON.parse(localStorage.getItem("user"));

// // const initialState = {
// //   user: user ? user : null,
// //   isLoading: false,
// //   isSuccess: false,
// //   isError: false,
// //   message: "",
// // };

// // // REGISTER
// // export const registerUser = createAsyncThunk(
// //   "auth/register",
// //   async (userData, thunkAPI) => {
// //     try {
// //       return await authService.register(userData);
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // // LOGIN
// // export const loginUser = createAsyncThunk(
// //   "auth/login",
// //   async (userData, thunkAPI) => {
// //     try {
// //       return await authService.login(userData);
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     reset: (state) => {
// //       state.isLoading = false;
// //       state.isSuccess = false;
// //       state.isError = false;
// //       state.message = "";
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       localStorage.clear();
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // REGISTER
// //       .addCase(registerUser.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(registerUser.fulfilled, (state) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //       })

// //       // LOGIN
// //       .addCase(loginUser.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         state.user = action.payload;
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //       });
// //   },
// // });

// // export const { reset, logout } = authSlice.actions;
// // export default authSlice.reducer;