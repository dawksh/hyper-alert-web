import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { queryClient } from "@/components/shared/ProviderLayout";
import { toast } from "sonner";

const ThresholdSection = ({
  threshold,
  id,
}: {
  threshold: number | null | undefined;
  id: string | null | undefined;
}) => {
  const [value, setValue] = useState(threshold ? threshold * 100 : 20);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async () => {
    if (!id) return;
    if (threshold === value / 100) return;
    try {
      await axios.post("/api/user", {
        id: id,
        threshold: value / 100,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Threshold updated successfully");
    } catch (error) {
      toast.error("Failed to update threshold");
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value !== threshold) handleSubmit();
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="bg-lime-400 rounded-md w-full flex flex-col items-start px-12 py-6 gap-1 ">
        <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">
          Liquidation Buffer (%)
        </div>
        <div
          className="text-zinc-800 text-xl  font-normal font-['Archivo']"
          style={{ letterSpacing: "-0.05em", lineHeight: "1em" }}
        >
          You’ll start receiving alerts when the price is{" "}
          <span className="font-bold">X%</span> away from your liquidation
          price.
        </div>
      </div>
      <div className="bg-neutral-800 rounded-md h-[50vh] flex flex-col items-start justify-center px-12 py-6 gap-6">
        <div className="text-white text-[10rem] text-start font-black font-['Archivo']">
          {value}%
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-row items-center justify-between px-2">
            <span className="text-neutral-400 text-lg">min</span>
            <span className="text-neutral-400 text-lg">max</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => {
              let v = Number(e.target.value);
              if (v < 5) v = 5;
              if (v > 85) v = 85;
              setValue(v);
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-2 mb-2"
            style={{
              background:
                "linear-gradient(90deg, #7f1d1d 0%, #f87171 10%, #f59e42 25%, #fde047 50%, #bbf7d0 70%, #22c55e 85%, #166534 100%)",
              accentColor: "#c6ff00",
              height: "0.5rem",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          <style jsx global>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
              margin-top: -16px;
            }
            input[type="range"]::-moz-range-thumb {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
              margin-top: -16px;
            }
            input[type="range"]::-ms-thumb {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 9999px;
              background: #fff;
              border: 4px solid #fff;
              box-shadow: 0 0 4px #0003;
              cursor: pointer;
              transition: background 0.2s;
              margin-top: -16px;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              height: 0.5rem;
              border-radius: 0.25rem;
              background: linear-gradient(
                90deg,
                #7f1d1d 0%,
                #f87171 10%,
                #f59e42 25%,
                #fde047 50%,
                #bbf7d0 70%,
                #22c55e 85%,
                #166534 100%
              );
            }
            input[type="range"]::-moz-range-track {
              height: 0.5rem;
              border-radius: 0.25rem;
              background: linear-gradient(
                90deg,
                #7f1d1d 0%,
                #f87171 10%,
                #f59e42 25%,
                #fde047 50%,
                #bbf7d0 70%,
                #22c55e 85%,
                #166534 100%
              );
            }
            input[type="range"]::-ms-fill-lower,
            input[type="range"]::-ms-fill-upper {
              height: 0.5rem;
              border-radius: 0.25rem;
              background: linear-gradient(
                90deg,
                #7f1d1d 0%,
                #f87171 10%,
                #f59e42 25%,
                #fde047 50%,
                #bbf7d0 70%,
                #22c55e 85%,
                #166534 100%
              );
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ThresholdSection;
