"use client";

import { useUser } from "@/hooks/useUser";
import { Camera, Loader2, Pen, User } from "lucide-react";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";

const AvatarInput = () => {
  const [imageUrl, setImageUrl] = useState<string | null >(null);
  const [uploading, setUploading] = useState(false);


  const uploadHandler: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if(event.target.files) {
      const file = event.target.files[0]
      if (file) setImageUrl(URL.createObjectURL(file))
    }
  };
  
  return (
    <div>
      <div className="relative cursor-pointer aspect-square w-38 bg-slate-200 rounded-full border border-slate-500 grid place-content-center">
        <label
          htmlFor="avatar"
          className="bg-primary absolute h-10 aspect-square grid place-content-center rounded-full cursor-pointer bottom-1 right-1"
        >
          <Camera size={20} className="text-white" />
        </label>
        {imageUrl ? 
        <img src={imageUrl} alt="avatar" className="object-cover aspect-square w-38 rounded-full border border-transparent"/>
        : uploading ? (
          <Loader2 className="aspect-square w-6 text-slate-400 animate-spin" />
        ) : (
          <User className="text-slate-400 mr-0.5 mb-0.5" size={62} />
        )
      }

        <label
          htmlFor="avatar"
          className="absolute top-0 left-0 bottom-0 right-0 cursor-pointer rounded-full"
        ></label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={uploadHandler}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default AvatarInput;
