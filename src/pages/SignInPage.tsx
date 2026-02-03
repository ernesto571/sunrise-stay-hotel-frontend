import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  
    return(
        <div className="relative">
          <div className="max-w-screen h-screen">
            <img src="/about-1.jpg" alt="" className="object-cover object-fit h-full w-full opacity-80" />
          </div>
          
          <section className="flex absolute inset-0  items-center justify-center top-[4rem]">
            <SignIn 
              path="/sign-in" 
              routing="path" 
              signUpUrl="/sign-up" 
            />
          </section>
        </div>
    )
  }
  
  export default SignInPage;
  