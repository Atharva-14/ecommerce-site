import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function OrderPlacedModal({ open, onClose }) {
  const dialog = useRef();
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
      setTimeout(async () => {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/delete`,
          {
            data: { userId },
          }
        );
        router.push("/");
        dialog.current.close();
      }, 3000);
    } else {
      dialog.current.close();
    }
  }, [open]);
  return (
    <dialog ref={dialog} onClose={onClose} className="focus:outline-none">
      {open ? (
        <div className="m-2 p-4 flex flex-col justify-center items-center">
          <span className="flex">
            <CheckIcon className="text-green-600 text-4xl" size={60} />
            <h1 className="text-2xl font-semibold text-green-600 my-auto">
              Order Placed Successfully!!
            </h1>
          </span>
          <p className="text-lg">
            Your order has been placed successfully. It will be delivered to the
            given address.
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
