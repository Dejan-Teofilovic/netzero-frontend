import React from "react";
import { Alert } from "@material-tailwind/react";
import useAlertMessage from "../hooks/useAlertMessage";

/* ----------------------------------------------------------- */

interface IProps {
  className?: string;
}

/* ----------------------------------------------------------- */

export default function AlertMessage({ className = '' }: IProps) {
  const { closeAlert, isOpened, color, message, title, icon } = useAlertMessage()

  return (
    <div className={className}>
      <div className="w-full flex justify-center sticky top-5 z_10000">
        <Alert
          show={isOpened}
          color={color}
          dismissible={{
            onClose: () => closeAlert(),
          }}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          className="w-fit max-w-7xl"
          variant="gradient"
          icon={icon}
        >
          <h5 className="text-white font-bold overflow_wrap_break_word">
            {title}
          </h5>
          <p className="mt-2 text-sm overflow_wrap_break_word">
            {message}
          </p>
        </Alert>
      </div>
    </div>
  )
}