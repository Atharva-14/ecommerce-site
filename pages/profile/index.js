import AddressList from "@/components/Address/AddressList";
import NewAddressModal from "@/components/Address/NewAddressModal";
import privateRoute from "@/components/PrivateRoute/privateRoute";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Separator } from "@/components/UI/separator";
import { useToast } from "@/components/UI/use-toast";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [confirmChanges, setConfirmChanges] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();

  useEffect(() => {
    firstNameInput.current.value = user && user?.firstName;
    lastNameInput.current.value = user && user?.lastName;
    emailInput.current.value = user && user?.email;
  }, [user]);

  const updateInfo = () => {
    firstNameInput.current.disabled = false;
    lastNameInput.current.disabled = false;
    emailInput.current.disabled = false;
    setConfirmChanges(true);
  };

  const cancelChanges = () => setConfirmChanges(false);

  const openAddressModal = (address = null) => {
    setSelectedAddress(address);
    setModalOpen(true);
  };
  const closeAddressModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userId: user?._id,
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      email: emailInput.current.value,
    };

    try {
      const { success } = await updateUser(formData);
      if (success) {
        firstNameInput.current.disabled = true;
        lastNameInput.current.disabled = true;
        emailInput.current.disabled = true;
        setConfirmChanges(false);
        toast({ description: "Profile details updated" });
      }
    } catch (error) {
      console.log("Update Details", error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Account - Your Profile</title>
        <meta
          name="description"
          content="Manage your personal information and addresses on your account page."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NewAddressModal
        open={isModalOpen}
        onClose={closeAddressModal}
        addressData={selectedAddress}
      />
      <div className="flex w-full h-auto">
        <div className="w-40 p-4 md:py-8">
          <p className=" font-normal text-lg">Hello,</p>
          <p className="font-bold text-lg">
            {user && user.firstName + " " + user.lastName}
          </p>
        </div>
        <div className="w-full p-4 md:p-8 bg-white dark:bg-black">
          <div className="w-full p-4 md:p-8 bg-white dark:bg-black">
            <h1 className="text-2xl font-normal px-4 pb-3">
              Personal Information
            </h1>
            <Separator className=" bg-gray-500" />
            {confirmChanges ? null : (
              <button
                className="w-full text-blue-600 font-medium"
                onClick={updateInfo}
              >
                <p className="flex justify-end">
                  <BiEdit className="my-auto" />
                  Change Profile Information
                </p>
              </button>
            )}
            <form className="mt-8 mx-4 max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">First name</Label>
                  <Input
                    id="firstname"
                    placeholder="John"
                    type="text"
                    ref={firstNameInput}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    disabled
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input
                    id="lastname"
                    placeholder="Doe"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                    ref={lastNameInput}
                    disabled
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="johndoe@email.com"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                  ref={emailInput}
                  disabled
                />
              </LabelInputContainer>

              {confirmChanges ? (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    onClick={cancelChanges}
                  >
                    Cancel
                    <BottomGradient />
                  </button>

                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Save Changes
                    <BottomGradient />
                  </button>
                </div>
              ) : null}
            </form>
          </div>
          <div className="w-full p-4 md:px-8 md:pb-8 bg-white dark:bg-black">
            <h1 className="text-2xl font-normal px-4 pb-3">Your Addresses</h1>
            <Separator className=" bg-gray-500" />

            <div className="mt-5">
              <div
                className="w-full h-64 flex flex-col justify-center items-center border-dashed border-2 rounded-lg border-gray-300 cursor-pointer shadow-md"
                onClick={() => openAddressModal(null)}
              >
                <p className=" text-7xl">+</p>
                <button className="font-medium text-2xl ">Add Address</button>
              </div>
              <div className="flex flex-wrap mt-4">
                {user?.address.map((address) => (
                  <div
                    className="w-full sm:w-1/2 lg:w-1/3 p-2.5"
                    key={address._id}
                  >
                    <AddressList props={address} openModal={openAddressModal} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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

export default privateRoute(AccountPage);
