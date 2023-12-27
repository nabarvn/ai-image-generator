"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import useSWR from "swr";
import { fetchImages, promptSuggestion } from "@/lib";
import { toast } from "react-hot-toast";

const Prompt = () => {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", promptSuggestion, { revalidateOnFocus: false });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const customPrompt = input.trim();
    setInput("");

    const prompt = useSuggestion ? suggestion : customPrompt;

    const notification = toast.loading("DALL-E is creating an image for you!");

    await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then(() =>
        toast.success("Your AI art has been generated successfully!", {
          id: notification,
        })
      )
      .catch((err) => toast.error(err.message, { id: notification }));

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className='mx-2 md:mx-9 my-9'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          className='flex-1 text-base break-words outline-none rounded-md resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-violet-500 scrollbar-thumb-rounded-lg disabled:cursor-not-allowed p-4'
          placeholder='Nabarun.ai is taking a short break. Stay tuned for future updates!'
          onKeyDown={handleKeyDown}
          disabled
          // placeholder={
          //   (loading && "Nabarun.ai is thinking...") ||
          //   suggestion ||
          //   "Enter a prompt..."
          // }
          // disabled={loading}
        />
        <button
          type='submit'
          className={`font-bold ${
            input
              ? "bg-violet-500 active:bg-violet-700 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          } border-t lg:border-t-0 p-4`}
          disabled
          // disabled={!input || loading}
        >
          Generate
        </button>
        <button
          type='button'
          className='bg-violet-400 active:bg-violet-700 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:active:bg-gray-400 p-4'
          onClick={() => submitPrompt(true)}
          disabled
          // disabled={loading}
        >
          Use Suggestion
        </button>
        <button
          type='button'
          className='bg-white active:bg-gray-100 text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none disabled:cursor-not-allowed disabled:active:bg-white font-bold p-4'
          onClick={() => mutate()}
          disabled
          // disabled={loading}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className='italic font-light pt-2 pl-2'>
          <span>Suggestion: </span>
          <span className='text-violet-500'>
            {loading ? "Nabarun.ai is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
};

export default Prompt;
