import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Copy } from "lucide-react";

interface ShareModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ url, title, isOpen, onClose }: ShareModalProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 클립보드에 복사되었습니다!");
    });
  };

  const handleShare = (platform: "facebook" | "twitter") => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopyLink}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="outline" onClick={() => handleShare("facebook")}>
            <Facebook className="h-5 w-5 mr-2" />
            Facebook
          </Button>
          <Button variant="outline" onClick={() => handleShare("twitter")}>
            <Twitter className="h-5 w-5 mr-2" />X
          </Button>
        </div>
        <DialogFooter className="sm:justify-start mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
