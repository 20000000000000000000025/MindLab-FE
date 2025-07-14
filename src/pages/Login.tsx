import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quest Summary
            </span>
          </div>
          <p className="text-muted-foreground">학습 여정을 시작하세요</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-elegant border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              계정에 로그인하여 학습 자료를 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="gradient" className="w-full">
                로그인
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                계정이 없으신가요?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  회원가입
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};