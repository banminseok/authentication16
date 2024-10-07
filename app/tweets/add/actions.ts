"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string().optional(),
  tweet: z.string({
     required_error: "Title is required",
  }),
})

export async function uploadFile(_: any, formData: FormData) {
  
  const data = {
    photo: formData.get("photo"),
    tweet: formData.get("tweet"),
  };
  console.log(data);

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    console.log(`/public/${data.photo.name}`);
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  } else{
    data.photo = '';
    console.log(data);

  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    console.log(`result.error`, result.error)
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      console.log(`session.id`, session.id)
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          file: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
      //redirect("/products")
    }else{
      console.log(`session.id null`, session)
    }
  }
}