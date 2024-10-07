"use client"

import { uploadFile } from "@/app/tweets/add/actions";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "./button";


export default function AddTweet() {
    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { files },
        } = event;
        if (!files) {
          return;
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
      };
    const [state, action] = useFormState(uploadFile, null);
    return(
        <div className="border-b-2 pb-3">
            <form action={action}>
                <textarea name="tweet" className="w-full text-neutral-400 bg-transparent" required placeholder="무슨일이 일어나고 있나요?"></textarea>
                {preview === "" ? null :(
                    <>
                    <div
                        className="aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                        style={{
                        backgroundImage: `url(${preview})`,
                        }}
                    >
                    </div>
                    </>
                )}

                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    />
                <div className="flex place-content-between">
                    <label htmlFor="photo"
                    className=""
                    >
                        <PhotoIcon className="w-8" />
                    </label>
                    <div className="w-36">
                    <Button text="게시하기" />
                    </div>
                </div>
            </form>
        </div>    
    )
}