"use client";

import { SignInModal } from "~/components/sign-in-modal";
import { useMounted } from "~/hooks/use-mounted";

export const ModalProvider = ({ dict }: { dict: Record }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal dict={dict} />
    </>
  );
};
