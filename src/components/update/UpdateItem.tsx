import { update } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type UpdateItemProps = {
  update: Pick<update, "title" | "description">;
};

const UpdateItem = ({ update }: UpdateItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{update.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{update.description}</p>
      </CardContent>
    </Card>
  );
};

export default UpdateItem;
