import { useSelector, useDispatch } from "react-redux";
import { client } from "../../../index";
import {
  CREATE_USER,
  LOGIN_USER,
  GEN_OTP,
  UPDATE_PASSWORD,
  GET_IMAGE_USER,
  ALL_USER,
  GET_SINGLE_USER,
} from "../../../graphql/user";
import {
  setLoading,
  setErrors,
  setOTP,
  setSingleUser,
  setUsers,
  setSingleUserDetails,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function useSingleImageUser() {
  const dispatch = useDispatch();
  const singleImage = async (id) => {
    try {
      const res = await client.mutate({
        mutation: GET_IMAGE_USER,
        variables: { userId: id },
      });

      if (res.data.getSingleUser.args) {
        toast.error(res.data.getSingleUser.args, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      if (res.data.getSingleUser.user) {
        dispatch(setSingleUser(res.data.getSingleUser.user));
      }
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
  return {
    singleImage,
  };
}

export function useCreateUser() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const createUser = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          createInput: data,
        },
      });

      if (res.data.createUser?.token) {
        dispatch(setLoading(false));
        localStorage.setItem("token", res.data.createUser?.token);
        toast.success(res.data.createUser?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        Navigate("/");
      }

      if (res.data.createUser?.args) {
        dispatch(setLoading(false));
        dispatch(setErrors(res.data.createUser?.args));
        toast.error(res.data.createUser?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
    }
  };
  return {
    createUser,
    userSelector,
  };
}

export function useSendOtp() {
  const dispatch = useDispatch();
  const sendOtp = async (number) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: GEN_OTP,
        variables: {
          mobilenumber: number,
        },
      });

      dispatch(setLoading(false));
      if (res?.data?.genOtp.otp) {
        dispatch(setOTP(res?.data?.genOtp.otp));
      }

      if (res?.data?.genOtp.args) {
        dispatch(setErrors(res?.data?.genOtp.message));
        toast.error(res.data.genOtp?.args + " does not exist", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    sendOtp,
  };
}

export function useLoginUser() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const login = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: LOGIN_USER,
        variables: { loginInput: data },
      });
      dispatch(setLoading(false));

      if (res.data.loginUser.args === "mobile number") {
        toast.error("User does not exist", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      if (res.data.loginUser.args === "password") {
        toast.error("Incorrect password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      if (res.data.loginUser.token) {
        localStorage.setItem("token", res.data.loginUser?.token);
        Navigate("/");
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    login,
  };
}

export function useUpdatePassword() {
  const dispatch = useDispatch();
  const updatePassword = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: UPDATE_PASSWORD,
        variables: {
          mobilenumber: data.mobilenumber,
          password: data.password,
        },
      });
      if (res.data.updateUser.args) {
        toast.error(res.data.updateUser.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Password changed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    updatePassword,
  };
}

export function useGetAllUser() {
  const dispatch = useDispatch();
  const getAllUser = async () => {
    try {
      dispatch(setLoading(true));
      const res = await client.query({
        query: ALL_USER,
      });

      dispatch(setLoading(false));
      if (res.data.getAllUser) {
        dispatch(setUsers(res.data.getAllUser));
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    getAllUser,
  };
}

export function useSingleUserDetails() {
  const dispatch = useDispatch();
  const singleUserDetails = async (id) => {
    try {
        const res = await client.mutate({
            mutation : GET_SINGLE_USER,
            variables : {userId : id}
        })

        if(res.data.getSingleUser.args)
        {
            toast.error(res.data.getSingleUser.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }

        if(res.data.getSingleUser.user)
        {
            dispatch(setSingleUserDetails(res.data.getSingleUser.user))
        }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors(error.message));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { singleUserDetails };
}
