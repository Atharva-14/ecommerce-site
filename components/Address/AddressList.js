import { Separator } from "../UI/separator";

export default function AddressList({ props }) {
  return (
    <div className="flex flex-col justify-between p-4 border-2 rounded-lg border-gray-300 shadow-md space-y-8">
      <div>
        <p className=" font-semibold">{props.fullName}</p>
        <p className=" text-sm">{props.line1 + ", " + props.line2}</p>
        <p className=" text-sm">
          {props.city + ", " + props.state + " - " + props.pincode}
        </p>
        <p>Phone number: {props.phone}</p>
      </div>
      <div className="flex space-x-2">
        <button className="hover:text-blue-600 hover:underline">Edit</button>
        <Separator orientation='vertical' className='bg-black h-auto'/>
        <button className="hover:text-blue-600 hover:underline">Delete</button>
      </div>
    </div>
  );
}
