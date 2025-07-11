import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const TelegramSection = ({
  telegramId,
}: {
  telegramId: string | null | undefined;
}) => {
  const [openTelegram, setOpenTelegram] = useState(false);
  const isTelegramConnected = telegramId && !isNaN(Number(telegramId));

  return (
    <>
      <div className="flex flex-row gap-x-1 w-full">
        <div className="flex-1 bg-[#2A2A2A] rounded-md h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo'] 2xl:h-32 2xl:px-16 2xl:text-4xl">
          Get notified on Telegram
        </div>
        <div
          className="flex-1 bg-white rounded-md h-20 flex items-center px-8 text-2xl font-medium font-['Archivo'] 2xl:h-32 2xl:px-16 2xl:text-4xl"
          style={{ color: isTelegramConnected ? "#22c55e" : "#dc2626" }}
        >
          Telegram{" "}
          <span className="font-bold ml-2">
            {isTelegramConnected ? "Connected!" : "Not Connected!"}
          </span>
        </div>
        <div
          className={`flex-1 rounded-md justify-center h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] ${
            isTelegramConnected
              ? "bg-indigo-500 opacity-60 cursor-not-allowed"
              : "bg-indigo-500 cursor-pointer"
          } 2xl:h-32 2xl:px-16 2xl:text-4xl`}
        >
          Register
          <span
            className={`font-bold ml-2 ${
              isTelegramConnected ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={
              !isTelegramConnected
                ? () => setOpenTelegram(!openTelegram)
                : undefined
            }
          >
            here
          </span>
        </div>
      </div>
      {!isTelegramConnected && (
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-row gap-1 w-full  ${
            openTelegram
              ? "h-full opacity-100"
              : "h-0 opacity-0 pointer-events-none"
          }`}
          style={{}}
        >
          <div className="flex-1 bg-white rounded-md h-[30vh] flex flex-col items-start justify-center px-8 text-neutral-900 text-3xl font-medium font-['Archivo'] 2xl:px-16 2xl:text-5xl">
            <div>
              Open Bot{" "}
              <span className="font-bold ml-2 underline cursor-pointer">
                <Link href="https://t.me/liquialertbot" target="_blank">
                  here
                </Link>
              </span>
            </div>
            <div>&gt; send /register</div>
            <div>
              &gt; send{" "}
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(telegramId || "");
                  toast.success("Copied to clipboard");
                }}
              >
                {telegramId}
              </span>{" "}
              as registration code
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TelegramSection; 