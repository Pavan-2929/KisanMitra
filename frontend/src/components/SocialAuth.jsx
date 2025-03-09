import { Github, Globe } from "lucide-react";
import { Button } from "./ui/button";

const SocialAuth = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-3"
      >
        <Globe className="h-5 w-5 text-red-500" />
        <span>Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-3"
      >
        <Github className="h-5 w-5 text-black" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialAuth;
