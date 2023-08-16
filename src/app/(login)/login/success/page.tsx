import CardSideyFooter from "@/components/CardSideyFooter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

const page = () => {
  return (
    <main className="grid place-content-center h-screen">
      <CardSideyFooter>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              Check your Email <Mail />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We send you a <strong>Magic Link</strong> to your email to help
              you log in
            </CardDescription>
          </CardContent>
        </Card>
      </CardSideyFooter>
    </main>
  );
};

export default page;
