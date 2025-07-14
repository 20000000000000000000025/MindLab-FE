import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, User } from "lucide-react";

interface SummaryCardProps {
  id: string;
  title: string;
  content: string;
  userEmail: string;
  subject: string;
  viewCount: number;
  onClick?: () => void;
}

export const SummaryCard = ({ 
  title, 
  content, 
  userEmail, 
  subject, 
  viewCount,
  onClick 
}: SummaryCardProps) => {
  return (
    <Card 
      className="group cursor-pointer transition-smooth hover:shadow-card hover:-translate-y-1 bg-card border-border/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-smooth">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="truncate">{userEmail}</span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {subject}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{viewCount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};