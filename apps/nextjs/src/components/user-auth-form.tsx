"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { Input } from "@saasfly/ui/input";
import { Label } from "@saasfly/ui/label";
import { toast } from "@saasfly/ui/use-toast";
import type {  DictionarySubKey } from "./../lib/get-dictionary"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  dictLogin: DictionarySubKey;
  disabled?: boolean;
  typeform: "signup" | "login";
}

const userAuthSchema = z.object({
  email: z.string().email(
    /* "Please provide a valid e-mail address." */
  ),
  password: z
  .string()
  .min(6, "Please make the password at least 6 characters")
  .optional()
  .or(z.literal('')) // If the password is not shown, zod will not report the error and the form can't be submitted
    /*{
    message: "Password must be at least 6 characters.",
  } */

});

type FormData = z.infer<typeof userAuthSchema>;

/*
* Could be for signup or login screen
*/

export function UserAuthForm({
  className,
  lang,
  dictLogin, //usually: {dict.login}
  disabled = false,
  typeform,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors ,
      // isDirty, isSubmitting, touchedFields, submitCount

    },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {

//    console.log("Form submitted with data:", data); // Log the submitted data
//    console.log("Current loading state before submission:", isLoading); // Log isLoading before setting it

    setIsLoading(true);

 //   console.log("Loading state after setting to true:", isLoading); // Log isLoading after setting it


    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") ?? `/${lang}/dashboard`,
    }).catch((error) => {
      console.error("Error during sign in:", error);
    });

    setIsLoading(false);

  //  console.log("Loading state after submission:", isLoading); // Log isLoading after setting it back


 //   console.log('Signin result: ',signInResult);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {dictLogin.email}
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              //  disabled if from upstream
              disabled={isLoading || isGitHubLoading || disabled}
              {...register("email")}
              required
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button type="submit" className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            { (typeform=="login")? dictLogin.signin_email: dictLogin.signup_email}

            {/* Sign In with Email */}
          </button>
        </div>
      </form>

    </div>
  );
}
