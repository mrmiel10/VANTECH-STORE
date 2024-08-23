"use client";
import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodoAction } from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {z} from "zod"
const Page = () => {    
    const router = useRouter();
    const schema = z.tuple(
        [ z.string(),
         z.number()]
        ).rest(z.boolean())
        type schemaAthlete = z.infer<typeof schema>
        const isAthlete = schema.parse([1,2])
        const fishEnum = z.enum(["daryl","boris","ddd"])
        type fishEnum = z.infer<typeof fishEnum>
  const createTodo = useServerAction(createTodoAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("todo created");
    },
    onError: (err) => {
      toast.error(err.err.fieldErrors?.["title"]!);
    },
  });
  const submitTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    e.currentTarget.reset();
    const todoName = String(formData.get("todo"));
    console.log(todoName);
    await createTodo.execute({ title: todoName });
  };
  return (
    <div className="flex mx-auto px-16">
      <form onSubmit={(e) => submitTodo(e)} className="w-80 ">
        <Input name="todo" />
        <Button type="submit" disabled={createTodo.isPending}>
          {createTodo.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>valider</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
