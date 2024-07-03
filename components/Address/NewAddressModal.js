import { useEffect, useRef } from "react";
import { Label } from "../UI/label";
import { Input } from "../UI/input";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

export default function NewAddressModal({ open, onClose }) {
  const { user, addAddress } = useAuth();
  const dialog = useRef();
  const country = useRef();
  const fullName = useRef();
  const phone = useRef();
  const email = useRef();
  const line1 = useRef();
  const line2 = useRef();
  const pincode = useRef();
  const city = useRef();
  const state = useRef();
  const type = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userId: user._id,
      country: country.current.value,
      fullName: fullName.current.value,
      phone: phone.current.value,
      email: email.current.value,
      line1: line1.current.value,
      line2: line2.current.value,
      pincode: pincode.current.value,
      city: city.current.value,
      state: state.current.value,
      type: type.current.value,
    };

    const res = await addAddress(formData);

    dialog.current.close();
  };

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      {open ? (
        <div className="fixed w-4/5 flex flex-col items-center p-5 ">
          <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
            <p className=" font-medium mb-2.5 text-lg">Add a new address</p>
            <hr className=" bg-gray-500 h-0.5" />
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    type="text"
                    ref={country}
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="fullName">
                    Full Name (First and Last name)
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    type="text"
                    ref={fullName}
                  />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="Enter your number"
                    type="text"
                    ref={phone}
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    ref={email}
                  />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className="">
                  <Label htmlFor="line1">Line1</Label>
                  <Input
                    id="line1"
                    placeholder="Line1"
                    type="text"
                    ref={line1}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="">
                  <Label htmlFor="line2">Line2</Label>
                  <Input
                    id="line2"
                    placeholder="Line2"
                    type="text"
                    ref={line2}
                  />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="pincode">Pin Code</Label>
                  <Input
                    id="pincode"
                    placeholder="6-digits [0-9] PIN Code"
                    type="text"
                    ref={pincode}
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" type="text" ref={city} />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    type="text"
                    ref={state}
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" placeholder="Type" type="text" ref={type} />
                </LabelInputContainer>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Add Address &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
