import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

export const Header = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Logo.png" alt="MindLab" className="h-8 w-fit" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={getNavLinkClass}>
            {({ isActive }) => (
              <>
                요약본 조회
                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-0.5 bg-primary rounded-full"></span>}
              </>
            )}
          </NavLink>
          <NavLink to="/profile" className={getNavLinkClass}>
            {({ isActive }) => (
              <>
                프로필
                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-0.5 bg-primary rounded-full"></span>}
              </>
            )}
          </NavLink>
          <NavLink to="/upload" className={getNavLinkClass}>
            {({ isActive }) => (
              <>
                업로드
                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-0.5 bg-primary rounded-full"></span>}
              </>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">로그인</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="gradient" size="sm">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};