import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="relative max-w-screen">
      <div className="max-w-screen h-[150vh] md:h-[120vh]">
        <img src="/about-1.jpg" alt="" className="object-cover h-full w-full opacity-80" />
      </div>
      
      <section className="flex absolute inset-0  items-center justify-center md:top-[4rem]">
        <SignUp 
          path="/sign-up" 
          routing="path" 
          signInUrl="/sign-in" 
        />
      </section>
    </div>
  );
}

export default SignUpPage;