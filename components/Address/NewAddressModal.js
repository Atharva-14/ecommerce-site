import { useEffect, useRef } from "react";
import { Label } from "../UI/label";
import { Input } from "../UI/input";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "../UI/use-toast";

export default function NewAddressModal({ open, onClose, addressData }) {
  const { user, addAddress, updateAddress } = useAuth();
  const { toast } = useToast();
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
    if (dialog.current) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [open]);

  useEffect(() => {
    if (addressData && open) {
      if (country.current) country.current.value = addressData?.country || "";
      if (fullName.current)
        fullName.current.value = addressData?.fullName || "";
      if (phone.current) phone.current.value = addressData?.phone || "";
      if (email.current) email.current.value = addressData?.email || "";
      if (line1.current) line1.current.value = addressData?.line1 || "";
      if (line2.current) line2.current.value = addressData?.line2 || "";
      if (pincode.current) pincode.current.value = addressData?.pincode || "";
      if (city.current) city.current.value = addressData?.city || "";
      if (state.current) state.current.value = addressData?.state || "";
      if (type.current) type.current.value = addressData?.type || "";
    } else {
      if (country.current) country.current.value = "";
      if (fullName.current) fullName.current.value = "";
      if (phone.current) phone.current.value = "";
      if (email.current) email.current.value = "";
      if (line1.current) line1.current.value = "";
      if (line2.current) line2.current.value = "";
      if (pincode.current) pincode.current.value = "";
      if (city.current) city.current.value = "";
      if (state.current) state.current.value = "";
      if (type.current) type.current.value = "";
    }
  }, [addressData, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressData) {
      const updatedFormData = {
        userId: user?._id,
        addressId: addressData._id,
        data: {
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
        },
      };

      const res = await updateAddress(updatedFormData);
      toast({ description: "Address updated successfully" });
      dialog.current.close();
    } else {
      const newFormData = {
        userId: user?._id,
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
      const res = await addAddress(newFormData);
      toast({ description: "Address added successfully" });
      dialog.current.close();
    }
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
            <p className=" font-medium mb-2.5 text-lg">
              {addressData ? "Edit your address" : "Add a new address"}
            </p>
            <hr className=" bg-gray-500 h-0.5" />
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={country}
                    required
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
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={fullName}
                    required
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
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={phone}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={email}
                    required
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
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={line1}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer className="">
                  <Label htmlFor="line2">Line2</Label>
                  <Input
                    id="line2"
                    placeholder="Line2"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={line2}
                    required
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
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={pincode}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={city}
                    required
                  />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4 mb-4">
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={state}
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer className=" max-w-xs">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    placeholder="Type"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    type="text"
                    ref={type}
                    required
                  />
                </LabelInputContainer>
              </div>
              <div className="flex space-x-4">
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  {addressData ? "Save Changes" : "Add Address"} &rarr;
                  <BottomGradient />
                </button>
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  onClick={onClose}
                >
                  Cancel
                  <BottomGradient />
                </button>
              </div>
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
