"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { SocialButtons } from "./social-buttons";

interface AuthTabsProps {
  redirectUrl?: string;
}

export function AuthTabs({ redirectUrl }: AuthTabsProps) {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignInForm redirectUrl={redirectUrl} />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm redirectUrl={redirectUrl} />
      </TabsContent>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialButtons redirectUrl={redirectUrl} />
    </Tabs>
  );
}