import { Button } from "@/components/ui/button";
import { Book, User, Upload, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Logo.png" alt="MindLab" className="h-8 w-fit" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
          >
            요약본 조회
          </Link>
          <Link 
            to="/profile" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
          >
            프로필
          </Link>
          <Link 
            to="/upload" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth"
          >
            업로드
          </Link>
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