import { SignupForm } from "@/components/signup-form";

export default function Register() {
  return (
    <div className="flex items-center justify-center p-6 md:p-10 h-screen">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
