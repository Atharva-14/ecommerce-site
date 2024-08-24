import { useAuth } from "@/context/AuthContext";
import { Separator } from "../UI/separator";
import { useToast } from "../UI/use-toast";

export default function AddressList({ props, openModal }) {
  const { user, deleteAddress } = useAuth();
  const { toast } = useToast();

  const deleteAddressHandle = async (addressId) => {
    const userId = user?._id;
    const data = {
      userId,
      addressId,
    };

    try {
      const { success } = await deleteAddress(data);
      toast({
        variant: "destructive",
        description: "Address delete successfully",
      });
    } catch (error) {
      console.log("Delete Address", error.message);
    }
  };

  const handleEdit = () => {
    openModal(props);
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 border-2 rounded-lg border-gray-300 shadow-md space-y-8">
      <div>
        <p className=" font-semibold">{props.fullName}</p>
        <p className=" text-sm">{props.line1 + ", " + props.line2}</p>
        <p className=" text-sm">
          {props.city + ", " + props.state + " - " + props.pincode}
        </p>
        <p>Phone number: {props.phone}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="hover:text-blue-600 hover:underline focus:outline-none"
          onClick={handleEdit}
        >
          Edit
        </button>
        <Separator orientation="vertical" className="bg-black h-auto" />
        <button
          className="hover:text-blue-600 hover:underline focus:outline-none"
          onClick={() => deleteAddressHandle(props?._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
