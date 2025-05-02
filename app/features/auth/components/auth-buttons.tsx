import { BookLock, Github, Mail, MessageCircleIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Separator } from '~/common/components/ui/separator';

export default function AuthButtons() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Separator />
      <span className="uppercase text-sm text-muted-foreground font-semibold tracking-wide">
        Or continue with
      </span>

      <div className="flex flex-col gap-2.5 w-full">
        <Button variant="outline" asChild>
          <Link
            to="/auth/social/google/start"
            className="flex items-center justify-center gap-2.5"
          >
            <Mail className="w-4 h-4" />
            Sign up with Google
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            to="/auth/social/github/start"
            className="flex items-center justify-center gap-2.5"
          >
            <Github className="w-4 h-4" />
            Sign up with GitHub
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            to="/auth/social/kakao/start"
            className="flex items-center justify-center gap-2.5"
          >
            <MessageCircleIcon className="w-4 h-4" />
            Sign up with KakaoTalk
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            to="/auth/otp/start"
            className="flex items-center justify-center gap-2.5"
          >
            <BookLock className="w-4 h-4" />
            Sign up with One-Time Password
          </Link>
        </Button>
      </div>
    </div>
  );
}
